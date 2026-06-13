import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

export async function getBooks(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const { search, category } = req.query;

    const where: any = {};
    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { isbn: { contains: search } },
      ];
    }
    if (category && typeof category === 'string') where.category = category;

    const [books, total] = await Promise.all([
      prisma.book.findMany({ where, skip, take: limit, orderBy: { title: 'asc' } }),
      prisma.book.count({ where }),
    ]);

    return res.json({ success: true, data: books, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch books' } });
  }
}

export async function createBook(req: Request, res: Response) {
  try {
    const schema = z.object({
      title: z.string().min(1),
      author: z.string().min(1),
      isbn: z.string().min(1),
      category: z.string().min(1),
      quantity: z.number().int().positive(),
      rack: z.string().optional(),
    });
    const data = schema.parse(req.body);
    const book = await prisma.book.create({ data });
    return res.status(201).json({ success: true, data: book });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    if (err.code === 'P2002') return res.status(409).json({ success: false, error: { code: 'DUPLICATE', message: 'Book with this ISBN already exists' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create book' } });
  }
}

export async function issueBook(req: Request, res: Response) {
  try {
    const schema = z.object({
      bookId: z.string().uuid(),
      userId: z.string().uuid(),
    });
    const { bookId, userId } = schema.parse(req.body);

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Book not found' } });

    const issuedCount = await prisma.bookTransaction.count({ where: { bookId, returnedAt: null } });
    if (issuedCount >= book.quantity) {
      return res.status(400).json({ success: false, error: { code: 'NO_COPIES', message: 'No copies available' } });
    }

    const transaction = await prisma.bookTransaction.create({
      data: { bookId, userId, type: 'ISSUE' },
      include: { book: { select: { title: true, author: true } } },
    });
    return res.status(201).json({ success: true, data: transaction });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to issue book' } });
  }
}

export async function returnBook(req: Request, res: Response) {
  try {
    const transactionId = req.params.transactionId as string;

    const transaction = await prisma.bookTransaction.findUnique({ where: { id: transactionId } });
    if (!transaction) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Transaction not found' } });
    if (transaction.returnedAt) return res.status(400).json({ success: false, error: { code: 'ALREADY_RETURNED', message: 'Book already returned' } });

    const daysOverdue = Math.max(0, Math.floor((Date.now() - transaction.issuedAt.getTime()) / (1000 * 60 * 60 * 24)) - 14);
    const fine = daysOverdue * 5;

    const updated = await prisma.bookTransaction.update({
      where: { id: transactionId },
      data: { returnedAt: new Date(), fine: fine || null },
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to return book' } });
  }
}

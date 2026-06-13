import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

export async function getFeeStructures(req: Request, res: Response) {
  try {
    const structures = await prisma.feeStructure.findMany({ orderBy: { semester: 'asc' } });
    return res.json({ success: true, data: structures });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch fee structures' } });
  }
}

export async function createFeeStructure(req: Request, res: Response) {
  try {
    const schema = z.object({
      name: z.string().min(1),
      amount: z.number().positive(),
      semester: z.number().int().min(1),
      category: z.string().min(1),
      installmentAllowed: z.boolean().default(false),
    });
    const data = schema.parse(req.body);
    const structure = await prisma.feeStructure.create({ data });
    return res.status(201).json({ success: true, data: structure });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create fee structure' } });
  }
}

export async function getTransactions(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const { studentId, status } = req.query;

    const where: any = {};
    if (studentId && typeof studentId === 'string') where.studentId = studentId;
    if (status && typeof status === 'string') {
      where.paidAt = status === 'pending' ? null : { not: null };
    }

    const [transactions, total] = await Promise.all([
      prisma.feeTransaction.findMany({
        where,
        skip,
        take: limit,
        include: {
          student: { select: { firstName: true, lastName: true, usn: true } },
          feeStructure: { select: { name: true } },
        },
        orderBy: { paidAt: 'desc' },
      }),
      prisma.feeTransaction.count({ where }),
    ]);

    return res.json({
      success: true,
      data: transactions,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch transactions' } });
  }
}

export async function processPayment(req: Request, res: Response) {
  try {
    const schema = z.object({
      studentId: z.string().uuid(),
      feeStructureId: z.string().uuid(),
      amountPaid: z.number().positive(),
      mode: z.enum(['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE']),
      transactionId: z.string().min(1),
    });
    const data = schema.parse(req.body);

    const transaction = await prisma.feeTransaction.create({
      data: { ...data, paidAt: new Date() },
      include: { student: { select: { firstName: true, lastName: true, usn: true } } },
    });

    return res.status(201).json({ success: true, data: transaction });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Payment failed' } });
  }
}

export async function getFeeSummary(req: Request, res: Response) {
  try {
    const [totalCollected, pendingCount, totalTransactions] = await Promise.all([
      prisma.feeTransaction.aggregate({ _sum: { amountPaid: true } }),
      prisma.studentProfile.count({
        where: {
          feeTransactions: { none: { feeStructure: { semester: { equals: 1 } } } },
        },
      }),
      prisma.feeTransaction.count(),
    ]);

    return res.json({
      success: true,
      data: {
        totalCollected: totalCollected._sum.amountPaid || 0,
        pendingCount,
        totalTransactions,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch summary' } });
  }
}

import type { Request, Response } from 'express';
import prisma from '../config/prisma';

export async function getStudents(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const { branch, semester, search } = req.query;

    const where: any = {};
    if (branch && typeof branch === 'string') where.branchId = branch;
    if (semester && typeof semester === 'string') where.semester = parseInt(semester);
    if (search && typeof search === 'string') {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { usn: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.studentProfile.findMany({
        where,
        skip,
        take: limit,
        include: { branch: true, user: { select: { email: true } } },
        orderBy: { usn: 'asc' },
      }),
      prisma.studentProfile.count({ where }),
    ]);

    return res.json({
      success: true,
      data: students,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('getStudents error:', err);
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch students' } });
  }
}

export async function getStudent(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const student = await prisma.studentProfile.findUnique({
      where: { id },
      include: { branch: true, user: { select: { email: true, role: true } } },
    });

    if (!student) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } });
    }

    return res.json({ success: true, data: student });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch student' } });
  }
}

import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

const createExamSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['INTERNAL', 'MIDTERM', 'PRACTICAL', 'END_SEMESTER', 'BACKLOG', 'SUPPLEMENTARY']),
  semester: z.number().int().min(1).max(10),
  courseId: z.string().uuid(),
  date: z.string().datetime(),
  maxMarks: z.number().int().positive(),
  passingMarks: z.number().int().positive(),
});

export async function getExams(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const { semester, courseId, type } = req.query;

    const where: any = {};
    if (semester && typeof semester === 'string') where.semester = parseInt(semester);
    if (courseId && typeof courseId === 'string') where.courseId = courseId;
    if (type && typeof type === 'string') where.type = type;

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        skip,
        take: limit,
        include: { course: { select: { name: true, code: true } } },
        orderBy: { date: 'desc' },
      }),
      prisma.exam.count({ where }),
    ]);

    return res.json({
      success: true,
      data: exams,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch exams' } });
  }
}

export async function createExam(req: Request, res: Response) {
  try {
    const data = createExamSchema.parse(req.body);
    const exam = await prisma.exam.create({
      data: { ...data, date: new Date(data.date) },
      include: { course: { select: { name: true } } },
    });
    return res.status(201).json({ success: true, data: exam });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: err.errors } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create exam' } });
  }
}

export async function getExamResults(req: Request, res: Response) {
  try {
    const examId = req.params.examId as string;
    const results = await prisma.examResult.findMany({
      where: { examId },
      include: {
        student: { select: { firstName: true, lastName: true, usn: true, branch: { select: { code: true } } } },
        exam: { select: { name: true, maxMarks: true } },
      },
      orderBy: { marksObtained: 'desc' },
    });
    return res.json({ success: true, data: results });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch results' } });
  }
}

export async function enterMarks(req: Request, res: Response) {
  try {
    const examId = req.params.examId as string;
    const schema = z.object({
      marks: z.array(z.object({
        studentId: z.string().uuid(),
        marksObtained: z.number().min(0),
        grade: z.string().optional(),
      })),
    });

    const { marks } = schema.parse(req.body);
    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Exam not found' } });
    }

    const results = await prisma.$transaction(
      marks.map((m) =>
        prisma.examResult.upsert({
          where: { studentId_examId: { studentId: m.studentId, examId } },
          update: { marksObtained: m.marksObtained, grade: m.grade },
          create: { studentId: m.studentId, examId, marksObtained: m.marksObtained, grade: m.grade },
        }),
      ),
    );

    return res.json({ success: true, data: results });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to enter marks' } });
  }
}

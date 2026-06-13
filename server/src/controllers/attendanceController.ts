import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

const markAttendanceSchema = z.object({
  records: z.array(z.object({
    studentId: z.string().uuid(),
    courseId: z.string().uuid(),
    status: z.enum(['PRESENT', 'ABSENT', 'LEAVE']),
    date: z.string().datetime(),
  })),
});

export async function markAttendance(req: Request, res: Response) {
  try {
    const { records } = markAttendanceSchema.parse(req.body);
    const markedBy = req.user!.userId;

    const created = await prisma.$transaction(
      records.map((r) =>
        prisma.attendanceRecord.upsert({
          where: { studentId_courseId_date: { studentId: r.studentId, courseId: r.courseId, date: new Date(r.date) } },
          update: { status: r.status, markedBy },
          create: { ...r, date: new Date(r.date), markedBy },
        }),
      ),
    );

    return res.json({ success: true, data: created, message: `Marked ${created.length} records` });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to mark attendance' } });
  }
}

export async function getAttendance(req: Request, res: Response) {
  try {
    const { studentId, courseId, from, to } = req.query;
    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (courseId) where.courseId = courseId;
    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from as string);
      if (to) where.date.lte = new Date(to as string);
    }

    const records = await prisma.attendanceRecord.findMany({
      where,
      include: { course: { select: { name: true, code: true } }, student: { select: { firstName: true, lastName: true, usn: true } } },
      orderBy: { date: 'desc' },
    });

    return res.json({ success: true, data: records });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch attendance' } });
  }
}

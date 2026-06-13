import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

export async function getHostels(req: Request, res: Response) {
  try {
    const hostels = await prisma.hostel.findMany({
      include: { rooms: { include: { _count: { select: { allocations: true } } } } },
    });
    return res.json({ success: true, data: hostels });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch hostels' } });
  }
}

export async function allocateRoom(req: Request, res: Response) {
  try {
    const schema = z.object({
      studentId: z.string().uuid(),
      roomId: z.string().uuid(),
    });
    const { studentId, roomId } = schema.parse(req.body);

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { _count: { select: { allocations: true } } },
    });
    if (!room) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Room not found' } });
    if (room._count.allocations >= room.capacity) {
      return res.status(400).json({ success: false, error: { code: 'ROOM_FULL', message: 'Room is at full capacity' } });
    }

    const existing = await prisma.hostelAllocation.findUnique({ where: { studentId } });
    if (existing) {
      return res.status(409).json({ success: false, error: { code: 'ALREADY_ALLOCATED', message: 'Student already has a room allocation' } });
    }

    const allocation = await prisma.hostelAllocation.create({
      data: { studentId, roomId },
      include: { room: { include: { hostel: true } }, student: { select: { firstName: true, lastName: true, usn: true } } },
    });
    return res.status(201).json({ success: true, data: allocation });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to allocate room' } });
  }
}

export async function getComplaints(req: Request, res: Response) {
  try {
    const complaints = await prisma.complaint.findMany({
      include: { student: { select: { firstName: true, lastName: true, usn: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: complaints });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch complaints' } });
  }
}

export async function createComplaint(req: Request, res: Response) {
  try {
    const schema = z.object({
      category: z.string().min(1),
      description: z.string().min(1),
    });
    const userId = req.user!.userId;
    const student = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!student) return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Only students can file complaints' } });

    const data = schema.parse(req.body);
    const complaint = await prisma.complaint.create({
      data: { ...data, studentId: student.id },
      include: { student: { select: { firstName: true, lastName: true, usn: true } } },
    });
    return res.status(201).json({ success: true, data: complaint });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create complaint' } });
  }
}

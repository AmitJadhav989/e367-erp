import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

export async function getCompanies(req: Request, res: Response) {
  try {
    const companies = await prisma.company.findMany({ orderBy: { name: 'asc' } });
    return res.json({ success: true, data: companies });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch companies' } });
  }
}

export async function createCompany(req: Request, res: Response) {
  try {
    const schema = z.object({ name: z.string().min(1), logo: z.string().optional(), website: z.string().optional(), description: z.string().optional() });
    const data = schema.parse(req.body);
    const company = await prisma.company.create({ data });
    return res.status(201).json({ success: true, data: company });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create company' } });
  }
}

export async function getDrives(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [drives, total] = await Promise.all([
      prisma.placementDrive.findMany({
        skip,
        take: limit,
        include: { company: { select: { name: true, logo: true } }, _count: { select: { applications: true } } },
        orderBy: { deadline: 'asc' },
      }),
      prisma.placementDrive.count(),
    ]);

    return res.json({ success: true, data: drives, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch drives' } });
  }
}

export async function createDrive(req: Request, res: Response) {
  try {
    const schema = z.object({
      companyId: z.string().uuid(),
      role: z.string().min(1),
      package: z.number().positive(),
      eligibility: z.string().min(1),
      deadline: z.string().datetime(),
    });
    const data = schema.parse(req.body);

    const drive = await prisma.placementDrive.create({
      data: { ...data, deadline: new Date(data.deadline) },
      include: { company: { select: { name: true } } },
    });
    return res.status(201).json({ success: true, data: drive });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create drive' } });
  }
}

export async function applyToDrive(req: Request, res: Response) {
  try {
    const driveId = req.params.driveId as string;
    const userId = req.user!.userId;

    const student = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!student) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Only students can apply' } });
    }

    const existing = await prisma.placementApplication.findUnique({
      where: { studentId_driveId: { studentId: student.id, driveId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, error: { code: 'ALREADY_APPLIED', message: 'Already applied to this drive' } });
    }

    const application = await prisma.placementApplication.create({
      data: { studentId: student.id, driveId },
      include: { drive: { include: { company: { select: { name: true } } } } },
    });
    return res.status(201).json({ success: true, data: application });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to apply' } });
  }
}

export async function getPlacementStats(req: Request, res: Response) {
  try {
    const [totalPlaced, drives, applications] = await Promise.all([
      prisma.placementApplication.count({ where: { status: 'SELECTED' } }),
      prisma.placementDrive.findMany({ select: { package: true } }),
      prisma.placementApplication.groupBy({ by: ['status'], _count: true }),
    ]);

    const packages = drives.map((d) => d.package);
    const highestPackage = packages.length ? Math.max(...packages) : 0;
    const averagePackage = packages.length ? packages.reduce((a, b) => a + b, 0) / packages.length : 0;

    return res.json({
      success: true,
      data: { totalPlaced, highestPackage, averagePackage, totalDrives: drives.length, applicationStats: applications },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch stats' } });
  }
}

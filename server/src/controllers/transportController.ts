import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';

export async function getRoutes(req: Request, res: Response) {
  try {
    const routes = await prisma.busRoute.findMany({
      include: { _count: { select: { allocations: true } } },
    });
    return res.json({ success: true, data: routes });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch routes' } });
  }
}

export async function createRoute(req: Request, res: Response) {
  try {
    const schema = z.object({
      name: z.string().min(1),
      driverName: z.string().min(1),
      driverPhone: z.string().min(10),
      stops: z.array(z.object({ name: z.string(), time: z.string() })),
    });
    const data = schema.parse(req.body);
    const route = await prisma.busRoute.create({ data: { ...data, stops: data.stops } });
    return res.status(201).json({ success: true, data: route });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create route' } });
  }
}

export async function updateGPS(req: Request, res: Response) {
  try {
    const routeId = req.params.routeId as string;
    const schema = z.object({ lat: z.number(), lng: z.number() });
    const { lat, lng } = schema.parse(req.body);

    const route = await prisma.busRoute.update({
      where: { id: routeId },
      data: { gpsLat: lat, gpsLng: lng },
    });
    return res.json({ success: true, data: route });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update GPS' } });
  }
}

export async function allocateTransport(req: Request, res: Response) {
  try {
    const schema = z.object({ studentId: z.string().uuid(), routeId: z.string().uuid() });
    const { studentId, routeId } = schema.parse(req.body);

    const existing = await prisma.transportAllocation.findUnique({ where: { studentId } });
    if (existing) {
      return res.status(409).json({ success: false, error: { code: 'ALREADY_ALLOCATED', message: 'Student already has transport allocation' } });
    }

    const allocation = await prisma.transportAllocation.create({
      data: { studentId, routeId },
      include: { route: { select: { name: true } }, student: { select: { firstName: true, lastName: true, usn: true } } },
    });
    return res.status(201).json({ success: true, data: allocation });
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to allocate transport' } });
  }
}

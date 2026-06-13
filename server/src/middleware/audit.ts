import type { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export function auditLog(action: string, resource: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    res.json = function (body: any) {
      if (req.user) {
        prisma.auditLog.create({
          data: {
            userId: req.user.userId,
            role: req.user.role,
            action,
            resource,
            details: { method: req.method, path: req.path, statusCode: res.statusCode },
            ip: req.ip,
            userAgent: req.headers['user-agent'],
          },
        }).catch(console.error);
      }
      return originalJson(body);
    };
    next();
  };
}

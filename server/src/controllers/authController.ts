import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../config/prisma';
import { env } from '../config/env';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const tokens = (userId: string, role: string) => ({
  accessToken: jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any }),
  refreshToken: jwt.sign({ userId, role }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any }),
});

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, error: { code: 'ACCOUNT_DISABLED', message: 'Account has been disabled' } });
    }

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    const { accessToken, refreshToken } = tokens(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      data: { accessToken, user: { id: user.id, email: user.email, role: user.role } },
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } });
    }
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Login failed' } });
  }
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({ success: false, error: { code: 'NO_REFRESH_TOKEN', message: 'No refresh token' } });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as any;
    const { accessToken, refreshToken } = tokens(decoded.userId, decoded.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, data: { accessToken } });
  } catch {
    return res.status(401).json({ success: false, error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid refresh token' } });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken');
  return res.json({ success: true, data: { message: 'Logged out' } });
}

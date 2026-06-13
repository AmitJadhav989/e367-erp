import type http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from './env';
import prisma from './prisma';

let io: Server;

export function setupSocketIO(server: http.Server) {
  io = new Server(server, {
    cors: { origin: env.CORS_ORIGIN, credentials: true },
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  // Auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    try {
      const decoded = jwt.verify(token as string, env.JWT_SECRET) as { userId: string; role: string };
      (socket as any).user = decoded;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const user = (socket as any).user as { userId: string; role: string };
    console.log(`User connected: ${user.userId} (${user.role})`);

    // Join role-based room
    socket.join(`role:${user.role}`);
    socket.join(`user:${user.userId}`);

    // --- Attendance Namespace ---
    socket.on('attendance:mark', async (data) => {
      io.to(`role:STUDENT`).emit('attendance:updated', {
        courseId: data.courseId,
        date: data.date,
        message: 'Attendance has been updated',
      });
    });

    // --- Chat Namespace ---
    socket.on('chat:send', async (data: { receiverId: string; text: string }) => {
      const message = await prisma.chatMessage.create({
        data: {
          senderId: user.userId,
          receiverId: data.receiverId,
          text: data.text,
        },
      });
      io.to(`user:${data.receiverId}`).emit('chat:receive', {
        ...message,
        senderId: user.userId,
      });
    });

    // --- Notifications ---
    socket.on('notification:send', async (data: { title: string; body: string; role?: string }) => {
      await prisma.notification.create({
        data: {
          title: data.title,
          body: data.body,
          type: 'ANNOUNCEMENT',
          priority: 'NORMAL',
        },
      });

      if (data.role) {
        io.to(`role:${data.role}`).emit('notification:receive', {
          title: data.title,
          body: data.body,
        });
      } else {
        io.emit('notification:receive', { title: data.title, body: data.body });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.userId}`);
    });
  });

  console.log('Socket.io initialized');
  return io;
}

export function getIO(): Server {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

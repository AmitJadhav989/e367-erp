import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';

let socketInstance: Socket | null = null;

export function getSocket() {
  return socketInstance;
}

export function useSocket() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const socket = io('/', {
      auth: { token: accessToken },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    socketRef.current = socket;
    socketInstance = socket;

    return () => {
      socket.disconnect();
      socketInstance = null;
    };
  }, [accessToken]);

  return socketRef.current;
}

import http from 'http';
import app from './app';
import { env } from './config/env';
import prisma from './config/prisma';
import { setupSocketIO } from './config/socket';

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected');

    const server = http.createServer(app);

    // Setup Socket.io
    setupSocketIO(server);

    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      server.close();
      await prisma.$disconnect();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();

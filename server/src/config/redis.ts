import { createClient } from 'redis';
import { env } from './env';

let redis: ReturnType<typeof createClient> | null = null;

export async function connectRedis() {
  if (!env.REDIS_URL || env.REDIS_URL === 'redis://localhost:6379') {
    console.log('Redis not configured, skipping connection');
    return null;
  }
  try {
    redis = createClient({ url: env.REDIS_URL });
    redis.on('error', (err) => console.warn('Redis Client Error:', err.message));
    await redis.connect();
    console.log('Redis connected');
    return redis;
  } catch (err) {
    console.warn('Redis connection failed, proceeding without cache:', (err as Error).message);
    return null;
  }
}

export function getRedis() {
  return redis;
}

export default redis;

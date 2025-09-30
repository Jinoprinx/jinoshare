import IORedis from 'ioredis';
import { config } from '../config';

console.log('Redis URL configured:', !!config.redisUrl);

let redisConnection: IORedis | null = null;

if (config.redisUrl) {
  redisConnection = new IORedis(config.redisUrl as string, {
    maxRetriesPerRequest: null,
    tls: { rejectUnauthorized: false },
    connectTimeout: 10000,
    lazyConnect: true,
  });

  redisConnection.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

  redisConnection.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redisConnection.on('ready', () => {
    console.log('Redis connection ready');
  });
} else {
  console.warn('Redis URL not configured. Scheduling will be disabled.');
}

export { redisConnection };

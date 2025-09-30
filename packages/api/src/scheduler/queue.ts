import { Queue } from 'bullmq';
import { redisConnection } from './redis';

export const POST_QUEUE_NAME = 'social-post-scheduler';

let postQueue: Queue | null = null;

if (redisConnection) {
  postQueue = new Queue(POST_QUEUE_NAME, {
    connection: redisConnection,
  });
} else {
  console.warn('PostQueue not initialized - Redis not available');
}

export { postQueue };

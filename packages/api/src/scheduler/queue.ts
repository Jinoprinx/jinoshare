import { Queue } from 'bullmq';
import { redisConnection } from './redis';

export const POST_QUEUE_NAME = 'social-post-scheduler';

export const postQueue = new Queue(POST_QUEUE_NAME, {
  connection: redisConnection,
});

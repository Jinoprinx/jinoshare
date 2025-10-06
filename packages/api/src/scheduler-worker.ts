import { Worker } from 'bullmq';
import { POST_QUEUE_NAME } from './scheduler';
import { redisConnection } from './scheduler/redis';
import { processPostJob } from './scheduler/processor';
import { connectDb } from '../../common/dist/db';
import './models/Connection'; // Import for side-effect of model registration
import './models/PublishLog'; // Import for side-effect of model registration
import './models/Post'; // Import for side-effect of model registration

console.log('Scheduler worker starting...');

connectDb();

if (redisConnection) {
  const worker = new Worker(POST_QUEUE_NAME, processPostJob, {
    connection: redisConnection,
    concurrency: 5, // Process up to 5 jobs concurrently
    removeOnComplete: { count: 1000 }, // Keep last 1000 completed jobs
    removeOnFail: { count: 5000 }, // Keep last 5000 failed jobs
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with ${err.message}`);
  });

  console.log('Scheduler worker started successfully.');
} else {
  console.warn('Scheduler worker not started - Redis not available.');
}

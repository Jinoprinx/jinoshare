import { Job } from 'bullmq';
import { Post } from '../models/Post';
import { getProvider } from '../providers';
import { PublishLog } from '../models/PublishLog';
import { Connection } from '../models/Connection';

interface PostJobData {
  postId: string;
}

export const processPostJob = async (job: Job<PostJobData>) => {
  const { postId } = job.data;
  console.log(`Processing post ${postId}`);

  const post = await Post.findById(postId).populate('connections');
  if (!post) {
    throw new Error(`Post ${postId} not found`);
  }

  const populatedConnections = post.connections as any[];
  const publishLogIds: any[] = [];

  for (const connection of populatedConnections) {
    try {
      const provider = getProvider(connection.provider);
      if (!provider) {
        throw new Error(`No provider found for ${connection.provider}`);
      }

      await provider.postText(connection.accessToken, { text: post.content });
      const log = await new PublishLog({
        post: post._id,
        connection: connection._id,
        status: 'success',
      }).save();
      publishLogIds.push(log._id);
    } catch (error: any) {
      console.error(`Failed to publish post ${postId} to ${connection.provider}`, error);
      const log = await new PublishLog({
        post: post._id,
        connection: connection._id,
        status: 'failed',
        log: error.message,
      }).save();
      publishLogIds.push(log._id);
    }
  }

  post.status = 'published';
  post.publishLogs = publishLogIds;
  await post.save();
  console.log(`Finished processing post ${postId}`);
};

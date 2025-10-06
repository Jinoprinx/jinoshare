import { Job } from 'bullmq';
import { Post } from '../models/Post';
import { getProvider } from '../providers';
import { PublishLog } from '../models/PublishLog';
import { Connection } from '../models/Connection';
import { config } from '../config';
import fetch from 'node-fetch';

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

      if (post.media && post.media.url) {
        if (!provider.postMedia) {
          throw new Error(`Provider ${connection.provider} does not support media posts.`);
        }
        // Fetch the media file
        const mediaResponse = await fetch(`${config.appUrl}${post.media.url}`);
        if (!mediaResponse.ok) {
          throw new Error(`Failed to fetch media from ${post.media.url}`);
        }
        const fileBuffer = await mediaResponse.buffer();
        const mimeType = mediaResponse.headers.get('content-type') || 'application/octet-stream';
        
        const file = {
          buffer: fileBuffer,
          mimetype: mimeType,
          originalname: post.media.url.split('/').pop() || 'mediafile'
        };

        await provider.postMedia(connection.accessToken, { file, text: post.content });

      } else {
        await provider.postText(connection.accessToken, { text: post.content });
      }

      const log = await new PublishLog({
        userId: post.userId,
        provider: connection.provider,
        content: post.content,
        status: 'success',
      }).save();
      publishLogIds.push(log._id);
      console.log('message scheduled by user has been successfully posted');
    } catch (error: any) {
      console.error('an error occurred and a scheduled post could not be posted');
      console.error(`Failed to publish post ${postId} to ${connection.provider}`, error);
      const log = await new PublishLog({
        userId: post.userId,
        provider: connection.provider,
        content: post.content,
        status: 'error', // Changed from 'failed'
        errorMessage: error.message, // Changed from log
      }).save();
      publishLogIds.push(log._id);
    }
  }

  post.status = 'published';
  post.publishLogs = publishLogIds;
  await post.save();
  console.log(`Finished processing post ${postId}`);
};

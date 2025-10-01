import { Router } from "express";
import { protect } from "../middleware/auth";
import { Post } from "../models/Post";
import { Connection } from "../models/Connection";
import { config } from "../config";
import { postQueue } from "../scheduler";

// Helper to remove a job if it exists
const removeJob = async (jobId: string) => {
  if (jobId && postQueue) {
    const job = await postQueue.getJob(jobId);
    if (job) {
      await job.remove();
    }
  }
};

export const scheduledPost = Router();

// GET /scheduled-posts?startDate=...&endDate=...
scheduledPost.get("/", protect, async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = (req as any).user.id;

  const query: any = { userId, isDeleted: { $ne: true }, status: 'scheduled' };
  if (startDate && endDate) {
    query.scheduledAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
  }

  try {
    const posts = await Post.find(query).sort({ scheduledAt: 1 });
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve posts", detail: err.message });
  }
});

// POST /scheduled-posts
scheduledPost.post("/", protect, async (req, res) => {
  const { content, connections, scheduled_at, scheduledAt, media } = req.body;
  const scheduleDate = scheduled_at || scheduledAt;
  const userId = (req as any).user.id;

  if (!content || !connections || connections.length === 0) {
    return res.status(400).json({ error: "Missing required fields: content and connections." });
  }

  try {
    // Convert platform names to Connection ObjectIds
    const connectionIds = [];
    for (const platformName of connections) {
      const connection = await Connection.findOne({ userId, provider: platformName });
      if (!connection) {
        return res.status(400).json({ error: `No connection found for platform: ${platformName}` });
      }
      connectionIds.push(connection._id);
    }

    const post = new Post({
      userId,
      content,
      connections: connectionIds,
      scheduledAt: scheduleDate ? new Date(scheduleDate) : null,
      status: scheduleDate ? "scheduled" : "draft",
      media,
    });

    if (post.status === 'scheduled' && post.scheduledAt) {
        const delay = post.scheduledAt.getTime() - Date.now();
        if (delay > 0) {
            if (postQueue) {
                try {
                    const job = await postQueue.add('process-post', { postId: post._id }, { delay });
                    post.jobId = job.id;
                    console.log(`user schedule post to be posted at ${post.scheduledAt} from now`);
                } catch (queueErr: any) {
                    console.error("Failed to add job to queue:", queueErr.message);
                    // Continue without scheduling but mark as draft
                    post.status = "draft";
                    post.scheduledAt = null;
                }
            } else {
                console.warn("PostQueue not available - Redis not configured. Saving as draft.");
                post.status = "draft";
                post.scheduledAt = null;
            }
        }
    }
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    console.error("Failed to create post:", err.message);
    res.status(500).json({ error: "Failed to create post", detail: err.message });
  }
});

// PUT /scheduled-posts/:id
scheduledPost.put("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { content, connections, scheduled_at, scheduledAt, status } = req.body;
  const scheduleDate = scheduled_at || scheduledAt;
  const userId = (req as any).user.id;

  try {
    const post = await Post.findOne({ _id: id, userId });
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Remove old job if it exists
    if (post.jobId) {
      await removeJob(post.jobId);
    }

    // Convert platform names to Connection ObjectIds if connections are provided
    let connectionIds = connections;
    if (connections && Array.isArray(connections)) {
      connectionIds = [];
      for (const platformName of connections) {
        const connection = await Connection.findOne({ userId, provider: platformName });
        if (!connection) {
          return res.status(400).json({ error: `No connection found for platform: ${platformName}` });
        }
        connectionIds.push(connection._id);
      }
    }

    post.content = content;
    post.connections = connectionIds;
    post.status = status;
    post.scheduledAt = scheduleDate ? new Date(scheduleDate) : null;

    if (post.status === 'scheduled' && post.scheduledAt) {
        const delay = post.scheduledAt.getTime() - Date.now();
        if (delay > 0) {
            if (postQueue) {
                try {
                    const job = await postQueue.add('process-post', { postId: post._id }, { delay });
                    post.jobId = job.id;
                    console.log(`user schedule post to be posted at ${post.scheduledAt} from now`);
                } catch (queueErr: any) {
                    console.error("Failed to add job to queue:", queueErr.message);
                    post.status = 'draft';
                    post.scheduledAt = null;
                    post.jobId = undefined;
                }
            } else {
                console.warn("PostQueue not available - Redis not configured. Setting as draft.");
                post.status = 'draft';
                post.scheduledAt = null;
                post.jobId = undefined;
            }
        } else {
            post.status = 'draft'; // Time is in the past
            post.jobId = undefined;
        }
    } else {
        post.jobId = undefined;
    }

    await post.save();
    res.json(post);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update post", detail: err.message });
  }
});

// DELETE /scheduled-posts/:id
scheduledPost.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const post = await Post.findOne({ _id: id, userId });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.jobId) {
        await removeJob(post.jobId);
    }
    
    post.isDeleted = true;
    await post.save();

    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete post", detail: err.message });
  }
});
import { Router } from "express";
import { Post } from "../models/Post";
import { config } from "../config";
import { postQueue } from "../scheduler";

// Helper to remove a job if it exists
const removeJob = async (jobId: string) => {
  if (jobId) {
    const job = await postQueue.getJob(jobId);
    if (job) {
      await job.remove();
    }
  }
};

export const scheduledPost = Router();

// GET /scheduled-posts?startDate=...&endDate=...
scheduledPost.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = (req as any).userId || config.defaultUserId;

  const query: any = { userId, isDeleted: { $ne: true } };
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
scheduledPost.post("/", async (req, res) => {
  const { content, connections, scheduled_at, scheduledAt } = req.body;
  const scheduleDate = scheduled_at || scheduledAt;
  const userId = (req as any).userId || config.defaultUserId;

  if (!content || !connections || connections.length === 0) {
    return res.status(400).json({ error: "Missing required fields: content and connections." });
  }

  try {
    const post = new Post({
      userId,
      content,
      connections,
      scheduledAt: scheduleDate ? new Date(scheduleDate) : null,
      status: scheduleDate ? "scheduled" : "draft",
    });

    if (post.status === 'scheduled' && post.scheduledAt) {
        const delay = post.scheduledAt.getTime() - Date.now();
        if (delay > 0) {
            const job = await postQueue.add('process-post', { postId: post._id }, { delay });
            post.jobId = job.id;
        }
    }
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create post", detail: err.message });
  }
});

// PUT /scheduled-posts/:id
scheduledPost.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, connections, scheduled_at, scheduledAt, status } = req.body;
  const scheduleDate = scheduled_at || scheduledAt;
  const userId = (req as any).userId || config.defaultUserId;

  try {
    const post = await Post.findOne({ _id: id, userId });
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Remove old job if it exists
    if (post.jobId) {
      await removeJob(post.jobId);
    }

    post.content = content;
    post.connections = connections;
    post.status = status;
    post.scheduledAt = scheduleDate ? new Date(scheduleDate) : null;

    if (post.status === 'scheduled' && post.scheduledAt) {
        const delay = post.scheduledAt.getTime() - Date.now();
        if (delay > 0) {
            const job = await postQueue.add('process-post', { postId: post._id }, { delay });
            post.jobId = job.id;
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
scheduledPost.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = (req as any).userId || config.defaultUserId;

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
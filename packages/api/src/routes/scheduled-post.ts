import { Router } from "express";
import { Post } from "../models/Post";
import { config } from "../config";

export const scheduledPost = Router();

// GET /scheduled-posts?startDate=...&endDate=...
scheduledPost.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = config.defaultUserId; // Assuming a default user for now

  const query: any = { userId };
  if (startDate && endDate) {
    query.scheduled_at = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
  }

  try {
    const posts = await Post.find(query).sort({ scheduled_at: 1 });
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve posts", detail: err.message });
  }
});

// POST /scheduled-posts
scheduledPost.post("/", async (req, res) => {
  const { content, channels, scheduled_at } = req.body;
  const userId = config.defaultUserId;

  if (!content || !channels || channels.length === 0) {
    return res.status(400).json({ error: "Missing required fields: content and channels." });
  }

  try {
    const post = await Post.create({
      userId,
      content,
      channels,
      scheduled_at: scheduled_at ? new Date(scheduled_at) : null,
      status: scheduled_at ? "scheduled" : "draft",
    });
    res.status(201).json(post);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create post", detail: err.message });
  }
});

// PUT /scheduled-posts/:id
scheduledPost.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, channels, scheduled_at, status } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { content, channels, scheduled_at: scheduled_at ? new Date(scheduled_at) : null, status },
      { new: true } // Return the updated document
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update post", detail: err.message });
  }
});

// DELETE /scheduled-posts/:id
scheduledPost.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(204).send(); // No content
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete post", detail: err.message });
  }
});

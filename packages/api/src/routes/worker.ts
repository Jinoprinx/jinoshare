import { Router } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { Connection } from "../models/Connection";
import { PublishLog } from "../models/PublishLog";
import { getProvider } from "../providers";
import { config } from "../config";

export const worker = Router();

// POST /worker/publish-due-posts
worker.post("/publish-due-posts", async (req, res) => {
  // Security: Ensure the request comes from a trusted source (e.g., Heroku Scheduler)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${config.workerSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const users = await User.find({ is_auto_posting_enabled: true });
    const userIds = users.map(u => u.userId);

    const duePosts = await Post.find({
      userId: { $in: userIds },
      status: "scheduled",
      scheduled_at: { $lte: new Date() },
    });

    if (duePosts.length === 0) {
      return res.status(200).json({ ok: true, message: "No posts were due." });
    }

    // Process each post
    for (const post of duePosts) {
      post.status = "publishing";
      await post.save();

      let isSuccessful = true;
      const logIds = [];

      for (const channel of post.channels) {
        try {
          const conn = await Connection.findOne({ userId: post.userId, provider: channel });
          if (!conn) throw new Error(`No connected account for ${channel}`);

          const provider = getProvider(channel);
          if (!provider) throw new Error(`Unknown provider: ${channel}`);

          const accessToken = await provider.ensureValidAccessToken({
            accessToken: conn.accessToken,
            refreshToken: conn.refreshToken,
            expiresAt: conn.expiresAt,
            async update(tokens) {
              if (!Object.keys(tokens).length) return;
              conn.set(tokens);
              await conn.save();
            }
          });

          const result = await provider.postText(accessToken, { text: post.content });

          const log = await PublishLog.create({
            userId: post.userId,
            provider: channel,
            content: post.content,
            providerPostId: result.id,
            status: "success",
          });
          logIds.push(log._id);

        } catch (err: any) {
          isSuccessful = false;
          const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
          const log = await PublishLog.create({
            userId: post.userId,
            provider: channel,
            content: post.content,
            status: "error",
            errorMessage: message,
          });
          logIds.push(log._id);
        }
      }

      post.status = isSuccessful ? "published" : "failed";
      post.publish_logs = logIds;
      await post.save();
    }

    res.status(200).json({ ok: true, message: `Processed ${duePosts.length} posts.` });

  } catch (err: any) {
    res.status(500).json({ error: "Worker failed", detail: err.message });
  }
});

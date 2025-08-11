import { Router } from "express";
import { getProvider } from "../providers/index.js";
import { Connection } from "../models/Connection.js";
import { PublishLog } from "../models/PublishLog.js";
import { config } from "../config.js";

export const post = Router();

/**
 * POST /api/:provider/post
 * body: { text: string, userId?: string }
 */
post.post("/:provider/post", async (req, res) => {
  const providerId = (req.params.provider || "").toLowerCase();
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).json({ error: "Unknown provider" });

  const { text, userId } = req.body as { text?: string; userId?: string };
  if (!text || !text.trim()) return res.status(400).json({ error: "Missing text" });

  const uid = userId || config.defaultUserId;

  try {
    const conn = await Connection.findOne({ userId: uid, provider: providerId });
    if (!conn) return res.status(400).json({ error: `No connected ${provider.displayName} account` });

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

    const result = await provider.postText(accessToken, { text: text.trim() });

    await PublishLog.create({
      userId: uid,
      provider: providerId as any,
      content: text.trim(),
      providerPostId: result.id,
      status: "success"
    });

    res.json({ ok: true, id: result.id });
  } catch (err: any) {
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    await PublishLog.create({
      userId: uid,
      provider: providerId as any,
      content: text?.trim() || "",
      status: "error",
      errorMessage: message
    });
    res.status(500).json({ error: "Failed to post", detail: message });
  }
});

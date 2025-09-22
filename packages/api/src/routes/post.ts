import { Router } from "express";
import { getProvider } from "../providers/index";
import { Connection } from "../models/Connection";
import { PublishLog } from "../models/PublishLog";
import { config } from "../config";
import { Channel } from "@common/types";
import { protect } from "../middleware/auth";

export const post = Router();

/**
 * POST /api/:provider/post
 * body: { text: string }
 */
post.post("/:provider/post", protect, async (req, res) => {
  const providerId = (req.params.provider || "").toLowerCase() as Channel;
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).json({ error: "Unknown provider" });

  const { text } = req.body as { text?: string; };
  if (!text || !text.trim()) return res.status(400).json({ error: "Missing text" });

  const uid = (req as any).user.id || (req as any).user.sub;
  console.log('Post route - user object:', (req as any).user);
  console.log('Post route - extracted uid:', uid);

  try {
    const conn = await Connection.findOne({ userId: uid, provider: providerId });
    console.log('Found connection:', conn ? 'Yes' : 'No', conn?.provider);
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
    }, uid);

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

/**
 * POST /api/:provider/media
 * body: FormData with file and optional text
 */
post.post("/:provider/media", protect, async (req, res) => {
  const providerId = (req.params.provider || "").toLowerCase() as Channel;
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).json({ error: "Unknown provider" });

  if (!provider.postMedia) {
    return res.status(400).json({ error: `${provider.displayName} does not support media posts` });
  }

  const { file } = req as any; // Assuming multer middleware is used
  const { text } = req.body as { text?: string; };

  if (!file) return res.status(400).json({ error: "Missing media file" });

  const uid = (req as any).user.id || (req as any).user.sub;
  console.log('Media route - user object:', (req as any).user);
  console.log('Media route - extracted uid:', uid);

  try {
    const conn = await Connection.findOne({ userId: uid, provider: providerId });
    console.log('Found connection for media:', conn ? 'Yes' : 'No', conn?.provider);
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
    }, uid);

    const result = await provider.postMedia(accessToken, { file, text: text?.trim() });

    await PublishLog.create({
      userId: uid,
      provider: providerId as any,
      content: text?.trim() || "Media post",
      providerPostId: result.id,
      status: "success"
    });

    res.json({ ok: true, id: result.id });
  } catch (err: any) {
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    await PublishLog.create({
      userId: uid,
      provider: providerId as any,
      content: text?.trim() || "Media post",
      status: "error",
      errorMessage: message
    });
    res.status(500).json({ error: "Failed to post media", detail: message });
  }
});

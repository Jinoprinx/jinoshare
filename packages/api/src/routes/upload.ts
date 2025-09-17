
import { Router, Request, Response } from "express";
import { getProvider } from "../providers/index";
import { Connection } from "../models/Connection";
import { config } from "../config";
import { Channel } from "@common/types";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadRouter = Router();

uploadRouter.post("/:provider/upload", upload.single("file"), async (req: Request, res: Response) => {
  const providerId = (req.params.provider || "").toLowerCase() as Channel;
  const provider = getProvider(providerId);
  if (!provider) return res.status(404).json({ error: "Unknown provider" });

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { userId } = req.body as { userId?: string };
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

    if (!provider.postMedia) {
      return res.status(501).json({ error: "Provider does not support media uploads" });
    }

    const result = await provider.postMedia(accessToken, {
      file: req.file,
      text: req.body.text
    });

    res.json({ ok: true, url: result.url });
  } catch (err: any) {
    const message = err.response?.data ? JSON.stringify(err.response.data) : err.message;
    res.status(500).json({ error: "Failed to upload media", detail: message });
  }
});

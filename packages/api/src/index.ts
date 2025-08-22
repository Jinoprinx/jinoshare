import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { connectDb } from "./db";
import { auth } from "./routes/auth";
import { post } from "./routes/post";
import { uploadRouter } from "./routes/upload";
import { mediaStorageRouter } from "./routes/media-storage";
import { aiGenerateRouter } from "./routes/ai-generate";
import { aiImageGenerateRouter } from "./routes/ai-image-generate";
import { aiVideoGenerateRouter } from "./routes/ai-video-generate";
import { aiRewriteRouter } from "./routes/ai-rewrite";
import { aiTagsRouter } from "./routes/ai-tags";
import { aiModerateRouter } from "./routes/ai-moderate";
import { aiForecastRouter } from "./routes/ai-forecast";
import { aiBestTimeRouter } from "./routes/ai-best-time";

async function main() {
  await connectDb();

  const app = express();

  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/auth", auth);
  app.use("/api/ai/generate/", aiGenerateRouter);
  app.use("/api/ai/image-generate/", aiImageGenerateRouter);
  app.use("/api/ai/video-generate/", aiVideoGenerateRouter);
  app.use("/api/ai/rewrite/", aiRewriteRouter);
  app.use("/api/ai/tags/", aiTagsRouter);
  app.use("/api/ai/moderate/", aiModerateRouter);
  app.use("/api/ai/forecast/", aiForecastRouter);
  app.use("/api/ai/best-time/", aiBestTimeRouter);
  app.use("/api", post);
  app.use("/api/upload", uploadRouter);
  app.use("/api/media-storage", mediaStorageRouter);

  app.listen(config.port, () => {
    console.log(`Backend running on http://localhost:${config.port}`);
  });
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);   
});

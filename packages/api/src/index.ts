import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "@common/db";
import { config } from "@common/config";
import { auth } from "./routes/auth";
import { signup } from "./routes/signup";
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
import { scheduledPost } from "./routes/scheduled-post";
import { userRoutes } from "./routes/user";
import { worker } from "./routes/worker";
import { connections } from "./routes/connections";

import { protect, protectBearer } from "./middleware/auth";

async function main() {
  await connectDb();

  const app = express();



  app.use(cors({ 
    origin: true, 
    credentials: true, 
    preflightContinue: true, 
  }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/auth", auth);
  app.use("/signup", signup);
  app.use("/api/ai/generate/", aiGenerateRouter);
  app.use("/api/ai/image-generate/", aiImageGenerateRouter);
  app.use("/api/ai/video-generate/", aiVideoGenerateRouter);
  app.use("/api/ai/rewrite/", aiRewriteRouter);
  app.use("/api/ai/tags/", aiTagsRouter);
  app.use("/api/ai/moderate/", aiModerateRouter);
  app.use("/api/ai/forecast/", aiForecastRouter);
  app.use("/api/ai/best-time/", aiBestTimeRouter);
  app.use("/api/scheduled-posts", protectBearer, scheduledPost);
  app.use("/api/user", protect, userRoutes);
  app.use("/api/connections", protect, connections);
  app.use("/api/worker", worker);
    app.use("/api/post", protect, post);
  app.use("/api/upload", protect, uploadRouter);
  app.use("/api/media-storage", protect, mediaStorageRouter);

  app.listen(config.port, () => {
    console.log(`Backend running on http://localhost:${config.port}`);
  });
}

main().catch(err => {
  console.error("Fatal:", err);
});

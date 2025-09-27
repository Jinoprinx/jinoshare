import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "../../common/dist/db";
import { config } from "../../common/dist/config";
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
  try {
    console.log("Starting application...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Port:", config.port);
    console.log("MongoDB URI:", config.mongoUri.replace(/\/\/.*@/, "//***:***@"));

    await connectDb();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

  const app = express();



  app.use(cors({
    origin: [
      "https://jinoshare.vercel.app",
      "https://jinoshare-api-59028d83893a.herokuapp.com",
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:4001"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    optionsSuccessStatus: 200
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

  // Global error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
  });

  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  const server = app.listen(config.port, () => {
    console.log(`Backend running on port ${config.port}`);
  });

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
}

main().catch(err => {
  console.error("Fatal:", err);
});

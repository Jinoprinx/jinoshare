import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config.js";
import { connectDb } from "./db.js";
import { auth } from "./routes/auth.js";
import { post } from "./routes/post.js";

async function main() {
  await connectDb();

  const app = express();

  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/auth", auth);
  app.use("/api", post);

  app.listen(config.port, () => {
    console.log(`Backend running on http://localhost:${config.port}`);
  });
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});

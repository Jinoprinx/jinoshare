import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const upload = multer({ storage: multer.memoryStorage() });
export const mediaStorageRouter = Router();

// Create media storage directory if it doesn't exist
const MEDIA_DIR = path.join(process.cwd(), 'media-storage');
const AI_MEDIA_DIR = path.join(process.cwd(), 'ai-generated');
fs.mkdir(MEDIA_DIR, { recursive: true }).catch(() => {});
fs.mkdir(AI_MEDIA_DIR, { recursive: true }).catch(() => {});

// Store media file temporarily for draft posts
mediaStorageRouter.post("/store", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Generate unique filename
    const fileId = crypto.randomUUID();
    const ext = path.extname(req.file.originalname);
    const filename = `${fileId}${ext}`;
    const filePath = path.join(MEDIA_DIR, filename);

    // Save file to storage
    await fs.writeFile(filePath, req.file.buffer);

    // Return file info
    res.json({
      ok: true,
      fileId,
      filename,
      mediaType: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
      mediaUrl: `/api/media-storage/serve/${filename}`,
      size: req.file.size
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to store media", detail: err.message });
  }
});

// Serve stored media files
mediaStorageRouter.get("/serve/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(MEDIA_DIR, filename);
    
    // Check if file exists
    await fs.access(filePath);
    
    // Determine content type from extension
    const ext = path.extname(filename).toLowerCase();
    const contentType = getContentType(ext);
    
    if (contentType) {
      res.set('Content-Type', contentType);
    }
    
    // Stream the file
    const fileBuffer = await fs.readFile(filePath);
    res.send(fileBuffer);
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

// Serve AI-generated media files
mediaStorageRouter.get("/serve-ai/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(AI_MEDIA_DIR, filename);
    
    // Check if file exists
    await fs.access(filePath);
    
    // Determine content type from extension
    const ext = path.extname(filename).toLowerCase();
    const contentType = getContentType(ext);
    
    if (contentType) {
      res.set('Content-Type', contentType);
    }
    
    // Stream the file
    const fileBuffer = await fs.readFile(filePath);
    res.send(fileBuffer);
  } catch (err) {
    res.status(404).json({ error: "AI-generated file not found" });
  }
});

// Clean up old media files (could be called periodically)
mediaStorageRouter.delete("/cleanup/:fileId", async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    
    // Find and delete file with this ID
    const files = await fs.readdir(MEDIA_DIR);
    const fileToDelete = files.find(f => f.startsWith(fileId));
    
    if (fileToDelete) {
      await fs.unlink(path.join(MEDIA_DIR, fileToDelete));
      res.json({ ok: true, message: "File deleted" });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete file", detail: err.message });
  }
});

function getContentType(ext: string): string | null {
  const types: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo'
  };
  return types[ext] || null;
}
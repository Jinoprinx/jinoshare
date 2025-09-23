
export type Channel = "x" | "linkedin" | "facebook" | "instagram" | "tiktok" | "youtube";

export interface IConnection {
  userId: string;
  provider: Channel;
  providerUserId?: string;
  handle?: string;
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  scope?: string;
  expiresAt?: Date;
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPublishLog {
  userId: string;
  provider: Channel;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  providerPostId?: string;
  status: "success" | "error";
  errorMessage?: string;
  createdAt: Date;
}

export interface ISharedPost {
  _id: string;
  userId: string;
  content: string;
  channels: Channel[];
  status: "draft" | "scheduled" | "publishing" | "published" | "failed";
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// AI integration Section
export interface AIGenerateRequest {
  topic: string;
  platform: string;
  tone?: string;
  count?: number;
}

export interface AIGenerateResponse {
  ok: boolean;
  posts?: string[];
  error?: string;
}

export interface AIRewriteRequest {
  text: string;
  platform: string;
  tone?: string;
  improve?: string;
}

export interface AIRewriteResponse {
  ok: boolean;
  text?: string;
  error?: string;
}

export interface AIImageGenerateRequest {
  prompt: string;
  style?: string;
  dimensions?: string;
  quality?: string;
}

export interface AIImageGenerateResponse {
  ok: boolean;
  imageUrl?: string;
  error?: string;
}

export interface AIVideoGenerateRequest {
  prompt: string;
  duration?: number;
  style?: string;
  dimensions?: string;
}

export interface AIVideoGenerateResponse {
  ok: boolean;
  videoUrl?: string;
  error?: string;
}

export interface AITagsRequest {
  text: string;
  platform: string;
}

export interface AITagsResponse {
  ok: boolean;
  caption?: string;
  hashtags?: string[];
  error?: string;
}


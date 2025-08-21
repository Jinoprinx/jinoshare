
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
  providerPostId?: string;
  status: "success" | "error";
  errorMessage?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  status: "draft" | "scheduled" | "published";
  channels: Channel[];
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export function emptyPost(): Post {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    content: "",
    status: "draft",
    channels: [],
    createdAt: now,
    updatedAt: now,
  };
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

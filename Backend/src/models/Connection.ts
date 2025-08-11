import { Schema, model } from "mongoose";

export interface IConnection {
  userId: string;                // your app's user
  provider: "x" | "linkedin" | "facebook" | "instagram";
  providerUserId?: string;       // e.g., X user id, LinkedIn URN, Page ID
  handle?: string;               // @handle or name
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  scope?: string;                // space-delimited
  expiresAt?: Date;
  meta?: Record<string, any>;    // provider-specific extras
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionSchema = new Schema<IConnection>(
  {
    userId: { type: String, index: true, required: true },
    provider: { type: String, enum: ["x", "linkedin", "facebook", "instagram"], required: true },
    providerUserId: String,
    handle: String,
    accessToken: { type: String, required: true },
    refreshToken: String,
    tokenType: String,
    scope: String,
    expiresAt: Date,
    meta: Schema.Types.Mixed
  },
  { timestamps: true }
);

ConnectionSchema.index({ userId: 1, provider: 1 }, { unique: true });

export const Connection = model<IConnection>("Connection", ConnectionSchema);

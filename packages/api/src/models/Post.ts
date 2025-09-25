import mongoose, { Document, Schema } from "mongoose";
import { ISharedPost, Channel } from "@common/types";

// Mongoose document interface
export interface IPost extends Omit<ISharedPost, '_id' | 'scheduledAt' | 'createdAt' | 'updatedAt'>, Document {
  scheduledAt: Date | null;
  publishLogs: mongoose.Types.ObjectId[];
  connections: mongoose.Types.ObjectId[];
  jobId?: string;
  isDeleted?: boolean;
}

const PostSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    content: { type: String, required: true },
    channels: [{ type: String, required: true }],
    connections: [{ type: Schema.Types.ObjectId, ref: 'Connection' }],
    status: { type: String, enum: ['draft', 'scheduled', 'publishing', 'published', 'failed'], default: 'draft' },
    jobId: { type: String },
    scheduledAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    publishLogs: [{ type: Schema.Types.ObjectId, ref: "PublishLog" }],
    media: { 
      url: { type: String },
      type: { type: String, enum: ['image', 'video'] }
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);

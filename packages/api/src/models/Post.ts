import mongoose, { Document, Schema } from "mongoose";
import { ISharedPost, Channel } from "@jino/common";

// Mongoose document interface
export interface IPost extends Omit<ISharedPost, '_id' | 'scheduled_at' | 'createdAt' | 'updatedAt'>, Document {
  scheduled_at: Date | null;
  publish_logs: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    content: { type: String, required: true },
    channels: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["draft", "scheduled", "publishing", "published", "failed"],
      default: "draft",
      index: true,
    },
    scheduled_at: { type: Date, index: true },
    publish_logs: [{ type: Schema.Types.ObjectId, ref: "PublishLog" }],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);

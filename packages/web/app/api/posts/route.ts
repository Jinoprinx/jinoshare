import { NextRequest, NextResponse } from "next/server";
import { getAll, upsert } from "@/lib/db";
import { ISharedPost } from "@jino/common";

export async function GET() {
  const posts = await getAll();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<ISharedPost>;
  const now = new Date().toISOString();
  const post: ISharedPost = {
    userId: 'dev-user', // Assuming a default user
    status: 'draft',
    channels: [],
    ...body,
    _id: body._id || crypto.randomUUID(),
    createdAt: body.createdAt || now,
    updatedAt: now,
    content: body.content || '',
    scheduledAt: body.scheduledAt || null,
  };
  await upsert(post);
  return NextResponse.json({ post });
}

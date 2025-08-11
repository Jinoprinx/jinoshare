import { NextRequest, NextResponse } from "next/server";
import { getAll, upsert } from "@/lib/db";
import { Post, emptyPost } from "@/lib/schema";

export async function GET() {
  const posts = await getAll();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Post>;
  const now = new Date().toISOString();
  const post: Post = {
    ...emptyPost(),
    ...body,
    id: body.id || crypto.randomUUID(),
    createdAt: body.createdAt || now,
    updatedAt: now
  };
  await upsert(post);
  return NextResponse.json({ post });
}

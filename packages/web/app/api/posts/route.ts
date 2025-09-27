import { NextRequest, NextResponse } from "next/server";
import { getAll, upsert } from "@/lib/db";
import { ISharedPost } from "@jino/common";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const posts = await getAll((session.user as any).id);
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const body = (await req.json()) as Partial<ISharedPost>;
  const now = new Date().toISOString();
  const post: ISharedPost = {
    userId: (session.user as any).id,
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

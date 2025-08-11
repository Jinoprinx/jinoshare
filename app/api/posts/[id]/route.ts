import { NextRequest, NextResponse } from "next/server";
import { get, remove, upsert } from "@/lib/db";
import { Post } from "@/lib/schema";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Post;
  const existing = await get(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated: Post = { ...existing, ...body, id: params.id, updatedAt: new Date().toISOString() };
  await upsert(updated);
  return NextResponse.json({ post: updated });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await remove(params.id);
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { get, remove, upsert } from "@/lib/db";
import { ISharedPost } from "@jino/common";

export async function PUT(req: NextRequest, { params }: any) {
  const body = (await req.json()) as ISharedPost;
  const { id } = params;
  const existing = await get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated: ISharedPost = { ...existing, ...body, _id: id, updatedAt: new Date().toISOString() };
  await upsert(updated);
  return NextResponse.json({ post: updated });
}

export async function DELETE(_: NextRequest, { params }: any) {
  const { id } = params;
  await remove(id);
  return NextResponse.json({ ok: true });
}
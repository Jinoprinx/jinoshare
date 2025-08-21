import { promises as fs } from "fs";
import path from "path";
import { Post } from "@jino/common";

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "db.json");

async function ensure() {
  try { await fs.mkdir(DATA, { recursive: true }); } catch {}
  try { await fs.access(FILE); } catch {
    await fs.writeFile(FILE, JSON.stringify({ posts: [] }, null, 2), "utf-8");
  }
}

export async function getAll(): Promise<Post[]> {
  await ensure();
  const raw = await fs.readFile(FILE, "utf-8");
  const data = JSON.parse(raw) as { posts: Post[] };
  return data.posts.sort((a, b) => (b.createdAt.localeCompare(a.createdAt)));
}

export async function saveAll(posts: Post[]) {
  await ensure();
  await fs.writeFile(FILE, JSON.stringify({ posts }, null, 2), "utf-8");
}

export async function upsert(post: Post) {
  const posts = await getAll();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = { ...post, updatedAt: new Date().toISOString() };
  else posts.unshift({ ...post, updatedAt: new Date().toISOString() });
  await saveAll(posts);
  return post;
}

export async function remove(id: string) {
  const posts = await getAll();
  await saveAll(posts.filter(p => p.id !== id));
}

export async function get(id: string) {
  const posts = await getAll();
  return posts.find(p => p.id === id) || null;
}

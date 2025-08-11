export type Channel = "x" | "tiktok" | "instagram" | "youtube" | "linkedin" | "facebook";
export type Status = "draft" | "scheduled" | "published";

export type Post = {
  id: string;
  title: string;
  content: string;
  channels: Channel[];
  status: Status;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export function emptyPost(): Post {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    channels: [],
    status: "draft",
    createdAt: now,
    updatedAt: now
  };
}

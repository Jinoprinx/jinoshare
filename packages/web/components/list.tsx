"use client";
import { format } from "date-fns";
import { ISharedPost } from "@jino/common";
import { toast } from "@/components/toast";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const SUPPORTED_PROVIDERS = ["x", "linkedin", "facebook", "instagram"] as const;

function getProvidersFromChannels(channels: string[]) {
  return SUPPORTED_PROVIDERS.filter(p => channels.includes(p));
}

async function postToProvider(provider: string, text: string) {
  const res = await fetch(`${BACKEND}/api/${provider}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || data.error || `Failed to post to ${provider}`);
  return data;
}

export function ContentList({ posts, onUpdate, onDelete }: { posts: ISharedPost[]; onUpdate: (p: ISharedPost)=>void; onDelete: (id: string)=>void }) {

  async function postNow(p: ISharedPost) {
    const text = p.content.trim();
    if (!text) return toast.info("Post has no content");
    const targets = getProvidersFromChannels(p.channels);
    if (targets.length === 0) return toast.info("No supported providers selected");
    for (const provider of targets) {
      try {
        const res = await postToProvider(provider, text);
        toast.success(`Posted to ${provider.toUpperCase()} (id: ${res.id})`);
      } catch (err: any) {
        toast.error(`${provider.toUpperCase()}: ${err.message || "Failed"}`);
      }
    }
  }

  return (
    <div className="grid gap-3">
      {posts.map(p => (
        <div key={p._id} className="card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-gray-500">{p.status}</span>
                <div className="flex gap-1">
                  {p.channels.map(c => <span key={c} className="badge">{c}</span>)}
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap mt-1">{p.content}</p>
              {p.scheduled_at && (
                <p className="text-sm text-gray-500 mt-1">
                  Scheduled: {format(new Date(p.scheduled_at), "EEE, MMM d p")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn-outline" onClick={() => onUpdate({ ...p, status: p.status === "draft" ? "scheduled" : "draft" })}>
                {p.status === "draft" ? "Schedule" : "Unschedule"}
              </button>
              <button className="btn-outline" onClick={() => onDelete(p._id)}>Delete</button>
              <button className="btn-outline" onClick={() => postNow(p)}>Post Now</button>
            </div>
          </div>
        </div>
      ))}
      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
    </div>
  );
}
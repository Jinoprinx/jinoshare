"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { Editor } from "@/components/editor";
import { Channels } from "@/components/channels";
import { ContentList } from "@/components/list";
import { Calendar } from "@/components/calendar";
import { toast, Toasts } from "@/components/toast";
import { generateBatch } from "@/lib/generator";
import { Post, Channel, emptyPost } from "@jino/common";
import { ConnectedModal } from "@/components/connected";
import { AI } from "@/components/AI";
 
type ProviderId = "x" | "linkedin" | "facebook" | "instagram";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" }
];

function providersFromChannels(channels: Channel[]): ProviderId[] {
  const set = new Set<ProviderId>();
  if (channels.includes("x")) set.add("x");
  if (channels.includes("linkedin")) set.add("linkedin");
  if (channels.includes("instagram")) set.add("instagram");
  // Add "facebook" here if you add it to Channels.
  return Array.from(set);
}

async function postToProvider(provider: ProviderId, text: string, userId?: string) {
  const res = await fetch(`${BACKEND}/api/${provider}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userId ? { text, userId } : { text })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || data.error || `Failed to post to ${provider}`);
  return data as { ok: true; id: string };
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Post>(emptyPost());
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState<ProviderId | "all" | null>(null);
  const [tab, setTab] = useState<"write"|"batch"|"calendar"|"library"|"ai">("write");
  const [justConnected, setJustConnected] = useState<ProviderId | null>(null);

  // Auto-post state
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);
  const autoPostingRef = useRef(false);

  const selectedCount = posts.filter(p => p.status === "scheduled" || p.status === "draft").length;

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts);
  }
  useEffect(() => { fetchPosts(); }, []);

  // Detect OAuth callback (?x=connected, ?linkedin=error, etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    let showed = false;
    for (const p of PROVIDERS) {
      const v = url.searchParams.get(p.id);
      if (v === "connected") {
        setJustConnected(p.id);
        toast.success(`${p.label} connected`);
        showed = true;
      } else if (v === "error") {
        toast.error(`${p.label} connection failed`);
        showed = true;
      }
      url.searchParams.delete(p.id);
    }
    if (showed) window.history.replaceState({}, "", url.toString());
  }, []);

  async function saveDraft() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      const data = await res.json();
      setPosts(p => [data.post, ...p]);
      setDraft(emptyPost());
      toast.success("Saved");
    } catch {
      toast.error("Could not save");
    } finally { setLoading(false); }
  }

  // Update Post
  async function updatePost(p: Post) {
    setPosts(prev => prev.map(x => x.id === p.id ? p : x)); // optimistic
    await fetch(`/api/posts/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p)
    });
  }

  // Delete Post
  async function deletePost(id: string) {
    setPosts(prev => prev.filter(p => p.id !== id));
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
  }

  function onBatchGenerate(seed: string, count: number, tone: string, preset: Channel | "generic") {
    const items = generateBatch(seed, count, tone, preset);
    setPosts(prev => [...items, ...prev]);
    toast.success(`Generated ${items.length} posts`);
  }

  function connect(provider: ProviderId) {
    window.location.href = `${BACKEND}/auth/${provider}/login`;
  }

  async function postDraftTo(provider: ProviderId) {
    const text = draft.content.trim();
    if (!text) return toast.info("Write something first");
    try {
      setPosting(provider);
      const res = await postToProvider(provider, text);
      toast.success(`Posted to ${provider.toUpperCase()} (id: ${res.id})`);
    } catch (e: any) {
      toast.error(e.message || `Failed to post to ${provider}`);
    } finally {
      setPosting(null);
    }
  }

  async function postDraftToSelected() {
    const text = draft.content.trim();
    if (!text) return toast.info("Write something first");
    const targets = providersFromChannels(draft.channels);
    if (targets.length === 0) return toast.info("Select at least one supported provider in Channels");

    try {
      setPosting("all");
      for (const p of targets) {
        try {
          const res = await postToProvider(p, text);
          toast.success(`Posted to ${p.toUpperCase()} (id: ${res.id})`);
        } catch (err: any) {
          toast.error(`${p.toUpperCase()}: ${err.message || "Failed"}`);
        }
      }
    } finally {
      setPosting(null);
    }
  }

  // Auto-posting loop: checks scheduled posts every 30s (only while dashboard is open)
  useEffect(() => {
    if (!autoPostEnabled) return;
    const interval = setInterval(async () => {
      if (autoPostingRef.current) return;
      autoPostingRef.current = true;

      try {
        const now = Date.now();
        // Find due posts: status scheduled and scheduledAt <= now
        const due = posts.filter(p => p.status === "scheduled" && p.scheduledAt && new Date(p.scheduledAt).getTime() <= now);
        for (const p of due) {
          const text = p.content.trim();
          if (!text) continue;
          const targets = providersFromChannels(p.channels);
          if (targets.length === 0) continue;

          let anySuccess = false;
          for (const provider of targets) {
            try {
              const res = await postToProvider(provider, text);
              toast.success(`Auto-posted to ${provider.toUpperCase()} (id: ${res.id})`);
              anySuccess = true;
            } catch (e: any) {
              toast.error(`Auto-post ${provider.toUpperCase()}: ${e.message || "Failed"}`);
            }
          }

          if (anySuccess) {
            const updated: Post = { ...p, status: "published" };
            await updatePost(updated);
          }
        }
      } finally {
        autoPostingRef.current = false;
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [autoPostEnabled, posts]); // Re-run if posts change or toggle changes

  const tabs = useMemo(() => ([
    { key: "write", label: "Write" },
    { key: "batch", label: "Batch" },
    { key: "calendar", label: "Calendar" },
    { key: "library", label: "Library" },
    { key: "ai", label: "AI" }
  ] as const), []);

  return (
    <div className="space-y-6">
      <Toasts />
      {justConnected && (
        <ConnectedModal
          provider={justConnected}
          onClose={() => setJustConnected(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          {tabs.map(t => (
            <button key={t.key}
              onClick={() => setTab(t.key)}
              className={`btn-outline ${tab===t.key ? "border-brand-600 text-brand-600" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Connections + Auto-post toggle */}
      <div className="card flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {PROVIDERS.map(p => (
            <button key={p.id} className="btn-outline" onClick={() => connect(p.id)}>
              Connect {p.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={autoPostEnabled}
            onChange={(e) => setAutoPostEnabled(e.target.checked)}
          />
          Enable auto‑posting of scheduled items
        </label>
      </div>

      {tab === "write" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card">
            <Editor value={draft} onChange={setDraft} />
            <div className="flex items-center justify-between mt-4">
              <Channels value={draft.channels} onChange={(c) => setDraft({ ...draft, channels: c })} />
              <div className="flex gap-2">
                <button className="btn" onClick={saveDraft} disabled={loading}>
                  {loading ? "Saving..." : "Save draft"}
                </button>
              </div>
            </div>

            {/* Distribute controls */}
            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="btn"
                  onClick={postDraftToSelected}
                  disabled={posting !== null || !draft.content.trim()}
                  title="Posts to providers represented in selected Channels"
                >
                  {posting === "all" ? "Posting..." : "Post to selected providers"}
                </button>
                <span className="text-sm text-gray-500">Or post directly:</span>
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    className="btn-outline"
                    onClick={() => postDraftTo(p.id)}
                    disabled={posting !== null || !draft.content.trim()}
                  >
                    {posting === p.id ? `Posting ${p.label}...` : `Post ${p.label}`}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Note: Instagram likely needs media; text-only may fail until that workflow is added.
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold">Tips</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2 mt-2">
              <li>Lead strong in the first 2 lines.</li>
              <li>One idea per post. Keep it punchy.</li>
              <li>Add a call‑to‑action tailored to the channel.</li>
            </ul>
          </div>
        </div>
      )}

      {tab === "batch" && (
        <div className="card space-y-4">
          <BatchForm onGenerate={onBatchGenerate} />
          <p className="text-sm text-gray-600">Generated posts appear in the library.</p>
        </div>
      )}

      {tab === "calendar" && (
        <Calendar posts={posts} onChange={updatePost} />
      )}

      {tab === "library" && (
        <ContentList posts={posts} onUpdate={updatePost} onDelete={deletePost} />
      )}

      {tab === "ai" && <AI />}

      <div className="text-sm text-gray-500">
        {selectedCount} items in pipeline
      </div>
    </div>
  );
}

function BatchForm({ onGenerate }: { onGenerate: (seed: string, count: number, tone: string, preset: any) => void }) {
  const [seed, setSeed] = useState("");
  const [count, setCount] = useState(8);
  const [tone, setTone] = useState("concise");
  const [preset, setPreset] = useState<"generic"|"x"|"tiktok"|"instagram"|"youtube"|"linkedin">("generic");
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-4 gap-3">
        <input className="input md:col-span-2" placeholder="Seed idea (e.g., 'hooks for productivity')"
               value={seed} onChange={e=>setSeed(e.target.value)} />
        <select className="input" value={tone} onChange={e=>setTone(e.target.value)}>
          <option value="concise">Concise</option>
          <option value="casual">Casual</option>
          <option value="contrarian">Contrarian</option>
          <option value="educational">Educational</option>
        </select>
        <select className="input" value={preset} onChange={e=>setPreset(e.target.value as any)}>
          <option value="generic">Generic</option>
          <option value="x">X/Twitter</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube Shorts</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <input className="input w-28" type="number" min={1} max={30} value={count}
               onChange={e=>setCount(parseInt(e.target.value||"1"))} />
        <button className="btn" onClick={() => onGenerate(seed, count, tone, preset)} disabled={!seed}>
          Generate batch
        </button>
      </div>
    </div>
  );
}

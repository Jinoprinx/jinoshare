"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { Editor } from "@components/editor";
import { Channels } from "@components/channels";
import { ContentList } from "@components/list";
import { Calendar } from "@components/calendar";
import { toast, Toasts } from "@components/toast";
import { generateBatch } from "@/lib/generator";
import { ISharedPost, Channel, IConnection } from "@jino/common";
//look into reusing using this AIPage
import AIPage from "./ai/page";
import {
  PlusIcon,
  CalendarIcon,
  LayoutGridIcon,
  PenSquareIcon,
  SparklesIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  FilterIcon,
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

type ProviderId = "x" | "linkedin" | "facebook" | "instagram";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jinoshare-api-59028d83893a.herokuapp.com";

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
];

function providersFromChannels(channels: Channel[]): ProviderId[] {
  const set = new Set<ProviderId>();
  if (channels.includes("x")) set.add("x");
  if (channels.includes("linkedin")) set.add("linkedin");
  if (channels.includes("instagram")) set.add("instagram");
  return Array.from(set);
}

async function postToProvider(
  provider: ProviderId,
  text: string,
  token: string,
  userId?: string
) {
  const res = await fetch(`${BACKEND}/api/post/${provider}/post`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
    body: JSON.stringify(userId ? { text, userId } : { text }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.detail || data.error || `Failed to post to ${provider}`);
  return data as { ok: true; id: string };
}

async function postMediaToProvider(
  provider: ProviderId,
  file: File,
  text?: string,
  userId?: string,
  token?: string
) {
  const formData = new FormData();
  formData.append("file", file);
  if (text) formData.append("text", text);
  if (userId) formData.append("userId", userId);

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND}/api/upload/${provider}/upload`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(
      data.detail || data.error || `Failed to upload to ${provider}`
    );
  return data as { ok: true; url: string };
}

import { withAuth } from "@components/withAuth";

function Dashboard() {
  const { data: session, status, update } = useSession();

  const [posts, setPosts] = useState<ISharedPost[]>([]);
  const [draft, setDraft] = useState<Partial<ISharedPost>>({});
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState<ProviderId | "all" | null>(null);
  const [tab, setTab] = useState<string>("write");
  

  const [autoPostEnabled, setAutoPostEnabled] = useState(false);

  const selectedCount = posts.filter(
    (p) => p.status === "scheduled" || p.status === "draft"
  ).length;

  const connections = useMemo(() => {
    return (session?.user as any)?.connections as IConnection[] ?? [];
  }, [session]);

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts);
  }
  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    let showed = false;
    for (const p of PROVIDERS) {
      const v = url.searchParams.get(p.id);
      if (v === "connected") {
        toast.success(`${p.label} connected`);
        update();
        showed = true;
      } else if (v === "error") {
        toast.error(`${p.label} connection failed`);
        showed = true;
      }
      url.searchParams.delete(p.id);
    }
    if (showed) window.history.replaceState({}, "", url.toString());
  }, [update]);

  async function saveDraft() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      setPosts((p) => [data.post, ...p]);
      setDraft({});
      setMediaFile(null);
      toast.success("Saved");
    } catch {
      toast.error("Could not save");
    } finally {
      setLoading(false);
    }
  }

  async function updatePost(p: ISharedPost) {
    setPosts((prev) => prev.map((x) => (x._id === p._id ? p : x)));
    await fetch(`/api/posts/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
  }

  async function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p._id !== id));
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
  }

  function onBatchGenerate(
    seed: string,
    count: number,
    tone: string,
    preset: Channel | "generic"
  ) {
    const items = generateBatch(seed, count, tone, preset);
    toast.success(`Generated ${items.length} posts`);
  }

  function connect(provider: ProviderId) {
    window.location.href = `${BACKEND}/auth/${provider}/login?userId=${(session?.user as any)?.id}`;
  }

  async function disconnect(provider: ProviderId) {
    if (!confirm(`Are you sure you want to disconnect ${provider}?`)) return;

    try {
      const res = await fetch(`/api/connections/${provider}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`Disconnected from ${provider}`);
        update();
      } else {
        const error = await res.json();
        toast.error(error.message || `Failed to disconnect from ${provider}`);
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to disconnect from ${provider}`);
    }
  }

  async function postDraftTo(provider: ProviderId) {
    if (mediaFile) {
      try {
        setPosting(provider);
        const res = await postMediaToProvider(
          provider,
          mediaFile,
          (draft.content || "").trim()
        );
        toast.success(`Posted to ${provider.toUpperCase()} (url: ${res.url})`);
      } catch (e: any) {
        toast.error(e.message || `Failed to post to ${provider}`);
      } finally {
        setPosting(null);
      }
    } else {
      const text = (draft.content || "").trim();
      if (!text) return toast.info("Write something first");
      try {
        setPosting(provider);
        const res = await postToProvider(provider, text, (session as any).accessToken);
        toast.success(`Posted to ${provider.toUpperCase()} (id: ${res.id})`);
      } catch (e: any) {
        toast.error(e.message || `Failed to post to ${provider}`);
      } finally {
        setPosting(null);
      }
    }
  }

  async function schedulePost(post: Partial<ISharedPost>, token: string, file?: File | null) {
    const res = await fetch("/api/scheduled-posts", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(post),
    });
  
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || data.error || "Failed to schedule post");
    }
    return data;
  }

  async function postDraftToSelected() {
    if (draft.scheduledAt) {
      try {
        setPosting("all");
        await schedulePost(draft, (session as any).accessToken, mediaFile);
        toast.success("Post scheduled successfully!");
        setDraft({});
        setMediaFile(null);
      } catch (e: any) {
        toast.error(e.message || "Failed to schedule post");
      } finally {
        setPosting(null);
      }
      return;
    }

    const targets = providersFromChannels(draft.channels || []);
    if (targets.length === 0)
      return toast.info("Select at least one supported provider in Channels");

    if (mediaFile) {
      try {
        setPosting("all");
        for (const p of targets) {
          try {
            const res = await postMediaToProvider(
              p,
              mediaFile,
              (draft.content || "").trim(),
              (session?.user as any)?.id,
              (session as any).accessToken
            );
            toast.success(`Posted to ${p.toUpperCase()} (url: ${res.url})`);
          } catch (err: any) {
            toast.error(`${p.toUpperCase()}: ${err.message || "Failed"}`);
          }
        }
      } finally {
        setPosting(null);
      }
    } else {
      const text = (draft.content || "").trim();
      if (!text) return toast.info("Write something first");

      try {
        setPosting("all");
        for (const p of targets) {
          try {
            const res = await postToProvider(p, text, (session as any).accessToken);
            toast.success(`Posted to ${p.toUpperCase()} (id: ${res.id})`);
          } catch (err: any) {
            toast.error(`${p.toUpperCase()}: ${err.message || "Failed"}`);
          }
        }
      } finally {
        setPosting(null);
      }
    }
  }

  const [showAiDropdown, setShowAiDropdown] = useState(false);

  const tabs = useMemo(
    () =>
      [
        { key: "write", label: "Write", icon: PenSquareIcon },
        { key: "batch", label: "Batch", icon: LayoutGridIcon },
        { key: "calendar", label: "Calendar", icon: CalendarIcon },
        { key: "library", label: "Library", icon: SparklesIcon },
        { 
          key: "ai", 
          label: "AI", 
          icon: SparklesIcon, 
          children: [
            { key: "ai-generate", label: "Generate Posts", path: "/dashboard/ai/generate" },
            { key: "ai-rewrite", label: "Rewrite Post", path: "/dashboard/ai/rewrite" },
            { key: "ai-image", label: "Generate Images", path: "/dashboard/ai/image" },
            { key: "ai-video", label: "Generate Videos", path: "/dashboard/ai/video" },
          ]
        },
      ] as Array<{
        key: string; 
        label: string; 
        icon: any; 
        children?: Array<{key: string; label: string; path: string}>
      }>,
    []
  );

  const aiDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target as Node)) {
        setShowAiDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aiDropdownRef]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="homepage-gradient" />
      <Toasts />
      

      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/50 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-blue-500" />
            <span className="font-semibold">JinoShare</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-white/10">
            <SearchIcon className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-white/10">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 rounded-full p-2 hover:bg-white/10">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">
              <FilterIcon className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-md px-4 py-2 text-sm font-medium">
              <PlusIcon className="h-4 w-4" />
              New Post
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-white/10">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((t) => (
                t.children ? (
                  <div key={t.key} className="relative" ref={aiDropdownRef}>
                    <button
                      onClick={() => setShowAiDropdown(!showAiDropdown)}
                      className={`group inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium ${
                        tab === t.key
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
                      }`}
                    >
                      <t.icon
                        className={`h-5 w-5 ${
                          tab === t.key ? "text-blue-500" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      />
                      {t.label}
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {showAiDropdown && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black/80 ring-1 ring-white/10 focus:outline-none z-20">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {t.children.map((child) => (
                            <a
                              key={child.key}
                              href={child.path}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                              role="menuitem"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`group inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium ${
                      tab === t.key
                        ? "border-blue-500 text-blue-500"
                        : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
                    }`}
                  >
                    <t.icon
                      className={`h-5 w-5 ${
                        tab === t.key ? "text-blue-500" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    />
                    {t.label}
                  </button>
                )
              ))}
            </nav>
          </div>
        </div>

        {tab === "write" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4 lg:col-span-2">
              <Editor
                value={draft}
                onChange={(p, file) => {
                  setDraft(p);
                  if (file) setMediaFile(file);
                }}
              />
              <div className="mt-4 flex items-center justify-between">
                <Channels
                  value={draft.channels || []}
                  onChange={(c) => setDraft({ ...draft, channels: c })}
                />
                <div className="flex gap-2">
                  <button
                    className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
                    onClick={saveDraft}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save draft"}
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-md px-4 py-2 text-sm font-medium"
                    onClick={postDraftToSelected}
                    disabled={posting !== null || !(draft.content || "").trim()}
                    title="Posts to providers represented in selected Channels"
                  >
                    {posting === "all"
                      ? "Posting..."
                      : "Post to selected providers"}
                  </button>
                  <span className="text-sm text-gray-400">
                    Or post directly:
                  </span>
                  {PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                      onClick={() => postDraftTo(p.id)}
                      disabled={
                        posting !== null || !(draft.content || "").trim()
                      }
                    >
                      {posting === p.id
                        ? `Posting ${p.label}...`
                        : `Post ${p.label}`}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Note: Instagram likely needs media; text-only may fail until
                  that workflow is added.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h3 className="font-semibold">Connect Accounts</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PROVIDERS.map((p) => {
                    const isConnected = connections?.some((c) => c.provider === p.id);
                    return isConnected ? (
                      <button
                        key={p.id}
                        className="flex-1 rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                        onClick={() => disconnect(p.id)}
                      >
                        Disconnect {p.label}
                      </button>
                    ) : (
                      <button
                        key={p.id}
                        className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                        onClick={() => connect(p.id)}
                      >
                        Connect {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h3 className="font-semibold">Tips</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-400">
                  <li>Lead strong in the first 2 lines.</li>
                  <li>One idea per post. Keep it punchy.</li>
                  <li>Add a call-to-action tailored to the channel.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === "batch" && (
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <BatchForm onGenerate={onBatchGenerate} />
            <p className="mt-4 text-sm text-gray-500">
              Generated posts appear in the library.
            </p>
          </div>
        )}

        {tab === "calendar" && <Calendar />}

        {tab === "library" && (
          <ContentList
            posts={posts}
            onUpdate={updatePost}
            onDelete={deletePost}
          />
        )}

        

        <div className="mt-6 text-sm text-gray-500">
          {selectedCount} items in pipeline
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);

function BatchForm({
  onGenerate,
}: {
  onGenerate: (
    seed: string,
    count: number,
    tone: string,
    preset: any
  ) => void;
}) {
  const [seed, setSeed] = useState("");
  const [count, setCount] = useState(8);
  const [tone, setTone] = useState("concise");
  const [preset, setPreset] = useState<
    "generic" | "x" | "tiktok" | "instagram" | "youtube" | "linkedin"
  >("generic");
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          className="input rounded-md border border-white/20 bg-black/60 p-2 lg:col-span-2 focus:ring-2 focus:ring-purple-500/50"
          placeholder="Seed idea (e.g., 'hooks for productivity')"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
        <select
          className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="concise">Concise</option>
          <option value="casual">Casual</option>
          <option value="contrarian">Contrarian</option>
          <option value="educational">Educational</option>
        </select>
        <select
          className="rounded-md border border-white/20 bg-black/60 text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          value={preset}
          onChange={(e) => setPreset(e.target.value as any)}
        >
          <option value="generic">Generic</option>
          <option value="x">X/Twitter</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube Shorts</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <input
          className="input w-28 rounded-md border-white/10 bg-white/5 p-2"
          type="number"
          min={1}
          max={30}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value || "1"))}
        />
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => onGenerate(seed, count, tone, preset)}
          disabled={!seed}
        >
          Generate batch
        </button>
      </div>
    </div>
  );
}
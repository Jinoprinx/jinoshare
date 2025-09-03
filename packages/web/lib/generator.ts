import { ISharedPost, Channel } from "@jino/common";

const PRESETS: Record<string, (t: string) => string[]> = {
  concise: (seed) => [
    `Hot take: ${seed}.`,
    `${seed} in 3 bullets:\n• Point 1\n• Point 2\n• Point 3`,
    `Stop ignoring this: ${seed}.`,
  ],
  casual: (seed) => [
    `So... I tried ${seed} and here's what happened.`,
    `${seed} but make it simple. Here’s how:`,
    `If you're stuck on ${seed}, try this:`,
  ],
  contrarian: (seed) => [
    `Everyone says ${seed}. I disagree—here's why.`,
    `${seed} is overrated. Do this instead.`,
    `The unpopular truth about ${seed}:`
  ],
  educational: (seed) => [
    `What is ${seed}? A quick guide:`,
    `New to ${seed}? Start here.`,
    `${seed} explained in 30 seconds:`
  ]
};

function applyChannelStyle(preset: Channel | "generic", text: string) {
  switch (preset) {
    case "x": return text.length > 260 ? text.slice(0, 258) + "…" : text;
    case "tiktok": return `${text}\n\n#fyp #learnontiktok`;
    case "instagram": return `${text}\n\n—\nSave for later ❤️`;
    case "youtube": return `[Shorts Hook] ${text}`;
    case "linkedin": return `${text}\n\n(What’s your take?)
`;
    default: return text;
  }
}

export function generateBatch(seed: string, count = 8, tone = "concise", preset: Channel | "generic" = "generic"): ISharedPost[] {
  const now = new Date().toISOString();
  const base = PRESETS[tone] ? PRESETS[tone](seed) : PRESETS.concise(seed);
  const out: ISharedPost[] = [];
  for (let i = 0; i < count; i++) {
    const variant = base[i % base.length];
    const spin = i === 0 ? variant : `${variant}\n\n#${seed.replace(/\s+/g, "")}${i}`;
    const content = applyChannelStyle(preset, spin);
    out.push({
      _id: crypto.randomUUID(),
      userId: "dev-user", // Assuming a default user
      content,
      channels: preset === "generic" ? [] : [preset],
      status: "draft",
      scheduled_at: null,
      createdAt: now,
      updatedAt: now
    });
  }
  return out;
}
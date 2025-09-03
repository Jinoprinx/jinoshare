// packages/ai/src/prompts.ts

/**
 * Highly‑tuned prompt builders for JinoShare AI features.
 * Keep all prompts here so they can be optimized and iterated in one place.
 *
 * Principles used:
 * - Clear task definition
 * - Role assignment to the model
 * - Platform‑specific constraints & tone guidance
 * - Explicit output format instructions (JSON where needed)
 * - Minimal ambiguity to improve determinism
 */

// 1. Post Generation
export function buildGeneratePostsPrompt(
  topic: string,
  platform: string,
  tone: string,
  count: number
) {
  return `You are a skilled social media copywriter.
Generate ${count} distinct, high‑quality posts for the ${platform} platform about the topic "${topic}".
Tone: ${tone}.
Platform style guide:
${
    {
      x: "Max 280 characters. One clear hook. Avoid hashtags except when essential. Optional: 1 emoji.",
      linkedin:
        "Professional yet engaging. Value‑forward, 3‑6 short sentences. Avoid slang. No more than 2 hashtags.",
      instagram:
        "Casual and warm. 1‑2 relevant emojis. Include up to 5 high‑impact hashtags at the end.",
      generic: "Clear, concise, actionable. Avoid filler and overused phrases."
    }[platform] || "Clear, concise, actionable."
  }

Output a valid JSON array of strings. Do not include any explanations, markdown, or extra text.`;
}

// 2. Rewrite/Remix
export function buildRewritePrompt(
  text: string,
  targetPlatform: string,
  tone: string,
  objective: string
) {
  return `You are an expert at adapting social media content.
Rewrite the following post so that it is optimized for ${targetPlatform}.
Maintain the original intent but improve it for ${objective}.
Tone: ${tone}.
Respect ${targetPlatform} constraints (length, format, style).
Return only the rewritten text, with no commentary.

Original post:
${text}`;
}

// 3. Hashtag + Caption Suggestions
export function buildTagsPrompt(text: string, platform: string) {
  return `You are a social media strategist.
From the text below, extract or create:
1. A single engaging caption optimized for ${platform}.
2. Up to 7 relevant, high‑impact hashtags for ${platform}.

Return valid JSON in the form:
{
  "caption": "string",
  "hashtags": ["#tag1", "#tag2", ...]
}

Text:
${text}`;
}

// 4. Best Time to Post
export function buildBestTimePrompt(
  examples: Array<{ dow: number; hour: number; impressions: number; likes: number }>,
  platform: string
) {
  return `You are a data analyst.
Given this historical performance dataset for ${platform}:
${JSON.stringify(examples)}

Each object has:
- dow: day of week (0=Sunday...6=Saturday)
- hour: hour of day (0‑23)
- impressions: number
- likes: number

Analyze and recommend the top 3 posting slots (day+hour) that are likely to yield the highest engagement.
Return valid JSON array of objects:
[
  { "dow": number, "hour": number, "reason": "short justification" }
]`;
}

// 5. Engagement Forecasting
export function buildForecastPrompt(
  text: string,
  platform: string,
  scheduledFor?: string
) {
  return `You are an experienced social media growth analyst.
Estimate the engagement potential for the following ${platform} post ${
    scheduledFor ? `scheduled at ${scheduledFor}` : ""
  }.

Consider clarity, hook strength, CTA, hashtags, timing, and platform norms.

Return valid JSON:
{
  "risk": "low" | "medium" | "high",
  "estImpressions": number,
  "notes": "brief rationale"
}

Post text:
${text}`};
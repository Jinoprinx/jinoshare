// // packages/ai/src/prompts.ts

//////////////////////////////////////////////////

// packages/ai/src/prompts.ts

/**
 * Highly‑tuned prompt builders for JinoShare AI features.
 * All prompts are centralized here for optimization and iteration.
 *
 * Core Principles:
 * - Clear, explicit task definition
 * - Role assignment to the model
 * - Platform‑specific constraints & tone guidance
 * - Explicit, strict output format instructions (JSON where applicable)
 * - Minimal ambiguity for deterministic results
 * - No extra commentary or markdown in outputs
 */

// Platform style guides
const PLATFORM_GUIDES: Record<string, string> = {
  x: "Max 280 characters. One clear hook. Avoid hashtags unless essential. Optional: 1 emoji.",
  linkedin: "Professional yet engaging. Value-forward, 3-6 short sentences. Avoid slang. Max 2 hashtags.",
  instagram: "Casual and warm. 1-2 relevant emojis. Up to 5 high-impact hashtags at the end.",
  facebook: "Friendly and conversational. 1-3 short paragraphs. Emojis optional. 1-3 relevant hashtags.",
  tiktok: "Trendy, playful, concise. Use 1-2 emojis. Include 3-5 trending hashtags.",
  youtube: "Informative and engaging. Hook in first sentence. 1-3 relevant hashtags.",
  pinterest: "Inspirational and descriptive. 2-4 sentences. Include 3-5 relevant hashtags.",
  threads: "Conversational and authentic. Max 500 characters. Emojis optional. 1-3 hashtags.",
  generic: "Clear, concise, actionable. Avoid filler and overused phrases."
};

// 1. Post Generation
export function buildGeneratePostsPrompt(
  topic: string,
  platform: string,
  tone: string,
  count: number
) {
  return `You are a skilled social media copywriter.
Generate ${count} distinct, high-quality posts for the ${platform} platform about the topic "${topic}".
Tone: ${tone}.
Platform style guide:
${PLATFORM_GUIDES[platform] || PLATFORM_GUIDES.generic}

Rules:
- Each post must be unique and non-repetitive.
- Avoid generic hooks like "Check this out".
- Follow platform-specific length, tone, and style rules exactly.
- Do not include links unless explicitly requested.
- Avoid banned or irrelevant hashtags.

Output:
Return a valid JSON array of strings.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
}

// 2. Rewrite/Remix
export function buildRewritePrompt(
  text: string,
  platform: string,
  tone: string,
  objective: string
) {
  return `You are an expert at adapting social media content.
Rewrite the following post so that it is optimized for ${platform}.
Maintain the original intent but improve it for ${objective}.
Tone: ${tone}.
Platform style guide:
${PLATFORM_GUIDES[platform] || PLATFORM_GUIDES.generic}

Rules:
- Preserve mentions, hashtags, and links unless they conflict with platform norms.
- Follow platform-specific length, tone, and style rules exactly.
- Avoid adding unrelated content.

Return only the rewritten text, with no commentary.

Original post:
${text}`;
}

// 3. Hashtag + Caption Suggestions
export function buildTagsPrompt(text: string, platform: string) {
  return `You are a social media strategist.
From the text below, extract or create:
1. A single engaging caption optimized for ${platform}.
2. Up to 7 relevant, high-impact hashtags for ${platform}, ranked by relevance.
3. Avoid banned, spammy, or irrelevant hashtags.

Return valid JSON in the form:
{
  "caption": "string",
  "hashtags": ["#tag1", "#tag2", ...]
}

Ensure JSON is syntactically correct with no trailing commas.

Text:
${text}`;
}

// 4. Best Time to Post
export function buildBestTimePrompt(
  examples: Array<{ dow: number; hour: number; impressions: number; likes: number }>,
  platform: string,
  timeZone: string,
  optimizeFor: "impressions" | "likes" | "engagementRate"
) {
  return `You are a data analyst.
Given this historical performance dataset for ${platform} (time zone: ${timeZone}):
${JSON.stringify(examples)}

Each object has:
- dow: day of week (0=Sunday...6=Saturday)
- hour: hour of day (0‑23)
- impressions: number
- likes: number

Analyze and recommend the top 3 posting slots (day+hour) that are likely to yield the highest ${optimizeFor}.
Return valid JSON array of objects:
[
  { "dow": number, "hour": number, "reason": "short justification" }
]

Ensure JSON is syntactically correct with no trailing commas.`;
}

// 5. Engagement Forecasting
export function buildForecastPrompt(
  text: string,
  platform: string,
  scheduledFor?: string
) {
  return `You are an experienced social media growth analyst.
Estimate the engagement potential for the following ${platform} post${scheduledFor ? ` scheduled at ${scheduledFor}` : ""}.

Consider clarity, hook strength, CTA, hashtags, timing, and platform norms.

Return valid JSON:
{
  "risk": "low" | "medium" | "high",
  "estimatedImpressions": number,
  "confidence": "low" | "medium" | "high",
  "notes": "brief rationale"
}

Ensure JSON is syntactically correct with no trailing commas.

Post text:
${text}`;
}

// 6. Content Moderation
export function buildModerationPrompt(
  text: string,
  platform: string
) {
  return `You are a content safety and compliance analyst.
Review the following text for ${platform} and classify it for policy compliance.

Categories:
- hateSpeech
- harassment
- adultContent
- violence
- selfHarm
- misinformation
- spam
- safe

Return valid JSON:
{
  "category": "safe" | "hateSpeech" | "harassment" | "adultContent" | "violence" | "selfHarm" | "misinformation" | "spam",
  "severity": "low" | "medium" | "high",
  "notes": "brief explanation"
}

Ensure JSON is syntactically correct with no trailing commas.

Text:
${text}`;
}

// 7. Image Generation Prompt
export function buildImagePrompt(
  description: string,
  platform: string,
  style: string,
  aspectRatio: string,
  resolution: string
) {
  return `You are a creative visual designer.
Generate an image for ${platform}.

Description: ${description}
Style: ${style}
Aspect Ratio: ${aspectRatio}
Resolution: ${resolution}

Rules:
- Ensure the image concept aligns with ${platform} audience expectations.
- Avoid text-heavy designs unless specified.
- No watermarks, logos, or copyrighted material.

Return a single, concise prompt string for an image generation model.`;
}

// 8. Video Generation Prompt
export function buildVideoPrompt(
  description: string,
  platform: string,
  durationSeconds: number,
  format: "vertical" | "horizontal" | "square",
  style: string
) {
  return `You are a creative video director.
Generate a concept for a ${durationSeconds}-second ${format} video for ${platform}.

Description: ${description}
Style: ${style}

Rules:
- Ensure pacing, tone, and visuals match ${platform} norms.
- Include a clear hook in the first 3 seconds.
- Avoid copyrighted material.
- Suggest background music style if relevant.

Return a single, concise prompt string for a video generation model.`;
}

export function buildContentPlannerPrompt(formData: any) {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals } = formData;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 15-day social media content plan based on the user's brand information.

The goal is to build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Content Plan Requirements:**
- Generate 15 high-quality, highly customized social media posts.
- The posts should be natural-sounding and not salesy.
- The posts should be aimed at growing the user's business or brand based on the provided answers.
- The posts should be diverse and cover different content formats (e.g., educational, behind-the-scenes, user-generated content, etc.).
- Each post should be unique and non-repetitive.
- Avoid generic hooks like "Check this out".
- Follow platform-specific length, tone, and style rules exactly.
- Do not include links unless explicitly requested.
- Avoid banned or irrelevant hashtags.

**Output:**
Return a valid JSON array of strings.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
}

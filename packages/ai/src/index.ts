// packages/ai/src/index.ts

import fetch from "node-fetch";

/**
 * Core AI text generation client.
 * Calls an external LLM provider using URL/key from env,
 * or returns a development fallback if not configured.
 */
export async function aiGenerate(
  prompt: string,
  opts?: { maxTokens?: number }
): Promise<string> {
  const url = process.env.AI_API_URL;
  const key = process.env.AI_API_KEY;

  if (!url || !key) {
    // Development fallback so routes remain usable without a live AI key
    return `["AI_API_URL/KEY not set. Fallback for prompt: ${prompt.slice(
      0,
      80
    )}..."]`;
  }

  const res = await fetch(`${url}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: opts?.maxTokens || 800,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    throw new Error(`AI request failed: ${res.status} ${await res.text()}`);
  }

  // OpenAI response format
  const data = (await res.json()) as { 
    choices?: Array<{ message?: { content?: string } }> 
  };
  if (!data.choices?.[0]?.message?.content) {
    throw new Error("No content in AI provider response");
  }

  return data.choices[0].message.content;
}

/**
 * Utility to strip ```json fences and whitespace
 * from AI responses that wrap JSON in Markdown code blocks.
 */
export function stripJsonFences(s: string): string {
  return s.replace(/```json\s*|\s*```/gi, "").trim();
}

// Re-export all prompts functions
export * from "./prompts";
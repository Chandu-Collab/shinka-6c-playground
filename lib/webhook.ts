import type { Agent } from "@/data/agents";
import { getAgentById } from "@/data/agents";

const WEBHOOK_URLS: Record<string, string | undefined> = {
  "youtube-repurposer": process.env.N8N_YOUTUBE_WEBHOOK_URL,
  "lead-auto-reply": process.env.N8N_LEAD_REPLY_WEBHOOK_URL,
  "resume-job-matcher": process.env.N8N_JOB_MATCHER_WEBHOOK_URL,
};

function getWebhookUrl(agentId: string): string {
  return WEBHOOK_URLS[agentId] ?? "";
}

export interface WebhookResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

function generateMockResponse(
  agentId: string,
  payload: Record<string, unknown>
): Record<string, unknown> {
  if (agentId === "youtube-repurposer") {
    const url = String(payload.youtubeUrl ?? "video");
    return {
      linkedinPost: `🎬 Just watched an incredible video: ${url}\n\nKey takeaways:\n• Insight #1 that resonated deeply\n• Practical tip you can apply today\n• A mindset shift worth considering\n\nWhat's the best content you've repurposed lately? Drop a comment 👇\n\n#ContentMarketing #YouTube #AI`,
      twitterThread: `🧵 Thread: Repurposing ${url}\n\n1/ Great content deserves a second life. Here's how I'd break this down:\n\n2/ Hook: Start with the most surprising insight from the video.\n\n3/ Value: Share 3-5 actionable takeaways.\n\n4/ CTA: Ask your audience a question to drive engagement.\n\n5/ Repurpose across LinkedIn, blog, and newsletter. One video → multiple assets.`,
      blogDraft: `# Repurposing YouTube Content: A Practical Guide\n\nSource: ${url}\n\n## Introduction\nGreat video content often contains enough value to fuel an entire week of social posts, a newsletter edition, and a blog article.\n\n## Key Insights\n1. **Lead with the hook** — Capture attention in the first sentence.\n2. **Extract actionable tips** — Readers want practical value.\n3. **Adapt the tone** — LinkedIn is professional, Twitter is punchy, blogs are thorough.\n\n## Conclusion\nOne well-chosen video can become a content engine. Start repurposing today.`,
    };
  }

  if (agentId === "lead-auto-reply") {
    const name = String(payload.name ?? "there");
    const message = String(payload.message ?? "your inquiry");
    return {
      reply: `Hi ${name},\n\nThank you for reaching out! I really appreciate you taking the time to share your thoughts.\n\nRegarding "${message.slice(0, 80)}${message.length > 80 ? "..." : ""}" — I'd love to help. Based on what you've shared, I think a quick 15-minute call would be the best next step so we can understand your needs and explore how we can support you.\n\nWould any of these times work for you?\n• Tuesday 2:00 PM\n• Wednesday 10:00 AM\n• Thursday 4:00 PM\n\nLooking forward to connecting!\n\nBest regards`,
    };
  }

  if (agentId === "resume-job-matcher") {
    return {
      message: "Job matches are being processed and will be sent to your email shortly. (Mock response)"
    };
  }

  return { result: "Mock response generated successfully." };
}

export async function callWebhook(
  agent: Agent,
  payload: Record<string, unknown>
): Promise<WebhookResult> {
  const webhookUrl = getWebhookUrl(agent.id);
  if (!webhookUrl) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      success: true,
      data: generateMockResponse(agent.id, payload),
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentId: agent.id,
        ...payload,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Webhook returned ${response.status}: ${response.statusText}`,
      };
    }

    const contentType = response.headers.get("content-type");
    let data: Record<string, unknown>;

    if (contentType?.includes("application/json")) {
      const json = await response.json();
      data =
        typeof json === "object" && json !== null && "data" in json
          ? (json.data as Record<string, unknown>)
          : (json as Record<string, unknown>);
    } else {
      const text = await response.text();
      data = { result: text };
    }

    return { success: true, data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reach webhook";
    return { success: false, error: message };
  }
}

export function validateAgentPayload(
  agent: Agent,
  payload: Record<string, unknown>
): string | null {
  for (const field of agent.fields) {
    if (!field.required) continue;
    const value = payload[field.name];
    if (value === undefined || value === null || value === "") {
      return `${field.label} is required`;
    }
  }
  return null;
}

export function resolveAgent(id: string): Agent | undefined {
  return getAgentById(id);
}

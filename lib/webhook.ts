import type { Agent } from "@/data/agents";
import { getAgentById } from "@/data/agents";

const WEBHOOK_URLS: Record<string, string | undefined> = {
  "youtube-repurposer": process.env.N8N_YOUTUBE_WEBHOOK_URL,
  "lead-auto-reply": process.env.N8N_LEAD_REPLY_WEBHOOK_URL,
  "resume-job-matcher": process.env.N8N_JOB_MATCHER_WEBHOOK_URL,
  "multilingual-support": process.env.N8N_SUPPORT_WEBHOOK_URL,
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
    return {
      message: "Your content is being generated and will be sent to your email shortly. (Mock response)",
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

  if (agentId === "multilingual-support") {
    return {
      message: "Your support query has been translated, classified, and an auto-reply or escalation notice has been sent to your email. (Mock response)",
    };
  }

  return { result: "Mock response generated successfully." };
}

export async function callWebhook(
  agent: Agent,
  payload: Record<string, unknown>
): Promise<WebhookResult> {
  const webhookUrl = getWebhookUrl(agent.id);
  if (!webhookUrl || webhookUrl.includes("YOUR_N8N_URL")) {
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

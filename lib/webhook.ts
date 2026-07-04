import type { Agent } from "@/data/agents";
import { getAgentById } from "@/data/agents";

function getWebhookUrl(agentId: string): string {
  switch (agentId) {
    case "youtube-repurposer": return process.env.N8N_YOUTUBE_WEBHOOK_URL ?? "";
    case "lead-auto-reply": return process.env.N8N_LEAD_REPLY_WEBHOOK_URL ?? "";
    case "resume-job-matcher": return process.env.N8N_JOB_MATCHER_WEBHOOK_URL ?? "";
    case "multilingual-support": return process.env.N8N_SUPPORT_WEBHOOK_URL ?? "";
    case "business-insights": return process.env.N8N_INSIGHTS_WEBHOOK_URL ?? "";
    case "instagram-dm-lead": return process.env.N8N_INSTAGRAM_WEBHOOK_URL ?? "";
    case "order-priority": return process.env.N8N_ORDER_WEBHOOK_URL ?? "";
    case "meeting-notes-generator": return process.env.N8N_MEETING_NOTES_WEBHOOK_URL ?? "";
    case "cold-email-personalizer": return process.env.N8N_COLD_EMAIL_WEBHOOK_URL ?? "";
    case "website-chat": return process.env.N8N_WEBSITE_CHAT_WEBHOOK_URL ?? "";
    case "freelancer-invoice": return process.env.N8N_FREELANCE_INVOICE_WEBHOOK_URL ?? "";
    default: return "";
  }
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

  if (agentId === "business-insights") {
    return {
      reportStatus: "Daily business report generated successfully. Alerts and insights have been emailed. (Mock response)",
    };
  }

  if (agentId === "instagram-dm-lead") {
    return {
      intent: "enquiry",
      lead_score: "warm",
      summary: "Mock summary of the Instagram message. The actual webhook would classify this automatically.",
    };
  }

  if (agentId === "order-priority") {
    return {
      priority: "High",
      reason: "Mock classification: Order was processed successfully.",
    };
  }

  if (agentId === "meeting-notes-generator") {
    return {
      message: "Meeting notes and action items are being generated. The summary will be sent to your email shortly.",
    };
  }

  if (agentId === "cold-email-personalizer") {
    return {
      message: "The lead data is being analyzed. A personalized cold email is being generated and will be sent shortly.",
    };
  }

  if (agentId === "website-chat") {
    return {
      output: "Hello! I am a simulated response since the webhook is not connected. How can I assist you further?",
    };
  }

  if (agentId === "freelancer-invoice") {
    return {
      message: "The invoice is being generated, saved to Google Drive, tracked in Sheets, and emailed to your client.",
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
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
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

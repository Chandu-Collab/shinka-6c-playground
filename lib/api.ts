export interface WebhookResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export interface AgentApiResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export async function callAgentApi(
  agentId: string,
  payload: Record<string, unknown>
): Promise<AgentApiResult> {
  const response = await fetch(`/api/agent/${agentId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result: WebhookResponse = await response.json();

  if (!response.ok || !result.success) {
    return {
      success: false,
      error: result.error ?? "Something went wrong. Please try again.",
    };
  }

  return { success: true, data: result.data };
}

type AnalyticsEvent =
  | "page_view"
  | "agent_open"
  | "agent_submit"
  | "agent_success"
  | "agent_error"
  | "copy_output";

interface AnalyticsPayload {
  event: AnalyticsEvent;
  agentId?: string;
  metadata?: Record<string, unknown>;
}

export function trackEvent(payload: AnalyticsPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", payload);
  }
}

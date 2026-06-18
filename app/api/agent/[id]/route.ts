import { resolveAgent, callWebhook, validateAgentPayload } from "@/lib/webhook";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const agent = resolveAgent(id);

  if (!agent) {
    return NextResponse.json(
      { success: false, error: "Agent not found" },
      { status: 404 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const validationError = validateAgentPayload(agent, payload);
  if (validationError) {
    return NextResponse.json(
      { success: false, error: validationError },
      { status: 400 }
    );
  }

  const result = await callWebhook(agent, payload);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}

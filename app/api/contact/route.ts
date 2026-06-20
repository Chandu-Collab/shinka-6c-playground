import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, requestType, message } = body;

    if (!name || !email || !requestType || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_CONTACT_US_WEBHOOK_URL;
    
    if (!webhookUrl || webhookUrl.includes("YOUR_N8N_URL")) {
      // Mock response if webhook is not configured
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        message: "Your request has been received. (Mock response)",
      });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, requestType, message }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("Webhook error:", response.status, response.statusText);
      return NextResponse.json(
        { success: false, error: "Failed to submit request." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been successfully submitted.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

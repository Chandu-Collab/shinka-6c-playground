# Lead Auto Reply Generator

**ID**: `lead-auto-reply`
**Description**: Generate personalized, professional replies to inbound leads instantly.

## Frontend UI
Users provide the Lead's Name, Email, and their incoming Message. The UI displays an interactive typing effect simulating the AI drafting a response.

## Input Payload
The Next.js app sends a POST request to `N8N_LEAD_REPLY_WEBHOOK_URL` with:
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "message": "I'm interested in your enterprise tier pricing."
}
```

## Workflow Execution (n8n)
1. **Webhook Trigger**: Receives the payload.
2. **AI Language Model**: Instructed to act as a Sales Executive. It reads the incoming `message` and drafts a personalized, professional reply.
3. **Webhook Response**: Returns the drafted reply directly back to the frontend to be displayed to the user.

## Output
```json
{
  "reply": "Hi Jane,\n\nThanks for reaching out! Our enterprise tier offers custom SLA and dedicated support..."
}
```

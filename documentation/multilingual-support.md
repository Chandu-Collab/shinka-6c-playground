# Multilingual AI Support Desk

**ID**: `multilingual-support`
**Description**: Send queries in any language. Our AI detects, translates, classifies urgency, and auto-replies or escalates.

## Frontend UI
Users provide their Email, Subject, and Message in any language. The UI has a dark, immersive design with language translation icons.

## Input Payload
The Next.js app sends a POST request to `N8N_SUPPORT_WEBHOOK_URL` with:
```json
{
  "email": "customer@example.com",
  "subject": "Issue with my recent order...",
  "message": "मुझे मेरा पैसा वापस चाहिए / I want a refund"
}
```

## Workflow Execution (n8n)
1. **Webhook Trigger**: Receives the payload.
2. **Normalize Email Data**: Standardizes the incoming `$json.body` payload.
3. **AI Language Model**: 
   - Translates the input to English (if needed).
   - Classifies the urgency of the issue.
   - Drafts an appropriate response in the user's original language.
4. **Email/Escalation Node**: If urgent, sends to a human agent. Otherwise, emails the drafted response to the user.
5. **Webhook Response**: Acknowledges receipt of the ticket.

## Output
```json
{
  "message": "Your support query has been translated, classified, and an auto-reply or escalation notice has been sent to your email."
}
```

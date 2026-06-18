# AI Business Insights & Alert System

**ID**: `business-insights`
**Description**: Automated growth analyst. Generates daily reports, detects revenue drops, and alerts you to pipeline issues.

## Frontend UI
Since this workflow is designed to run automatically in the background via a Cron job, the Next.js frontend acts as a **Monitoring Dashboard**. The user can see the status of the automated agent (Active/Paused) and its configuration (Google Sheets source, Trigger schedule). There is a "Test Run" button that triggers the workflow on demand for demonstration.

## Input Payload
The Next.js app sends an empty POST request to `N8N_INSIGHTS_WEBHOOK_URL` to trigger a manual run:
```json
{}
```

## Workflow Execution (n8n)
1. **Schedule Trigger / Webhook**: The workflow runs either daily at 9:00 AM or manually via Webhook.
2. **Google Sheets Integration**: Fetches the "Monthly Revenue Report".
3. **Format & Prepare Data**: Uses JavaScript to sort and format the sheet data into text.
4. **AI Generation**: An OpenAI model reads the formatted data to generate key insights, highlighting changes and growth actions.
5. **Decision Logic**:
   - If Revenue drops by >30%, it triggers a critical email alert.
   - If Leads drop <30, it triggers a pipeline warning email.
   - Otherwise, it sends a standard daily report email.

## Output
There is no specific JSON output expected by the UI. The result of the execution is the dispatched Gmail report.

# Shinka-6c Agent Documentation

Welcome to the documentation for the Shinka-6c AI Automation suite. This folder contains technical details, input schemas, and expected workflows for all the agents deployed on the platform.

## Available Agents

1. **[YouTube Repurposer](youtube-repurposer.md)**: Converts YouTube videos into multi-platform text content.
2. **[Lead Auto Reply Generator](lead-auto-reply.md)**: Drafts contextual replies to incoming business leads.
3. **[AI Resume-Based Job Matcher](resume-job-matcher.md)**: Matches uploaded resumes to relevant remote jobs.
4. **[Multilingual AI Support Desk](multilingual-support.md)**: Translates, classifies, and responds to support queries in any language.
5. **[AI Business Insights & Alert System](business-insights.md)**: Scheduled background worker for detecting revenue drops and leads issues.

## Webhook Integrations
All agents (except the scheduled Business Insights agent) are triggered via n8n Webhooks. The Next.js frontend sends a `POST` request with a JSON payload matching the fields defined in each agent's documentation. The webhook responds with a JSON object containing the result.

Ensure your `.env.local` is properly configured with your live n8n webhook URLs.

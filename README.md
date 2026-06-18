# Shinka AI Playground

A modular AI Agents Hub built with Next.js. Add new agents via config — no UI rewrites needed.

## Features

- Landing page with agent cards
- Dynamic agent pages at `/agent/[id]`
- Config-driven forms (text, email, textarea, file)
- n8n webhook integration with mock fallback
- Dark/light mode
- Copy-to-clipboard for outputs
- Toast notifications
- Analytics hooks (console in dev)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a New Agent

1. Add an entry to `data/agents.ts`:

```ts
{
  id: "my-agent",
  name: "My Agent",
  description: "What it does",
  route: "/agent/my-agent",
  icon: "⚡",
  fields: [
    { name: "input", label: "Input", type: "text", required: true },
  ],
}
```

2. Register webhook URL in `lib/webhook.ts` → `WEBHOOK_URLS`
3. (Optional) Add mock response in `lib/webhook.ts` → `generateMockResponse`
4. (Optional) Set env var in `.env.local`

That's it — the landing page, routing, form, and API layer pick it up automatically.

## Webhook Integration

Set environment variables in `.env.local` (see `.env.example`). When a webhook URL is empty, the API returns realistic mock data for development.

## Deploy on Vercel

```bash
npm run build
```

Push to GitHub and import in Vercel. Add env vars in the Vercel dashboard.

## Project Structure

```
/app
  page.tsx              # Landing page
  agent/[id]/page.tsx   # Dynamic agent pages
  api/agent/[id]/route.ts
/components
  AgentCard.tsx
  AgentRunner.tsx
  DynamicForm.tsx
  OutputBox.tsx
  Toast.tsx
/data
  agents.ts             # Agent registry (single source of truth)
/lib
  api.ts                # Client API helper
  webhook.ts            # Server webhook + mock logic
```

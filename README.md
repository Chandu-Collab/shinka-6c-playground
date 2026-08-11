# Shinka-6c Playground

> An evolving AI automation playground for building, experimenting with,
> and deploying practical AI agents.

🌐 **Live Playground:** https://shinka-6c.netlify.app/

Shinka-6c is an open-source collection of AI agents and automation
experiments designed around practical, real-world workflows.

New agents, improvements, experiments, and multi-phase agent series
are continuously added as the project evolves.

[![Live Playground](https://img.shields.io/badge/Live_Playground-success?style=flat&logo=netlify)](https://shinka-6c.netlify.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![n8n](https://img.shields.io/badge/n8n-EA4B71?style=flat&logo=n8n&logoColor=white)](https://n8n.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)]()
[![AI Agents](https://img.shields.io/badge/AI_Agents-purple?style=flat)]()
[![Automation](https://img.shields.io/badge/Automation_Workflows-orange?style=flat)]()

## 🌱 What is Shinka-6c?

Shinka-6c is an evolving AI automation playground focused on building
practical AI agents for real-world workflows.

The project explores how AI can be combined with automation,
integrations, and structured workflows to solve repetitive tasks,
assist decision-making, and create useful developer and business tools.

Rather than treating each agent as a finished product, Shinka evolves
continuously through new experiments, feature improvements,
multi-phase agent series, and community feedback.

The live playground represents the current public version of the project.

## 🤖 Agent Ecosystem
Shinka currently explores two styles of AI agents.

### ⚡ Standalone Agents

Focused agents designed to solve a specific problem with a relatively
quick setup and immediate practical value.

Examples include:
- AI Research
- YouTube Content Repurposing
- Resume & Job Matching
- Lead Automation
- Meeting Intelligence
- Invoice Automation
- Bug Ticket Generation
- Competitor Monitoring

### 🚀 Series Agents

Larger automation systems developed progressively through multiple
phases.

Instead of attempting to build the complete system at once, each
series evolves through meaningful development stages, with every phase
adding new capabilities, intelligence, reliability, or integrations.

Current series include:
- AI Receptionist
- Lead Management
- Business Insights

## 🔄 Active Development
Shinka-6c is an actively evolving project.

Development happens continuously rather than around a single final
release.

Each development cycle may introduce:
- 🤖 New AI agents
- 🚀 New agent series
- 🧠 Improved AI capabilities
- 🔄 New automation workflows
- 🛠️ Reliability and usability improvements
- 🎨 Playground improvements
- 📚 New documentation
- 🧪 New experiments

The live playground is updated as new capabilities become available.

> **The project is built to evolve.**
> 
> Every release is another step in exploring what practical AI
> automation can become.

## 📅 Weekly Evolution
Shinka-6c follows a continuous development model.

Each week, the project can evolve through:
1. New agent releases
2. New phases for existing agent series
3. Workflow improvements
4. AI capability upgrades
5. Playground improvements
6. Documentation updates
7. New experiments

The goal isn't simply to increase the number of agents.

The goal is to make each iteration more useful than the previous one.

## 🌐 Current Playground
The latest public version of Shinka-6c is available at:

👉 https://shinka-6c.netlify.app/

The playground contains the currently available standalone agents
and evolving agent series.

The GitHub repository contains the source code, workflows,
documentation, and configuration used to develop the platform.

The live site currently exposes 14 standalone/series entries, including Research, YouTube Repurposer, Lead Auto Reply, Resume Matcher, Multilingual Support, Business Insights, Instagram Lead Capture, Order Priority, Meeting Notes, Cold Email Personalization, Website Chatbot, Invoice Automation, Bug Ticketing, Competitor Intelligence, plus the Receptionist and Lead Management series.

## 🌱 Shinka Philosophy

### Built to Learn.
Every agent is an opportunity to explore new AI capabilities,
automation patterns, and engineering approaches.

### Built to Inspire.
The project is open for developers and builders to study,
experiment with, and extend. Shinka automation workflows are shared with the community to encourage learning, experimentation, and the creation of new ideas.

### Built to Create.
The ultimate goal is not experimentation alone — it is turning
experiments into useful tools and practical automation.

> **Built to learn. Built to inspire. Built to create.**

If you build something new from these workflows, we'd love to see what you create. 🚀

---

<div align="center">
  <h2>───────────────────</h2>
  <h2>TECHNICAL DOCS</h2>
  <h2>───────────────────</h2>
</div>

## 🏗 Architecture

Shinka-6c is built using a modern, decoupled architecture separating the user interface from the AI logic.

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, TypeScript.
- **Agent Registry:** A configuration-driven approach where agents are defined in code, eliminating the need to build new UI for each agent.
- **Execution Engine:** n8n acts as the AI automation backend. The frontend sends standardized webhooks to n8n workflows which handle the AI processing (OpenAI, integrations, etc.) and return the results.
- **Graceful Fallbacks:** The platform includes an intelligent mock system. If a webhook URL is not configured in `.env.local`, the platform falls back to realistic mock data so UI development can continue uninterrupted.

## ⚙️ Local Development

**1. Clone and Install**
```bash
npm install
```

**2. Environment Variables**
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```
Add your active n8n webhook URLs to the respective agent variables. If left blank, the platform will safely use mock responses.

**3. Start the Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the playground.

## 🤖 Adding a New Agent

Adding a new agent to Shinka-6c requires **zero UI rewrites**. The platform is entirely configuration-driven.

**1. Register the Agent (`data/agents.ts`)**
Simply add a new configuration block to the registry:
```ts
{
  id: "my-new-agent",
  name: "My New Agent",
  description: "A brief description of what this agent does.",
  route: "/agent/my-new-agent",
  icon: "⚡",
  fields: [
    { name: "input", label: "Input Data", type: "textarea", required: true },
  ],
}
```
*The Next.js dynamic routes (`/agent/[id]`) and dynamic form generator will instantly build the page based on this configuration.*

**2. Configure the Webhook (`lib/webhook.ts`)**
Add your agent's ID and corresponding environment variable to the `WEBHOOK_URLS` mapping.

**3. (Optional) Provide a Mock Response**
Update `generateMockResponse` in `lib/webhook.ts` to return realistic dummy data for local testing when the actual n8n webhook isn't available.

## 🔌 Webhook & n8n Integration

The playground relies on external n8n workflows for all heavy lifting.
When a user submits a form on an agent's page:
1. The Next.js API route (`/api/agent/[id]/route.ts`) receives the request.
2. It looks up the associated webhook URL in `lib/webhook.ts`.
3. It sends a `POST` request with the JSON payload to n8n.
4. The n8n workflow executes the AI logic and returns a synchronous JSON response.
5. The frontend displays the result.

For detailed input/output schemas of individual agents, see the [documentation folder](/documentation/README.md).

## 📁 Project Structure

```text
/app
  page.tsx                # Landing page showing the agent ecosystem
  agent/[id]/page.tsx     # Dynamic UI rendering for agents
  api/agent/[id]/route.ts # Central API handler for webhook dispatch
/components
  AgentCard.tsx           # Agent display on the landing page
  DynamicForm.tsx         # Auto-generates forms from agent.ts config
  OutputBox.tsx           # Result display with copy functionality
/data
  agents.ts               # 🧠 The Agent Registry (Single Source of Truth)
/documentation            # Individual agent schemas and n8n workflows
/lib
  api.ts                  # Client-side API fetch wrapper
  webhook.ts              # Server-side webhook router & mock engine
```

## 🚀 Deployment

The playground is optimized for Vercel.

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add your production n8n webhook URLs as Environment Variables in the Vercel dashboard.
4. Deploy!

```bash
# To test a production build locally
npm run build
npm start
```

## 🤝 Contribution Workflow

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingAgent`).
3. If adding a new agent workflow, please include the relevant markdown documentation in `/documentation`.
4. Commit your changes (`git commit -m 'Add some AmazingAgent'`).
5. Push to the branch (`git push origin feature/AmazingAgent`).
6. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for the complete license text. Please respect the original work and retain the Shinka copyright and license notices where required by the MIT License.

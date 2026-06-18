import AgentCard from "@/components/AgentCard";
import { getAllAgents } from "@/data/agents";

export default function HomePage() {
  const agents = getAllAgents();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        {/* Hero Section */}
        <section className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Next-Gen Autonomous Workforce
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
            Shinka-6c <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Playground</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted sm:text-xl">
            Deploy hyper-intelligent agents to automate your sales, repurpose content, and monitor revenue in real-time. Experience the future of work.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            <div className="flex justify-center gap-4">
              <a href="#agents" className="rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-hover transition-all hover:-translate-y-0.5">
                Explore Agents
              </a>
              <a href="https://github.com/Chandu-Collab/ai-automation-workflows" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-8 py-4 font-semibold text-foreground hover:bg-border/50 transition-all hover:-translate-y-0.5">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Build Your Own Agent
              </a>
            </div>
            <p className="text-sm text-muted">
              Want to create your own custom AI agent? <a href="https://github.com/Chandu-Collab/ai-automation-workflows" target="_blank" rel="noreferrer" className="text-accent hover:underline">Check out our GitHub repo</a> for open-source workflows and templates!
            </p>
          </div>

          {/* Banner Image */}
          <div className="mt-20 relative mx-auto max-w-3xl rounded-3xl border border-accent/20 bg-surface-elevated/30 p-2 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent/0 via-accent/30 to-purple-500/0 opacity-50 blur-xl"></div>
            <img src="/banner.jpg" alt="Shinka-6c Dashboard" className="relative rounded-2xl w-full object-cover" />
          </div>
        </section>

        {/* Agents Grid */}
        <section id="agents" className="scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Our AI Automation Suite</h2>
            <p className="text-muted">Select an agent below to deploy it immediately into your workflow.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

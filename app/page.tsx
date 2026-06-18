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
            Shinka <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">AI Playground</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted sm:text-xl">
            Deploy hyper-intelligent agents to automate your sales, repurpose content, and monitor revenue in real-time. Experience the future of work.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#agents" className="rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-hover transition-all hover:-translate-y-0.5">
              Explore Agents
            </a>
            <a href="https://github.com/Chandu-Collab/shinka-6c-playground" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-surface-elevated px-8 py-4 font-semibold text-foreground hover:bg-border/50 transition-all hover:-translate-y-0.5">
              View Source
            </a>
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

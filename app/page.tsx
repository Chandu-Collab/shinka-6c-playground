import AgentCard from "@/components/AgentCard";
import { getAllAgents } from "@/data/agents";
import MouseGlow from "@/components/ui/MouseGlow";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const agents = getAllAgents();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <MouseGlow />
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-accent opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Next-Gen Autonomous Workforce
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              Shinka-6c <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Playground</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="mx-auto max-w-2xl text-lg text-muted sm:text-xl">
              Deploy hyper-intelligent agents to automate your sales, repurpose content, and monitor revenue in real-time. Experience the future of work.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <a href="#agents" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 w-full sm:w-auto">
                  Explore Agents
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="https://github.com/Chandu-Collab/ai-automation-workflows" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-8 py-4 font-semibold text-foreground hover:bg-border/30 transition-all hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Terminal className="h-5 w-5 text-accent" />
                  Build Your Own Agent
                </a>
              </div>
              <p className="text-sm text-muted">
                Want to create your own custom AI agent? <a href="https://github.com/Chandu-Collab/ai-automation-workflows" target="_blank" rel="noreferrer" className="text-accent hover:underline font-medium transition-colors">Check out our GitHub repo</a> for open-source workflows and templates!
              </p>
            </div>
          </FadeIn>

          {/* Banner Image */}
          <FadeIn delay={0.5}>
            <div className="mt-20 relative mx-auto max-w-3xl rounded-3xl border border-accent/20 bg-surface-elevated/30 p-2 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-xl group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent/0 via-accent/30 to-purple-500/0 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100 group-hover:via-accent/40"></div>
              <Image src="/banner.jpg" alt="Shinka-6c Dashboard" width={1200} height={675} className="relative rounded-2xl w-full h-auto object-cover shadow-2xl ring-1 ring-white/10" priority />
            </div>
          </FadeIn>
        </section>

        {/* Agents Grid */}
        <section id="agents" className="scroll-mt-24">
          <FadeIn delay={0.2} direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Our AI Automation Suite</h2>
              <p className="text-muted">Select an agent below to deploy it immediately into your workflow.</p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, index) => (
              <FadeIn key={agent.id} delay={0.1 + (index % 3) * 0.1}>
                <AgentCard agent={agent} />
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

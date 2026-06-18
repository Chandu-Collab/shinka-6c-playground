import type { Agent } from "@/data/agents";
import Link from "next/link";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface-elevated/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-accent/50 overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:via-transparent group-hover:to-purple-500/5"></div>
      
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-2xl border border-accent/20 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {agent.icon}
      </div>
      
      <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">{agent.name}</h3>
      <p className="mb-8 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
        {agent.description}
      </p>
      
      <Link
        href={agent.route}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface border border-border px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/25"
      >
        Deploy Agent
        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </Link>
    </article>
  );
}

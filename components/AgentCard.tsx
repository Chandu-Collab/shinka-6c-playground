import type { Agent } from "@/data/agents";
import Link from "next/link";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl">
        {agent.icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight">{agent.name}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
        {agent.description}
      </p>
      <Link
        href={agent.route}
        className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
      >
        Try Now
      </Link>
    </article>
  );
}

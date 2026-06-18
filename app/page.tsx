import AgentCard from "@/components/AgentCard";
import { getAllAgents } from "@/data/agents";

export default function HomePage() {
  const agents = getAllAgents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <section className="mb-16 text-center sm:mb-20">
        <p className="mb-4 inline-block rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium text-muted">
          AI Agents Hub
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Shinka AI Playground
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Run powerful AI agents with a single click. Repurpose content, reply
          to leads, and more — all from one clean interface.
        </p>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Available Agents
            </h2>
            <p className="mt-1 text-sm text-muted">
              {agents.length} agent{agents.length !== 1 ? "s" : ""} ready to use
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}

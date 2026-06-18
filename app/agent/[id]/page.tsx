import AgentRunner from "@/components/AgentRunner";
import LeadCaptureUI from "@/components/LeadCaptureUI";
import JobMatchingUI from "@/components/JobMatchingUI";
import YoutubeRepurposerUI from "@/components/YoutubeRepurposerUI";
import MultilingualSupportUI from "@/components/MultilingualSupportUI";
import BusinessInsightsUI from "@/components/BusinessInsightsUI";
import { getAgentById } from "@/data/agents";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AgentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { getAllAgents } = await import("@/data/agents");
  return getAllAgents().map((agent) => ({ id: agent.id }));
}

export async function generateMetadata({ params }: AgentPageProps) {
  const { id } = await params;
  const agent = getAgentById(id);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: `${agent.name} | Shinka AI Playground`,
    description: agent.description,
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params;
  const agent = getAgentById(id);

  if (!agent) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Back to agents
      </Link>

      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl">
          {agent.icon}
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {agent.name}
        </h1>
        <p className="max-w-2xl text-muted">{agent.description}</p>
      </div>

      {agent.id === "lead-auto-reply" ? (
        <LeadCaptureUI agent={agent} />
      ) : agent.id === "resume-job-matcher" ? (
        <JobMatchingUI agent={agent} />
      ) : agent.id === "youtube-repurposer" ? (
        <YoutubeRepurposerUI agent={agent} />
      ) : agent.id === "multilingual-support" ? (
        <MultilingualSupportUI agent={agent} />
      ) : agent.id === "business-insights" ? (
        <BusinessInsightsUI agent={agent} />
      ) : (
        <AgentRunner agent={agent} />
      )}
    </div>
  );
}

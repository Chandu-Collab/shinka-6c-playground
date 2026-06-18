"use client";

import type { Agent } from "@/data/agents";
import DynamicForm, { type FormValues } from "@/components/DynamicForm";
import OutputBox from "@/components/OutputBox";
import { useToast } from "@/components/Toast";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";

interface AgentRunnerProps {
  agent: Agent;
}

function buildInitialValues(fields: Agent["fields"]): FormValues {
  return fields.reduce<FormValues>((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {});
}

export default function AgentRunner({ agent }: AgentRunnerProps) {
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(() =>
    buildInitialValues(agent.fields)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleChange = (name: string, value: string | File | null) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    const payload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(values)) {
      if (value instanceof File) {
        payload[key] = value.name;
      } else {
        payload[key] = value;
      }
    }

    const result = await callAgentApi(agent.id, payload);

    if (!result.success) {
      setError(result.error ?? "Request failed");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Request failed", "error");
    } else {
      setOutput(result.data ?? null);
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Agent completed successfully!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
        <h2 className="mb-1 text-lg font-semibold">Input</h2>
        <p className="mb-6 text-sm text-muted">
          Fill in the details below and run the agent.
        </p>
        <DynamicForm
          fields={agent.fields}
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>

      <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
        <h2 className="mb-1 text-lg font-semibold">Output</h2>
        <p className="mb-6 text-sm text-muted">
          Results will appear here after processing.
        </p>

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            <p className="text-sm">Agent is working...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {!isLoading && !error && !output && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted">
            <span className="text-3xl opacity-40">◇</span>
            <p className="text-sm">No results yet. Run the agent to get started.</p>
          </div>
        )}

        {!isLoading && output && (
          <OutputBox data={output} agentId={agent.id} />
        )}
      </section>
    </div>
  );
}

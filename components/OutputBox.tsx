"use client";

import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

interface OutputBoxProps {
  data: Record<string, unknown> | null;
  agentId?: string;
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join("\n\n");
  return JSON.stringify(value, null, 2);
}

export default function OutputBox({ data, agentId }: OutputBoxProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!data) return null;

  const entries = Object.entries(data);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      trackEvent({ event: "copy_output", agentId, metadata: { key } });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <div className="animate-fade-in space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Results
      </h3>
      {entries.map(([key, value]) => {
        const text = formatValue(value);
        return (
          <div
            key={key}
            className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-medium">{formatKey(key)}</span>
              <button
                type="button"
                onClick={() => handleCopy(key, text)}
                className="rounded-lg px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
              >
                {copiedKey === key ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed">
              {text}
            </pre>
          </div>
        );
      })}
    </div>
  );
}

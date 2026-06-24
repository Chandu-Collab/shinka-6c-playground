"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface InstagramDMUIProps {
  agent: Agent;
}

export default function InstagramDMUI({ agent }: InstagramDMUIProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ username: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    // Include timestamp as the n8n workflow uses it
    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    };

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
      showToast("DM processed successfully!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl transition-all">
      <div className="grid lg:grid-cols-5">
        {/* Left Side: Form */}
        <div className="p-8 lg:col-span-3 lg:p-12">
          <div className="mb-8">
            <h2 className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
              Instagram DM Simulator
            </h2>
            <p className="mt-2 text-muted">
              Simulate an incoming Instagram Direct Message to test the lead capture and qualification system.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium text-foreground/90">
                Instagram Handle <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted font-medium">@</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-3.5 text-sm outline-none transition-all focus:border-pink-500 focus:bg-surface focus:ring-4 focus:ring-pink-500/10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                Email Address (For Follow-up) <span className="text-pink-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition-all focus:border-pink-500 focus:bg-surface focus:ring-4 focus:ring-pink-500/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                Direct Message <span className="text-pink-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hey, I'm interested in your services. How much does it cost?"
                className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition-all focus:border-pink-500 focus:bg-surface focus:ring-4 focus:ring-pink-500/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-pink-500/25 focus:ring-4 focus:ring-pink-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right Side: Output / AI Preview */}
        <div className="flex flex-col bg-background/50 p-8 lg:col-span-2 lg:border-l lg:border-border lg:p-12">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Qualification Results
          </h3>

          {!isLoading && !output && !error && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted opacity-60">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated shadow-sm border border-border">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-sm">Submit the DM to see how the AI qualifies it.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-muted">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-pink-500/20 border-t-pink-500" />
              <p className="animate-pulse text-sm">AI is analyzing intent...</p>
            </div>
          )}

          {error && (
            <div className="animate-fade-in rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Error
              </div>
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {output && (
            <div className="animate-slide-up flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-300">Message Processed!</h4>
                    <p className="text-sm mt-0.5">The lead has been captured and scored.</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-inner">
                    AI
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI Lead Scorer</p>
                    <p className="text-xs text-muted">Just now</p>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {Object.keys(output).length > 0 ? (
                    <pre className="bg-transparent p-0 m-0 text-sm overflow-auto text-foreground/80 font-mono">
                      {JSON.stringify(output, null, 2)}
                    </pre>
                  ) : (
                    <p className="italic text-muted-foreground">Webhook triggered successfully without returning specific data.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

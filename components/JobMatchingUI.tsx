"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface JobMatchingUIProps {
  agent: Agent;
}

export default function JobMatchingUI({ agent }: JobMatchingUIProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: "", resumeText: "" });
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

    const result = await callAgentApi(agent.id, formData);

    if (!result.success) {
      setError(result.error ?? "Failed to analyze resume.");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Failed to analyze resume.", "error");
    } else {
      setOutput(result.data ?? { success: true });
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Resume analyzed successfully!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl transition-all">
      <div className="grid lg:grid-cols-2">
        {/* Left Side: Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
              🚀
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">AI Job Matcher</h2>
              <p className="text-sm text-muted">Paste your resume. Get remote jobs.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                Where should we send your matches? <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="resumeText" className="text-sm font-medium text-foreground/90">
                Paste your Resume / CV <span className="text-accent">*</span>
              </label>
              <textarea
                id="resumeText"
                name="resumeText"
                required
                rows={12}
                value={formData.resumeText}
                onChange={handleChange}
                placeholder="Experience:
Frontend Developer at Tech Corp...
Skills: React, Next.js, Node.js..."
                className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm font-mono leading-relaxed outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent/25 focus:ring-4 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    Find My Matches
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

        {/* Right Side: Visual Feedback */}
        <div className="relative flex flex-col items-center justify-center bg-background/50 p-8 lg:border-l lg:border-border lg:p-12">
          {!isLoading && !output && !error && (
            <div className="flex flex-col items-center justify-center text-center text-muted opacity-80">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">📄</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">✨</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">💼</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🎯</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground/80">AI Talent Scanner</h3>
              <p className="mt-2 text-sm max-w-[250px]">
                We use advanced LangChain agents to extract your skills and map them to remote job listings.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-accent/20"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40">
                  <svg className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground/90 animate-pulse">Extracting Skills...</h3>
                <p className="mt-1 text-sm text-muted">Searching across remote job boards</p>
              </div>
            </div>
          )}

          {error && (
            <div className="animate-fade-in w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Processing Failed
              </div>
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {output && !error && (
            <div className="animate-slide-up w-full rounded-3xl border border-green-200 bg-green-50 p-8 text-center shadow-sm dark:border-green-900/50 dark:bg-green-900/20">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-green-900 dark:text-green-300">
                Match Complete!
              </h3>
              <p className="text-green-800 dark:text-green-400">
                We've analyzed your resume and found matching jobs. A personalized list with AI-generated explanations has been sent to <strong>{formData.email}</strong>.
              </p>
              <div className="mt-8 rounded-xl bg-white/50 p-4 text-sm font-medium text-green-900 dark:bg-black/20 dark:text-green-300">
                Please check your inbox (and spam folder) in the next few minutes.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

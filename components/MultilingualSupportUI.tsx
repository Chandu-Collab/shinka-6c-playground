"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface MultilingualSupportUIProps {
  agent: Agent;
}

export default function MultilingualSupportUI({ agent }: MultilingualSupportUIProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
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
      setError(result.error ?? "Failed to process support request.");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Failed to process support request.", "error");
    } else {
      setOutput(result.data ?? { success: true });
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Support request processed!", "success");
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
              🌍
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Global Support Desk</h2>
              <p className="text-sm text-muted">We speak your language. AI auto-translates and resolves queries instantly.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                Your Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="text-sm font-medium text-foreground/90">
                Subject <span className="text-accent">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Missing item from my delivery..."
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                How can we help? (Any Language) <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="मुझे मेरा पैसा वापस चाहिए / I want a refund / నాకు నా డబ్బు తిరిగి కావాలి"
                className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm leading-relaxed outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-purple-600/25 focus:ring-4 focus:ring-purple-600/30 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-purple-700 dark:hover:bg-purple-600"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing Request...
                  </>
                ) : (
                  <>
                    Send Support Request
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
                <div className="h-20 w-20 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🗣️</div>
                <div className="h-20 w-20 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🔤</div>
                <div className="h-20 w-20 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🤖</div>
                <div className="h-20 w-20 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">✉️</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground/80">Intelligent Routing</h3>
              <p className="mt-2 text-sm max-w-[250px]">
                Our AI detects your language, translates it, classifies the urgency, and determines whether to auto-reply or escalate to a human.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-purple-600/20"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/40">
                  <svg className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground/90 animate-pulse">Translating & Classifying...</h3>
                <p className="mt-1 text-sm text-muted">Evaluating urgency and processing intent</p>
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
            <div className="animate-slide-up w-full rounded-3xl border border-purple-200 bg-purple-50 p-8 text-center shadow-sm dark:border-purple-900/50 dark:bg-purple-900/20">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-purple-900 dark:text-purple-300">
                Ticket Processed
              </h3>
              <p className="text-purple-800 dark:text-purple-400">
                Your request has been successfully analyzed. An update has been sent to <strong>{formData.email}</strong>.
              </p>
              <div className="mt-8 rounded-xl bg-white/50 p-4 text-sm font-medium text-purple-900 dark:bg-black/20 dark:text-purple-300">
                Please check your inbox. If your issue was urgent, our human team has already been notified!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

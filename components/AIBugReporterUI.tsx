"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface AIBugReporterUIProps {
  agent: Agent;
}

export default function AIBugReporterUI({ agent }: AIBugReporterUIProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    reporter_name: "",
    reporter_email: "",
    application: "",
    environment: "",
    browser: "",
    device: "",
    page_url: "",
    bug_title: "",
    bug_description: "",
    steps_to_reproduce: "",
    expected_result: "",
    actual_result: "",
    attachment: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, attachment: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, attachment: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    const result = await callAgentApi(agent.id, formData);

    if (!result.success) {
      setError(result.error ?? "Failed to submit bug report.");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Failed to submit bug report.", "error");
    } else {
      setOutput(result.data ?? { success: true });
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Bug report submitted successfully!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl transition-all">
      <div className="grid lg:grid-cols-2">
        {/* Left Side: Form */}
        <div className="p-6 lg:p-10 max-h-[800px] overflow-y-auto custom-scrollbar">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
              {agent.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{agent.name}</h2>
              <p className="text-sm text-muted">Submit an issue and let AI categorize it.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="reporter_name" className="text-sm font-medium text-foreground/90">Your Name <span className="text-accent">*</span></label>
                <input id="reporter_name" name="reporter_name" type="text" required value={formData.reporter_name} onChange={handleChange} placeholder="John Doe" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
              <div className="space-y-1">
                <label htmlFor="reporter_email" className="text-sm font-medium text-foreground/90">Your Email <span className="text-accent">*</span></label>
                <input id="reporter_email" name="reporter_email" type="email" required value={formData.reporter_email} onChange={handleChange} placeholder="john@example.com" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="application" className="text-sm font-medium text-foreground/90">Application <span className="text-accent">*</span></label>
                <input id="application" name="application" type="text" required value={formData.application} onChange={handleChange} placeholder="e.g. Dashboard" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
              <div className="space-y-1">
                <label htmlFor="environment" className="text-sm font-medium text-foreground/90">Environment <span className="text-accent">*</span></label>
                <select id="environment" name="environment" required value={formData.environment} onChange={handleChange} className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10 text-foreground/90">
                  <option value="" disabled>Select Env</option>
                  <option value="Production">Production</option>
                  <option value="Staging">Staging</option>
                  <option value="Development">Development</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="browser" className="text-sm font-medium text-foreground/90">Browser <span className="text-accent">*</span></label>
                <input id="browser" name="browser" type="text" required value={formData.browser} onChange={handleChange} placeholder="e.g. Chrome" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
              <div className="space-y-1">
                <label htmlFor="device" className="text-sm font-medium text-foreground/90">Device <span className="text-accent">*</span></label>
                <input id="device" name="device" type="text" required value={formData.device} onChange={handleChange} placeholder="e.g. MacBook Pro" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="page_url" className="text-sm font-medium text-foreground/90">Page URL <span className="text-accent">*</span></label>
              <input id="page_url" name="page_url" type="url" required value={formData.page_url} onChange={handleChange} placeholder="https://example.com/page" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
            </div>

            <div className="space-y-1">
              <label htmlFor="bug_title" className="text-sm font-medium text-foreground/90">Bug Title <span className="text-accent">*</span></label>
              <input id="bug_title" name="bug_title" type="text" required value={formData.bug_title} onChange={handleChange} placeholder="Brief summary of the issue" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
            </div>

            <div className="space-y-1">
              <label htmlFor="bug_description" className="text-sm font-medium text-foreground/90">Bug Description <span className="text-accent">*</span></label>
              <textarea id="bug_description" name="bug_description" required rows={3} value={formData.bug_description} onChange={handleChange} placeholder="Detailed description..." className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
            </div>

            <div className="space-y-1">
              <label htmlFor="steps_to_reproduce" className="text-sm font-medium text-foreground/90">Steps to Reproduce <span className="text-accent">*</span></label>
              <textarea id="steps_to_reproduce" name="steps_to_reproduce" required rows={3} value={formData.steps_to_reproduce} onChange={handleChange} placeholder="1. Go to...\n2. Click on..." className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="expected_result" className="text-sm font-medium text-foreground/90">Expected Result <span className="text-accent">*</span></label>
                <textarea id="expected_result" name="expected_result" required rows={2} value={formData.expected_result} onChange={handleChange} placeholder="Should happen..." className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
              <div className="space-y-1">
                <label htmlFor="actual_result" className="text-sm font-medium text-foreground/90">Actual Result <span className="text-accent">*</span></label>
                <textarea id="actual_result" name="actual_result" required rows={2} value={formData.actual_result} onChange={handleChange} placeholder="Actually happened..." className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="attachment" className="text-sm font-medium text-foreground/90">Attachment (Optional)</label>
              <input id="attachment" name="attachmentFile" type="file" onChange={handleFileChange} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent/25 focus:ring-4 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-70 mt-4"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    Submit Bug Report
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right Side: Visual Feedback */}
        <div className="relative flex flex-col items-center justify-center bg-background/50 p-8 lg:border-l lg:border-border lg:p-12 min-h-[400px]">
          {!isLoading && !output && !error && (
            <div className="flex flex-col items-center justify-center text-center text-muted opacity-80">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🐛</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">⚙️</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">📋</div>
                <div className="h-24 w-24 rounded-2xl bg-surface shadow-sm border border-border flex items-center justify-center text-3xl">🚀</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground/80">AI Ticket Generator</h3>
              <p className="mt-2 text-sm max-w-[280px]">
                Submit your bug report and our AI will automatically prioritize, categorize, and convert it into a detailed engineering ticket.
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
                <h3 className="text-lg font-semibold text-foreground/90 animate-pulse">Analyzing Bug...</h3>
                <p className="mt-1 text-sm text-muted">Generating structured engineering ticket...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="animate-fade-in w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submission Failed
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
                Ticket Created!
              </h3>
              <p className="text-green-800 dark:text-green-400 mt-2">
                {String(output.message || "Your bug report has been successfully analyzed and stored.")}
              </p>
              <div className="mt-8 rounded-xl bg-white/50 p-4 text-sm font-medium text-green-900 dark:bg-black/20 dark:text-green-300">
                Our engineering team has been notified and you will receive an email confirmation shortly at <strong>{formData.reporter_email}</strong>.
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS for custom scrollbar within this component since it has a long form */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.6);
        }
      `}} />
    </div>
  );
}

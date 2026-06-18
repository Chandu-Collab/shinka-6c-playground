"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface BusinessInsightsUIProps {
  agent: Agent;
}

export default function BusinessInsightsUI({ agent }: BusinessInsightsUIProps) {
  const { showToast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string>("Today, 09:00 AM");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleSimulate = async () => {
    setIsRunning(true);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    // Hit the real n8n webhook to trigger the workflow
    const result = await callAgentApi(agent.id, {});
    
    if (!result.success) {
      trackEvent({ event: "agent_error", agentId: agent.id, metadata: { error: result.error } });
      showToast("Failed to trigger workflow: " + (result.error || "Unknown error"), "error");
    } else {
      trackEvent({ event: "agent_success", agentId: agent.id });
      setLastRun("Just now");
      showToast("Report generated successfully and sent via Gmail!", "success");
    }

    setIsRunning(false);
  };

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-900/30 bg-slate-900 shadow-2xl backdrop-blur-xl transition-all">
      <div className="grid lg:grid-cols-2">
        {/* Left Side: Info */}
        <div className="p-8 lg:p-12 relative z-10 flex flex-col justify-between">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 text-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                ⚙️
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Automated Insights Agent</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-3 w-3">
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
                    <span className={`relative inline-flex h-3 w-3 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                  </span>
                  <p className="text-sm font-medium text-slate-300">{isActive ? "Active (Running on Schedule)" : "Paused"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Workflow Configuration</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <span className="text-slate-400 text-sm">Trigger</span>
                    <span className="text-white text-sm font-medium bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">Daily @ 09:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <span className="text-slate-400 text-sm">Data Source</span>
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <span className="text-[#0F9D58]">📊</span> Google Sheets
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-slate-400 text-sm">Alert Thresholds</span>
                    <span className="text-red-400 text-sm font-medium">Revenue Drop {'>'} 30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-slate-700 transition-all"
            >
              {isActive ? "Pause Automation" : "Resume Automation"}
            </button>
            <button
              onClick={handleSimulate}
              disabled={isRunning || !isActive}
              className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? "Running..." : "Test Run"}
            </button>
          </div>
        </div>

        {/* Right Side: Visual Feedback */}
        <div className="relative flex flex-col items-center justify-center bg-slate-800/50 p-8 lg:border-l lg:border-slate-700 lg:p-12 overflow-hidden min-h-[400px]">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          {!isRunning ? (
            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
              <div className="h-24 w-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-4xl mb-6 shadow-xl relative">
                {isActive ? "⏱️" : "⏸️"}
                {isActive && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-2 border-slate-900"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">System Standing By</h3>
              <p className="text-slate-400 text-center text-sm mb-8">
                The AI is silently monitoring your Google Sheets. It will automatically trigger if anomalies are detected or when the scheduled time arrives.
              </p>

              <div className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4 flex justify-between items-center">
                <span className="text-slate-500 text-sm">Last Automated Run</span>
                <span className="text-blue-400 text-sm font-medium">{lastRun}</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center w-full max-w-sm">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full border border-blue-500/50"></div>
                <div className="absolute inset-4 animate-spin rounded-full border-[3px] border-transparent border-t-blue-500 border-r-blue-400"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <svg className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-100 animate-pulse">Running Background Analysis...</h3>
                <p className="mt-2 text-sm text-blue-300/70">Fetching rows from Google Sheets, analyzing revenue drop and pipeline health.</p>
              </div>
              
              <div className="w-full mt-4 space-y-2">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

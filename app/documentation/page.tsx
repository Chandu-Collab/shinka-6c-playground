"use client";

import { useState } from "react";
import { agents } from "@/data/agents";

export default function DocumentationPage() {
  const agentsWithDocs = agents.filter(a => a.docPath);
  const [selectedDoc, setSelectedDoc] = useState(agentsWithDocs[0]);

  return (
    <div className="mx-auto flex max-w-7xl h-[calc(100vh-4rem)] pt-8 pb-12 px-4 sm:px-6 lg:px-8 gap-8 animate-fade-in">
      {/* Sidebar */}
      <div className="w-1/3 max-w-sm flex flex-col gap-3 overflow-y-auto pr-4 pb-12 custom-scrollbar">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Documentation</h1>
        
        {agentsWithDocs.map(agent => (
          <button
            key={agent.id}
            onClick={() => setSelectedDoc(agent)}
            className={`flex items-start gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
              selectedDoc?.id === agent.id
                ? "bg-accent/10 border-accent/50 border shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                : "bg-surface border border-border hover:border-accent/30 hover:bg-surface-elevated hover:-translate-y-1"
            }`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-colors ${
              selectedDoc?.id === agent.id ? "bg-accent/20" : "bg-surface-elevated"
            }`}>
              {agent.icon}
            </div>
            <div>
              <div className="font-semibold text-foreground">{agent.name}</div>
              <div className="text-sm text-muted line-clamp-2 mt-1 leading-relaxed">{agent.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content (PDF iframe) */}
      <div className="flex-1 rounded-3xl border border-white/5 bg-surface-elevated overflow-hidden shadow-2xl relative">
        {selectedDoc ? (
          <>
            <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center -z-10">
              <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            </div>
            <iframe
              src={`${selectedDoc.docPath}#view=FitH`}
              className="h-full w-full border-0 relative z-10 bg-transparent mix-blend-screen"
              title={`${selectedDoc.name} Documentation`}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Select an agent to view documentation
          </div>
        )}
      </div>
    </div>
  );
}

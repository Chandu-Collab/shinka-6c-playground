"use client";

import { useState, createElement } from "react";
import { agents } from "@/data/agents";
import * as LucideIcons from "lucide-react";
import dynamic from "next/dynamic";

const SafePdfViewer = dynamic(() => import("@/components/SafePdfViewer"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 flex-col gap-4">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
      <p className="text-muted text-sm">Loading PDF viewer...</p>
    </div>
  )
});

export default function DocumentationPage() {
  const agentsWithDocs = agents.filter(a => a.docPath);
  const [selectedDoc, setSelectedDoc] = useState(agentsWithDocs[0]);

  return (
    <div className="mx-auto flex max-w-7xl h-[calc(100vh-4rem)] pt-8 pb-12 px-4 sm:px-6 lg:px-8 gap-8 animate-fade-in">
      {/* Sidebar */}
      <div className="w-1/3 max-w-sm flex flex-col gap-3 overflow-y-auto pr-4 pb-12 custom-scrollbar">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Documentation</h1>
        
        {agentsWithDocs.map(agent => {
          const IconComponent = (LucideIcons as any)[agent.icon] || LucideIcons.FileText;
          return (
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
                selectedDoc?.id === agent.id ? "bg-accent/20 text-accent" : "bg-surface-elevated text-muted"
              }`}>
                {createElement(IconComponent, { size: 24, strokeWidth: 1.5 })}
              </div>
              <div>
                <div className="font-semibold text-foreground">{agent.name}</div>
                <div className="text-sm text-muted line-clamp-2 mt-1 leading-relaxed">{agent.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content (PDF Viewer) */}
      <div className="flex-1 rounded-3xl border border-white/5 bg-surface-elevated overflow-hidden shadow-2xl relative">
        {selectedDoc && selectedDoc.docPath ? (
           <SafePdfViewer docPath={selectedDoc.docPath} title={`${selectedDoc.name} Documentation`} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Select an agent to view documentation
          </div>
        )}
      </div>
    </div>
  );
}

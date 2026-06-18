"use client";

import { useState } from "react";

export default function DocViewer({ docPath }: { docPath: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-surface border border-accent/20 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 transition-colors shadow-sm"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        View Documentation (PDF)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-border p-4 bg-surface-elevated">
              <h3 className="font-semibold text-foreground">Workflow Documentation</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-muted hover:bg-border hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-zinc-900">
              <iframe
                src={`${docPath}#view=FitH`}
                className="h-full w-full border-0"
                title="Documentation PDF"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

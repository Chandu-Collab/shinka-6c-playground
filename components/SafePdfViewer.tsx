"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

export default function SafePdfViewer({ docPath, title }: { docPath: string, title?: string }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    // Fetch PDF as a blob to bypass environment iframe restrictions
    fetch(docPath)
      .then(res => res.blob())
      .then(blob => {
        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch PDF blob", err);
        if (isMounted) {
          setPdfUrl(docPath); // Fallback to direct path
          setLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [docPath]);

  return (
    <div className="relative h-full w-full flex flex-col bg-zinc-900 overflow-hidden">
      {/* Top action bar */}
      <div className="absolute top-4 right-6 z-50">
        <a 
          href={docPath} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-surface/80 backdrop-blur border border-accent/30 px-4 py-2 rounded-lg text-sm text-accent hover:bg-accent/20 hover:border-accent/50 transition-all shadow-xl flex items-center gap-2"
        >
          <LucideIcons.ExternalLink size={16} /> Open in New Tab
        </a>
      </div>

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-40 bg-zinc-900">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
          <p className="text-muted text-sm">Preparing PDF viewer...</p>
        </div>
      )}

      {/* Native PDF Iframe using Blob URL */}
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#view=FitH`}
          className="h-full w-full border-0 relative z-10 bg-transparent mix-blend-screen"
          title={title || "Documentation PDF"}
        />
      )}
    </div>
  );
}

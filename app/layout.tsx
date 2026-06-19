import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shinka-6c Playground",
  description: "AI Agents Hub — run powerful agents with one click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}
      >
        <ToastProvider>
          <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/60 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)] overflow-hidden">
                  <img src="/logo.png" alt="Shinka-6c Logo" className="h-full w-full object-cover" />
                </div>
                Shinka<span className="text-accent">-6c</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">Agents</Link>
                <Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
              </nav>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className="hidden sm:inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                  Get Started
                </button>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-white/5 bg-surface/30 backdrop-blur-sm py-12 mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><Link href="/features" className="hover:text-accent transition-colors">Features</Link></li>
                    <li><Link href="/" className="hover:text-accent transition-colors">Agents</Link></li>
                    <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><Link href="/documentation" className="hover:text-accent transition-colors">Documentation</Link></li>
                    <li><a href="https://github.com/Chandu-Collab/ai-automation-workflows" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
                    <li><Link href="/tutorials" className="hover:text-accent transition-colors">Tutorials <span className="opacity-50 text-xs">(soon)</span></Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    Try Now <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">🔥</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><Link href="/agent/youtube-repurposer" className="hover:text-accent transition-colors">YouTube Agent</Link></li>
                    <li><Link href="/agent/resume-job-matcher" className="hover:text-accent transition-colors">Resume Agent</Link></li>
                    <li><Link href="/agent/lead-auto-reply" className="hover:text-accent transition-colors">Lead Agent</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                    <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-accent transition-colors">Terms</Link></li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-t border-white/5 pt-8 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  New AI agents dropping every 3 days
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted">
                <p>© {new Date().getFullYear()} Shinka-6c Automation. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}

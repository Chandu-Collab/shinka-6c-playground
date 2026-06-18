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
  title: "Shinka AI Playground",
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
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Shinka <span className="text-accent">AI</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">Agents</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Integrations</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">API Reference</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Community</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-sm text-muted">
                <p>© {new Date().getFullYear()} Shinka AI Automation. All rights reserved.</p>
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

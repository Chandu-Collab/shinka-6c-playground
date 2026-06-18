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
          <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
              >
                Shinka <span className="text-accent">AI</span>
              </Link>
              <ThemeToggle />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-border py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted sm:px-6">
              Shinka AI Playground — modular agents hub
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}

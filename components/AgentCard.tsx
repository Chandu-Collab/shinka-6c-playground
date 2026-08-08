'use client';

import type { Agent } from "@/data/agents";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import * as LucideIcons from "lucide-react";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  // Setup mouse tracking for the dynamic glare effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Retrieve the dynamically named icon
  const IconComponent = (LucideIcons as any)[agent.icon] || LucideIcons.Bot;

  return (
    <motion.article 
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-surface-elevated/40 p-6 shadow-sm backdrop-blur-xl overflow-hidden"
    >
      {/* Dynamic Mouse Glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Subtle glowing border on hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl border border-accent/0 transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]" />
      
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent border border-accent/20 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/20">
        <IconComponent size={28} strokeWidth={1.5} />
      </div>
      
      <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">{agent.name}</h3>
      <p className="mb-8 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
        {agent.description}
      </p>
      
      <Link
        href={agent.route}
        className="relative z-10 mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface border border-border px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/25"
      >
        Deploy Agent
        <LucideIcons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
      </Link>
    </motion.article>
  );
}

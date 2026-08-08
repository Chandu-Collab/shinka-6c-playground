'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 30, opacity: 0 };
      case "down": return { y: -30, opacity: 0 };
      case "left": return { x: 30, opacity: 0 };
      case "right": return { x: -30, opacity: 0 };
      case "none": return { opacity: 0 };
      default: return { y: 30, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: delay,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

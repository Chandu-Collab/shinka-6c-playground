'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MouseGlowProps {
  className?: string;
}

export default function MouseGlow({ className }: MouseGlowProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-300",
        className
      )}
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.07), transparent 40%)`,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
    />
  );
}

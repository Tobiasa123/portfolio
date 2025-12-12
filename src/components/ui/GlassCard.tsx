"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  const [mounted, setMounted] = useState(false);

  // Only render on client to avoid SSR issues
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-2xl ${className}`}
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        w-full max-w-md p-8
        rounded-2xl
        bg-white/10 dark:bg-black/20
        border border-white/20 dark:border-black/40
        backdrop-blur-2xl
        shadow-[0_8px_30px_rgb(0,0,0,0.4)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  id,
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{
        opacity: 0,
        y: 180,        
        scale: 0.85,   
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.4,   
      }}
      transition={{
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1], 
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

"use client";

import { motion } from "motion/react";
import BlogSection from "@/components/BlogSection";
import { expo, stagger, fadeUp } from "@/components/sections/home/motion";

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden portfolio-base">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 size-120 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--portfolio-glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center px-6 md:px-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl flex flex-col gap-14"
        >
          <div className="text-center flex flex-col gap-4">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: expo }}
              className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand"
            >
              Latest Writings
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: expo }}
              className="text-4xl md:text-5xl font-bold tracking-tight portfolio-text"
            >
              Blog
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: expo }}
              className="portfolio-text-muted"
            >
              Insights, tutorials, product updates, and engineering articles from
              our team.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: expo }}
          >
            <BlogSection />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
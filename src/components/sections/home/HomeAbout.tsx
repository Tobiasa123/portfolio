"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { expo, stagger, fadeLeft, fadeRight, viewportOnce } from "@/components/sections/home/motion";

export function HomeAbout() {
  const t = useTranslations("public.home");
  const aboutTechs = t.raw("about.technologies") as string[];

  return (
    <motion.section
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="min-h-screen flex items-center px-6 md:px-16 py-24 border-b portfolio-border"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeLeft}
          transition={{ duration: 0.8, ease: expo }}
          className="flex flex-col gap-6 text-center md:text-left"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand">
            {t("about.badge")}
          </p>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
            {t("about.title")}
          </h2>
          <p className="text-base md:text-lg leading-relaxed portfolio-text-muted max-w-md mx-auto md:mx-0">
            {t("about.description")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeRight}
          transition={{ duration: 0.9, ease: expo }}
          className="flex justify-center"
          aria-hidden
        >
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            className="size-64 rounded-2xl portfolio-surface border portfolio-border-brand grid grid-cols-2 gap-3 p-5"
          >
            {aboutTechs.map((label) => (
              <motion.div
                key={label}
                variants={{
                  hidden:  { opacity: 0, scale: 0.85, y: 10 },
                  visible: { opacity: 1, scale: 1,    y: 0  },
                }}
                transition={{ duration: 0.5, ease: expo }}
                whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
                className="rounded-xl border portfolio-text-faint flex items-center justify-center text-xs font-semibold tracking-wide"
                style={{
                  backgroundColor: "rgb(var(--portfolio-brand-muted) / 0.08)",
                  borderColor: "rgb(var(--portfolio-border-brand) / 0.18)",
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { expo, smooth, stagger, fadeLeft, viewportOnce } from "@/components/sections/home/motion";

export function HomeProjects() {
  const t = useTranslations("public.home");
  const projects = t.raw("projects.items") as { title: string; description: string; tag: string }[];

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="min-h-screen flex items-center px-6 md:px-16 py-24 border-b portfolio-border-brand"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.p
          variants={fadeLeft}
          transition={{ duration: 0.6, ease: expo }}
          className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand mb-4"
        >
          {t("projects.badge")}
        </motion.p>

        <motion.h2
          variants={fadeLeft}
          transition={{ duration: 0.75, ease: expo }}
          className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-14"
        >
          {t("projects.title")}
        </motion.h2>

        <motion.div
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden:  { opacity: 0, y: 32, scale: 0.96, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" },
              }}
              transition={{ duration: 0.65, ease: expo }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: smooth } }}
              className="group flex flex-col gap-3 p-7 rounded-2xl portfolio-surface border portfolio-border-brand transition-colors duration-200 hover:portfolio-border-brand cursor-default"
            >
              <h3 className="text-lg font-semibold portfolio-text">{p.title}</h3>
              <p className="text-sm leading-relaxed portfolio-text-muted flex-1">{p.description}</p>
              <p className="text-xs tracking-wide portfolio-brand mt-1">{p.tag}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
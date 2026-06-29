"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { expo, stagger, staggerFast, fadeUp, viewportOnce } from "@/components/sections/home/motion";

export function HomeStack() {
  const t = useTranslations("public.home");
  const stack = t.raw("stack.items") as string[];

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-center justify-center px-6 md:px-16 py-28 text-center border-b portfolio-border"
    >
      <div className="max-w-2xl">
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: expo }}
          className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand mb-5"
        >
          {t("stack.badge")}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.7, ease: expo }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-10"
        >
          {t("stack.title")}
        </motion.h2>

        <motion.div variants={staggerFast} className="flex flex-wrap gap-2.5 justify-center">
          {stack.map((item) => (
            <motion.span
              key={item}
              variants={{
                hidden:  { opacity: 0, scale: 0.8, y: 12 },
                visible: { opacity: 1, scale: 1,   y: 0  },
              }}
              transition={{ duration: 0.45, ease: expo }}
              whileHover={{ scale: 1.08, transition: { duration: 0.18 } }}
              className="px-4 py-2 rounded-full border portfolio-border-brand portfolio-text-muted text-sm font-medium cursor-default"
              style={{ backgroundColor: "rgb(var(--portfolio-brand-muted) / 0.07)" }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
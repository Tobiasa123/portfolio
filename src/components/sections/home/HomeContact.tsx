"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { expo, stagger, fadeUp, viewportOnce } from "@/components/sections/home/motion";

export function HomeContact() {
  const t = useTranslations("public.home");

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="min-h-screen flex items-center justify-center px-6 md:px-16 py-24 border-b portfolio-border"
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8, ease: expo }}
        className="w-full max-w-md"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand mb-4 text-center">
          {t("contact.badge")}
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center">
          {t("contact.title")}
        </h2>

        {[
          { type: "text",  placeholder: t("contact.namePlaceholder") },
          { type: "email", placeholder: t("contact.emailPlaceholder") },
        ].map((f, i) => (
          <motion.input
            key={f.placeholder}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: expo, delay: 0.1 + i * 0.07 }}
            type={f.type}
            placeholder={f.placeholder}
            className="w-full px-4 py-3.5 mb-3 rounded-xl portfolio-surface border portfolio-border portfolio-text placeholder:portfolio-text-faint text-sm outline-none focus:portfolio-border-brand transition-colors"
          />
        ))}

        <motion.textarea
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: expo, delay: 0.24 }}
          placeholder={t("contact.messagePlaceholder")}
          rows={5}
          className="w-full px-4 py-3.5 mb-5 rounded-xl portfolio-surface border portfolio-border portfolio-text placeholder:portfolio-text-faint text-sm outline-none focus:portfolio-border-brand transition-colors resize-vertical font-sans"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: expo, delay: 0.3 }}
        >
          <Button text={t("contact.submit")} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs portfolio-text-faint mt-4 text-center"
        >
          {t("contact.liveChat")}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
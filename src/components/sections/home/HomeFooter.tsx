"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { smooth, viewportOnce } from "@/components/sections/home/motion";

export function HomeFooter() {
  const t = useTranslations("public.home");

  const socialLinks = [
    { key: "linkedin", label: t("footer.linkedin") },
    { key: "github",   label: t("footer.github") },
    { key: "twitter",  label: t("footer.twitter") },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: smooth }}
      className="portfolio-surface px-6 md:px-16 pt-16 pb-10"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 mb-8 border-b portfolio-border">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase portfolio-text-faint mb-1">
            {t("footer.contact")}
          </h3>
          <a
            href={`mailto:${t("footer.email")}`}
            className="text-sm portfolio-text-muted hover:portfolio-text transition-colors no-underline"
          >
            {t("footer.email")}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase portfolio-text-faint mb-1">
            {t("footer.socials")}
          </h3>
          {socialLinks.map(({ key, label }) => (
            <a
              key={key}
              href="#"
              className="text-sm portfolio-text-muted hover:portfolio-text transition-colors no-underline"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase portfolio-text-faint mb-1">
            {t("footer.elsewhere")}
          </h3>
          <p className="text-sm portfolio-text-muted">{t("footer.discord")}</p>
        </div>
      </div>

      <p className="text-center text-xs portfolio-text-faint">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </p>
    </motion.footer>
  );
}
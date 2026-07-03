// src/app/(authorized)/[locale]/dashboard/page.tsx
"use client";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("home");

  return (
    <div className="text-center rounded-md h-full w-full">
      {/* Animate heading */}
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {t("welcome")}
      </motion.h1>

      {/* Animate paragraph */}
      <motion.p
        className="mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {t("intro")}
      </motion.p>
    </div>
  );
}

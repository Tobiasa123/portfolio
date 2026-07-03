"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { TechItem } from "@/components/TechItem";

import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiGit,
  SiDocker,
  SiVercel,
} from "react-icons/si";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const categories = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Beautiful, responsive user interfaces",
    items: [
      { icon: SiReact, label: "React", color: "text-blue-500" },
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiTailwindcss, label: "Tailwind", color: "text-teal-400" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Robust server-side architecture",
    items: [
      { icon: SiNodedotjs, label: "Node.js", color: "text-green-600" },
      { icon: SiExpress, label: "Express", color: "text-gray-700" },
      { icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Developer workflow & deployment",
    items: [
      { icon: SiGit, label: "Git", color: "text-orange-600" },
      { icon: SiDocker, label: "Docker", color: "text-blue-400" },
      { icon: SiVercel, label: "Vercel" },
    ],
  },
];

export default function TechstackPage() {
  const t = useTranslations("techstack");

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-16"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.7, ease: expo }}
        className="text-center flex flex-col gap-4"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand">
          Stack
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight portfolio-text">
          {t("title")}
        </h1>
        <p className="portfolio-text-muted max-w-2xl mx-auto">
          The modern technologies powering this application
        </p>
      </motion.div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: expo }}
            className="flex flex-col gap-6 rounded-2xl border portfolio-border-brand portfolio-surface p-8"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold portfolio-text">{category.title}</h2>
              <p className="text-sm portfolio-text-muted">{category.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {category.items.map((item) => (
                <TechItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  color={item.color}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
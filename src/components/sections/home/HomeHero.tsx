"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/Button";
import { expo, stagger, fadeUp } from "@/components/sections/home/motion";

export function HomeHero() {
  const t = useTranslations("public.home");
  const router = useRouter();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY        = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const springY      = useSpring(heroContentY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden border-b portfolio-border"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 size-120 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--portfolio-glow) 0%, transparent 70%)",
          y: glowY,
          opacity: glowOpacity,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-5%] top-[20%] size-80 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, var(--portfolio-glow) 0%, transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]),
        }}
      />

      <motion.div
        style={{ y: springY }}
        className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 text-center md:text-left"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: expo }}
            className="text-xs font-semibold tracking-[0.2em] uppercase portfolio-brand"
          >
            {t("hero.badge")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease: expo }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight"
          >
            {t("hero.title.line1")}
            <br />
            <motion.span
              className="portfolio-brand inline-block"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: expo, delay: 0.35 }}
            >
              {t("hero.title.highlight")}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: expo }}
            className="text-base md:text-lg leading-relaxed portfolio-text-muted max-w-md mx-auto md:mx-0"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: expo }}
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <Button text={t("hero.viewProjects")} onClick={() => router.push("/projects")} />
            <Button text={t("hero.contact")}      onClick={() => router.push("/contact")} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 3, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0,  rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: expo, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="w-[min(320px,70vw)] h-[min(320px,70vw)] rounded-2xl overflow-hidden portfolio-border-brand border backdrop-blur-md portfolio-surface">
            <img src="/me.png" alt="Profile photo" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
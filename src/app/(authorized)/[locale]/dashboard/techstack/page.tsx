"use client";

import { useTranslations } from "next-intl";
import { TechItem } from "@/components/TechItem";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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

export default function TechstackPage() {
  const t = useTranslations("techstack");

  return (
    <div className="grid auto-rows-[100vh]">
      
      {/* Header */}
      <section className="grid text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-surface-fg/70 max-w-2xl mx-auto">
            The modern technologies powering this application
          </p>
        </div>
      </section>

      {/* Frontend */}
      <AnimatedSection
        id="frontend"
        className="grid place-items-center text-center px-6"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Frontend</h2>
            <p className="text-surface-fg/60">
              Beautiful, responsive user interfaces
            </p>
          </div>

          <div className="flex flex-wrap  justify-center gap-6 border border-border rounded-md p-6 bg-gradient-primary">
            <TechItem icon={SiReact} label="React" color="text-blue-500" />
            <TechItem icon={SiNextdotjs} label="Next.js" />
            <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-400" />
          </div>
        </div>
      </AnimatedSection>

      {/* Backend */}
      <AnimatedSection
        id="backend"
        className="grid place-items-center text-center px-6"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Backend</h2>
            <p className="text-surface-fg/60">
              Robust server-side architecture
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 border border-border rounded-md p-6 bg-gradient-primary">
            <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-600" />
            <TechItem icon={SiExpress} label="Express" color="text-gray-700" />
            <TechItem icon={SiFirebase} label="Firebase" color="text-yellow-500" />
          </div>
        </div>
      </AnimatedSection>

      {/* Tools */}
      <AnimatedSection
        id="tools"
        className="grid place-items-center text-center px-6"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Tools</h2>
            <p className="text-surface-fg/60">
              Developer workflow & deployment
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 border border-border rounded-md p-6 bg-gradient-primary">
            <TechItem icon={SiGit} label="Git" color="text-orange-600" />
            <TechItem icon={SiDocker} label="Docker" color="text-blue-400" />
            <TechItem icon={SiVercel} label="Vercel" />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

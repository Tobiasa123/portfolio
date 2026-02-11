"use client";

import { useTranslations } from "next-intl";
import { TechItem } from "@/components/TechItem";
import { useEffect, useRef, useState } from "react";
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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const frontendRef = useRef<HTMLElement>(null);
  const backendRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px" // Trigger slightly before element is fully visible
      }
    );

    if (frontendRef.current) observer.observe(frontendRef.current);
    if (backendRef.current) observer.observe(backendRef.current);
    if (toolsRef.current) observer.observe(toolsRef.current);

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="flex flex-col space-y-32 min-h-screen pb-32">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-surface-fg/70 text-center max-w-2xl">
          The modern technologies powering this application
        </p>
      </div>

      {/* Frontend Section */}
      <section
        id="frontend"
        ref={frontendRef}
        className={`
          flex flex-col items-center space-y-8 py-16
          transition-all duration-1000 ease-out
          ${isVisible("frontend") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
          }
        `}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Frontend</h2>
          <p className="text-surface-fg/60">Beautiful, responsive user interfaces</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <TechItem icon={SiReact} label="React" color="text-blue-500" />
          <TechItem icon={SiNextdotjs} label="Next.js" />
          <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-400" />
        </div>
      </section>

      {/* Backend Section */}
      <section
        id="backend"
        ref={backendRef}
        className={`
          flex flex-col items-center space-y-8 py-16
          transition-all duration-1000 ease-out
          ${isVisible("backend") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
          }
        `}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Backend</h2>
          <p className="text-surface-fg/60">Robust server-side architecture</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-600" />
          <TechItem icon={SiExpress} label="Express" color="text-gray-700" />
          <TechItem icon={SiFirebase} label="Firebase" color="text-yellow-500" />
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        ref={toolsRef}
        className={`
          flex flex-col items-center space-y-8 py-16
          transition-all duration-1000 ease-out
          ${isVisible("tools") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
          }
        `}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Tools</h2>
          <p className="text-surface-fg/60">Developer workflow & deployment</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <TechItem icon={SiGit} label="Git" color="text-orange-600" />
          <TechItem icon={SiDocker} label="Docker" color="text-blue-400" />
          <TechItem icon={SiVercel} label="Vercel" />
        </div>
      </section>
    </div>
  );
}
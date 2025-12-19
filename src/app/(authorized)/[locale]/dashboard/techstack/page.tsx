"use client";

import { useTranslations } from "next-intl";
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

export default function TechstackPage() {
  const t = useTranslations("techstack");

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-3xl font-bold text-center">{t("title")}</h1>

      <section className="flex flex-col items-center ">
        <h2 className="mt-4 font-semibold text-center">Frontend</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <TechItem icon={SiReact} label="React" color="text-blue-500" />
          <TechItem icon={SiNextdotjs} label="Next.js" />
          <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-400" />
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h2 className="mt-4 font-semibold text-center">Backend</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-600" />
          <TechItem icon={SiExpress} label="Express" color="text-gray-700" />
          <TechItem icon={SiFirebase} label="Firebase" color="text-yellow-500" />
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h2 className="mt-4 font-semibold text-center">Tools</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <TechItem icon={SiGit} label="Git" color="text-orange-600" />
          <TechItem icon={SiDocker} label="Docker" color="text-blue-400" />
          <TechItem icon={SiVercel} label="Vercel" />
        </div>
      </section>
    </div>
  );
}

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <section>
        <h2 className="mt-4 font-semibold">Frontend</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          <TechItem icon={SiReact} label="React" color="text-blue-500" />
          <TechItem icon={SiNextdotjs} label="Next.js" />
          <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-400" />
        </div>
      </section>

      <section>
        <h2 className="mt-4 font-semibold">Backend</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-600" />
          <TechItem icon={SiExpress} label="Express" color="text-gray-700" />
          <TechItem icon={SiFirebase} label="Firebase" color="text-yellow-500" />
        </div>
      </section>

      <section>
        <h2 className="mt-4 font-semibold">Tools</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          <TechItem icon={SiGit} label="Git" color="text-orange-600" />
          <TechItem icon={SiDocker} label="Docker" color="text-blue-400" />
          <TechItem icon={SiVercel} label="Vercel" />
        </div>
      </section>
    </div>
  );
}

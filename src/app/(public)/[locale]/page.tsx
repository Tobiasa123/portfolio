"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { useRouter } from "@/i18n/routing";
import BlogSection from "@/components/BlogSection";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  const t = useTranslations("public");
  const router = useRouter();

  return (
    <div className="relative h-full flex justify-center items-center bg-gradient-primary">
      
      {/* Shape Divider ill maybe use this in future*/}
      {/* <div className="shape-divider-top">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          />
        </svg>
      </div> */}

      {/* Content */}
        <GlassCard className="relative grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
          <div>
            <BlogSection limit={1} />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-semibold">{t("title")}</h1>

            <Button text={t("login")} onClick={() => router.push("/login")} />
            <Button text={t("guest")} onClick={() => router.push("/")} />
          </div>
        </GlassCard>
    </div>
  );
}

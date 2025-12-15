
//src/app/(public)/[locale]/page.tsx

"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { useRouter } from "@/i18n/routing"; // ← FIXED
import BlogSection from "@/components/BlogSection";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  const t = useTranslations("public");
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-primary">
      <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">

        <GlassCard>
          <BlogSection limit={1} />
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>

          <Button
            text={t("login")}
            onClick={() => router.push("/login")}
          />

          <Button
            text={t("guest")}
            onClick={() => router.push("/")}
          />
        </GlassCard>

      </div>
    </div>
  );
}


// src/app/(authorized)/[locale]/dashboard/page.tsx
"use client";

import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("home"); 

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("welcome")}</h1>
      <p className="mt-2 ">{t("intro")}</p>
    </div>
  );
}

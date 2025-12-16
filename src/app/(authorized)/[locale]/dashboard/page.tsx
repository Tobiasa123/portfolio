
// src/app/(authorized)/[locale]/dashboard/page.tsx
// src/app/(authorized)/[locale]/dashboard/page.tsx
"use client";

import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("sidebar"); // namespace from authorized.json just testing for now

  return (
    <div>
      <h1>Hello, welcome to the dashboard!</h1>
      <p>Translation test: {t("home")}</p>
    </div>
  );
}

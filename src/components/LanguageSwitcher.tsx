//src/components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/Button";

const locales = [
  { code: "en", label: "EN" },
  { code: "sv", label: "SV" }
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {locales.map(({ code, label }) => (
        <Button
          key={code}
          onClick={() => router.replace(pathname, { locale: code })}
          className="px-3 py-1 text-sm"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

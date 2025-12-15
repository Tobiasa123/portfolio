//src/components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const locales = [
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); 
  }, []);


  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!mounted) return null;

  const current = locales.find(l => l.code === locale);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="
          h-9 px-3 rounded-base border border-border
          bg-surface text-surface-fg text-sm
          flex items-center gap-2
          hover:brightness-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-foreground
        "
      >
        {current?.label ?? "Language"}
        <HiChevronDown className="w-4 h-4 opacity-60" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 min-w-[140px]
            rounded-base border border-border
            bg-surface shadow-lg
            overflow-hidden z-50
          "
        >
          {locales.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                router.replace(pathname, { locale: code });
                setOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm
                hover:bg-surface/80
                ${code === locale ? "font-medium" : ""}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

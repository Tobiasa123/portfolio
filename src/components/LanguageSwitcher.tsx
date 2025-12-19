"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiGlobeAlt } from "react-icons/hi";

interface LanguageSwitcherProps {
  small?: boolean; // collapsed sidebar
  fullWidth?: boolean; // expanded sidebar
}

const locales = [
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" },
];

export function LanguageSwitcher({ small = false, fullWidth = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const current = locales.find(l => l.code === locale);

  // sizing classes
  const heightClass = "h-10";
  const widthClass = fullWidth ? "w-full" : small ? "w-10" : "w-32"; // small icon, medium button, full-width optional
  const paddingClass = "px-3";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`
          ${widthClass} ${heightClass} ${paddingClass}
          flex items-center justify-center gap-2
          rounded-base border border-border
          bg-surface text-surface-fg text-sm
          transition-all duration-150
        `}
        aria-label="Change language"
      >
        {/* Icon always visible */}
        <HiGlobeAlt className="w-5 h-5 shrink-0" />

        {/* Label only if not small */}
        {!small && <span className="truncate">{current?.label ?? "Language"}</span>}

        {/* Dropdown arrow only if not small */}
        {!small && <HiChevronDown className="w-4 h-4 opacity-60" />}
      </button>

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

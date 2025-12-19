"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { navItems } from "@/app/config/routes";

interface SidebarNavProps {
  collapsed: boolean;
  role: string;
}

export default function SidebarNav({ role, collapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1 px-2">
      {navItems.map((item) => {
        if (item.role && item.role !== role) return null;

        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={clsx(
              "group relative flex items-center gap-3 rounded-base px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-surface-foreground text-surface border border-border"
                : "text-surface-fg hover:bg-surface-hover"
            )}
          >
            {/* Icon (always visible) */}
            <Icon size={20} className="shrink-0" aria-hidden="true" />

            {/* Label (expanded only) */}
            <span
              className={clsx(
                "truncate transition-all duration-150",
                collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
              )}
            >
              {t(item.key)}
            </span>

            {/* Tooltip (collapsed only, desktop hover) */}
            {collapsed && (
              <span
                className="
                  pointer-events-none absolute left-14 z-50
                  hidden whitespace-nowrap rounded-base
                  bg-surface px-2 py-1 text-xs text-surface-fg
                  shadow-md
                  group-hover:block
                "
              >
                {t(item.key)}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/app/config/routes";

interface SidebarNavProps {
  collapsed: boolean;
  role: string;
}

export default function SidebarNav({ role, collapsed }: SidebarNavProps) {
  const pathname = usePathname();

  const filteredNav = navItems.filter(item => !(item.name === "Admin" && role !== "admin"));

  return (
    <nav className="flex flex-col gap-2 px-2 flex-1 mt-6">
      {filteredNav.map(item => {
        const active = pathname === item.href;
        return (
        <Link
            key={item.href}
            href={item.href}
            className={`
              px-4 py-2 rounded-base
              bg-surface text-surface-fg
              transition-colors duration-200
              ${active 
                ? "bg-surface-foreground text-surface border border-border" 
                : "hover:brightness-90 active:brightness-75"}
            `}
          >
          {collapsed ? item.name[0] : item.name}
        </Link>
        );
      })}
    </nav>
  );
}

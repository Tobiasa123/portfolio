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
    <nav className="flex flex-col gap-2 px-2 flex-1">
      {filteredNav.map(item => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded transition-colors ${
              active ? "bg-background/40" : "hover:bg-background/20"
            }`}
          >
            {collapsed ? item.name[0] : item.name}
          </Link>
        );
      })}
    </nav>
  );
}

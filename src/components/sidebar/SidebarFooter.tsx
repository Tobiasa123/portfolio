"use client";

import ThemeToggle from "../ThemeToggle";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface SidebarFooterProps {
  collapsed: boolean;
}

export default function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div className="flex flex-col gap-3 mt-auto p-4">
      <LanguageSwitcher small={collapsed} fullWidth={!collapsed} />
    </div>
  );
}
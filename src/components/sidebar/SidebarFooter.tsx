"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Button } from "../Button";
import { FiPower } from "react-icons/fi";

interface SidebarFooterProps {
  collapsed: boolean;
}

export default function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-3 mt-auto p-4">
      <LanguageSwitcher small={collapsed} fullWidth={!collapsed} />
      <ThemeToggle small={collapsed} fullWidth={!collapsed} />
      
      <Button
        onClick={logout}
        className={`
          flex items-center justify-center gap-2
          ${collapsed ? "w-10 h-10" : "w-full h-10"} 
        `}
        aria-label="Logout"
      >
        <FiPower className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="leading-none">Logout</span>}
      </Button>
    </div>
  );
}

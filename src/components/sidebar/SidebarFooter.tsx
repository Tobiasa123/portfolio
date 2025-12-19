"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Button } from "../Button";

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
      <LanguageSwitcher />
      <ThemeToggle small={collapsed} />
      <Button
        onClick={logout}
        className="px-3 py-2 text-white hover:cursor-pointer border border-border rounded"
      >
        {collapsed ? "⏻" : "Logout"}
      </Button>
    </div>
  );
}

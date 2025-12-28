"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
//import ThemeToggle from "../ThemeToggle";
//import { LanguageSwitcher } from "../LanguageSwitcher";
import { FiPower } from "react-icons/fi";

interface SidebarFooterProps {
  collapsed: boolean;
}

export default function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const t = useTranslations("public.header");
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-3 mt-auto p-4">
      {/* <LanguageSwitcher small={collapsed} fullWidth={!collapsed} /> */}

      {/* Logout button with centered text */}
      <Button
        onClick={logout}
        className="flex items-center justify-center gap-2 w-full"
      >
        <FiPower className="w-4 h-4" />
        {t("logout")}
      </Button>
    </div>
  );
}

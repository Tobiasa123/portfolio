"use client";

import ThemeToggle from "../ThemeToggle";
import { useRouter } from "next/navigation";

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
      <ThemeToggle small={collapsed} />
      {!collapsed && (
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </div>
  );
}

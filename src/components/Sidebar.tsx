"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Lorem", href: "/dashboard/lorem" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen p-4 flex flex-col justify-between bg-bg text-fg">
      <div>
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md ${
                  active
                    ? "bg-bg/50" // slight overlay for active
                    : "hover:bg-bg/20"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

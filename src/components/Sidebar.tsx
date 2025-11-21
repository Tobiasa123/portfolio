"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button";

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
    <aside className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md transition ${
                  active ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <Button text="Logout" onClick={handleLogout} />
    </aside>
  );
}

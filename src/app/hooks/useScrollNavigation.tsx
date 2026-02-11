"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/app/config/routes";

export function useScrollNavigation(role: string) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const filteredItems = navItems.filter(item => !item.role || item.role === role);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const getCurrentIndex = () => {
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
      
      return filteredItems.findIndex(item => {
        // Exact match /dashboard
        if (item.href === "/dashboard") {
          return pathWithoutLocale === "/dashboard";
        }
    
        return pathWithoutLocale.startsWith(item.href);
      });
    };

    const onNavigate = (direction: 1 | -1) => {
      if (scrollTimeout.current) return;

      const index = getCurrentIndex();
      if (index === -1) return;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= filteredItems.length) return;

      router.push(filteredItems[newIndex].href);

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 500);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) onNavigate(1);
      else if (e.deltaY < 0) onNavigate(-1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        onNavigate(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        onNavigate(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname, filteredItems, router]);
}
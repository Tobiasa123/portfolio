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

    // -----------------------------
    // SCROLL LOGIC (COMMENTED OUT)
    // -----------------------------

    /*
    const getScrollContainer = () => {
      return document.querySelector('main.overflow-auto') as HTMLElement;
    };

    const isAtTop = () => {
      const container = getScrollContainer();
      return container ? container.scrollTop <= 10 : window.scrollY <= 10;
    };

    const isAtBottom = () => {
      const container = getScrollContainer();
      if (container) {
        return container.scrollHeight - container.scrollTop - container.clientHeight <= 10;
      }
      return document.documentElement.scrollHeight - window.scrollY - window.innerHeight <= 10;
    };

    const isScrollingInWidget = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;

      const scrollableParent = (target as Element).closest('.overflow-y-auto, .overflow-auto');
      if (scrollableParent) {
        const mainContainer = getScrollContainer();
        return scrollableParent !== mainContainer;
      }

      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (isScrollingInWidget(e.target)) return;

      if (e.deltaY > 0 && isAtBottom()) {
        e.preventDefault();
        onNavigate(1);
      } else if (e.deltaY < 0 && isAtTop()) {
        e.preventDefault();
        onNavigate(-1);
      }
    };
    */

    // -----------------------------
    // KEYBOARD NAVIGATION (ACTIVE)
    // -----------------------------

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        onNavigate(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        onNavigate(-1);
      }
    };

    // window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      // window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname, filteredItems, router]);
}

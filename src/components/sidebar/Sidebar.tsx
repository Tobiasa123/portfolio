"use client";

import { useState, useEffect, useRef } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import SidebarToggleButton from "./SidebarToggleButton";

interface SidebarProps {
  role: string;
}

const MOBILE_BREAKPOINT = 640;

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setCollapsed(isMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !collapsed) {
        setCollapsed(true);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [collapsed]);

  useEffect(() => {
    if (!collapsed && window.innerWidth < MOBILE_BREAKPOINT) {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const focusableElements = sidebar.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      sidebar.addEventListener("keydown", handleTab as any);
      firstElement?.focus();

      return () => sidebar.removeEventListener("keydown", handleTab as any);
    }
  }, [collapsed]);

  const handleToggle = () => setCollapsed(!collapsed);

  return (
    <>
      {/* Floating toggle button (shows when collapsed) */}
      {collapsed && (
        <SidebarToggleButton
          collapsed={collapsed}
          onClick={handleToggle}
          aria-label="Open sidebar"
        />
      )}

      {/* Mobile overlay backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity duration-200"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar wrapper - reserves space on desktop */}
      <div className={`${collapsed ? "" : "sm:w-64"} transition-all duration-200`} aria-label="Sidebar container">
        <aside
          ref={sidebarRef}
          className={`
            flex flex-col h-screen w-64 bg-surface border-r border-border
            transition-transform duration-200 ease-in-out z-50
            fixed top-0 left-0
            ${collapsed ? "-translate-x-64" : "translate-x-0"}
          `}
          aria-label="Main navigation sidebar"
          aria-hidden={collapsed}
        >
          <SidebarHeader collapsed={collapsed} onToggle={handleToggle} />
          <SidebarNav collapsed={collapsed} role={role} />
          <SidebarFooter collapsed={collapsed} />
        </aside>
      </div>
    </>
  );
}

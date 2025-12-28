"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import SidebarNav from "./SidebarNav";
import SidebarToggleButton from "./SidebarToggleButton";
import SidebarHeader from "./SidebarHeader"; 
import SidebarFooter from "./SidebarFooter";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface SidebarProps {
  role: string;
}

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export default function Sidebar({ role }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile(); // ✅ detect mobile

  const [collapsed, setCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCollapsed(isMobile);
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [isMobile]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isMobile && !collapsed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, collapsed, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && !collapsed) setCollapsed(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, collapsed, mounted]);

  const handleToggle = useCallback(() => setCollapsed(v => !v), []);

  const isExpanded = isMobile ? !collapsed : isHovered;

  if (!mounted) return null;

  return (
    <>
      {isMobile && collapsed && <SidebarToggleButton collapsed onClick={handleToggle} />}
      {isMobile && !collapsed && <div className="fixed inset-0 z-40 bg-black/50" onClick={handleToggle} />}

      <motion.aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Main navigation"
        initial={false}
        className={`
          flex flex-col overflow-hidden border-r border-border bg-surface pointer-events-auto
          ${isMobile ? "fixed left-0 top-0 z-50 h-screen" : "absolute left-0 top-0 h-full z-30"}
        `}
        onMouseEnter={e => { if (canHover && e.clientX <= SIDEBAR_COLLAPSED_WIDTH + 16) setIsHovered(true); }}
        onMouseLeave={() => { if (canHover) setIsHovered(false); }}
        animate={{
          width: isMobile ? SIDEBAR_WIDTH : isExpanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          x: isMobile && collapsed ? -SIDEBAR_WIDTH : 0,
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        {isMobile && <SidebarHeader collapsed={!isExpanded} onToggle={handleToggle} isMobile={isMobile} />}
        <SidebarNav collapsed={!isExpanded} role={role} />
        {isMobile && <SidebarFooter collapsed={!isExpanded} />}
      </motion.aside>
    </>
  );
}

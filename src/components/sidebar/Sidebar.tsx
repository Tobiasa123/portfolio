"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import SidebarToggleButton from "./SidebarToggleButton";

interface SidebarProps {
  role: string;
}

const MOBILE_BREAKPOINT = 1024;
const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export default function Sidebar({ role }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  const [collapsed, setCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateEnv = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setCollapsed(mobile);

      setCanHover(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      );
    };

    updateEnv();
    window.addEventListener("resize", updateEnv);
    return () => window.removeEventListener("resize", updateEnv);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow =
      isMobile && !collapsed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, collapsed, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, collapsed, mounted]);

  const handleToggle = useCallback(() => {
    setCollapsed((v) => !v);
  }, []);

  const isExpanded = isMobile ? !collapsed : isHovered;

  if (!mounted) return null;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && collapsed && (
        <SidebarToggleButton collapsed onClick={handleToggle} />
      )}

      {/* Mobile backdrop */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Main navigation"
        initial={false}
        className={`
          flex flex-col overflow-hidden border-r border-border bg-surface pointer-events-auto
          ${isMobile
            ? "fixed left-0 top-0 z-50 h-screen"
            : "absolute left-0 top-0 h-full z-30"}
        `}
        onMouseEnter={(e) => {
          if (!canHover) return;
          if (e.clientX <= SIDEBAR_COLLAPSED_WIDTH + 16) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (canHover) setIsHovered(false);
        }}
        animate={{
          width: isMobile
            ? SIDEBAR_WIDTH
            : isExpanded
            ? SIDEBAR_WIDTH
            : SIDEBAR_COLLAPSED_WIDTH,
          x: isMobile && collapsed ? -SIDEBAR_WIDTH : 0,
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <SidebarHeader
          collapsed={!isExpanded}
          onToggle={handleToggle}
          isMobile={isMobile}
        />
        <SidebarNav collapsed={!isExpanded} role={role} />
        <SidebarFooter collapsed={!isExpanded} />
      </motion.aside>
    </>
  );
}
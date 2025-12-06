"use client";

import { useState, useEffect, useRef } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import SidebarToggleButton from "./SidebarToggleButton";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const userToggledRef = useRef(false);


  useEffect(() => {
    const isDesktop = window.innerWidth >= 640;
    setCollapsed(!isDesktop);
  }, []);

  const handleToggle = (newState: boolean) => {
    userToggledRef.current = true; // Mark as user-controlled
    setCollapsed(newState);
  };

  return (
    <>
      {/* Floating toggle button - always shows when collapsed */}
      {collapsed && (
        <SidebarToggleButton
          collapsed={collapsed}
          onClick={() => handleToggle(false)}
        />
      )}

      {/* Backdrop for mobile only */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
          onClick={() => handleToggle(true)}
        />
      )}

      {/* Sidebar wrapper - conditionally reserves space on desktop */}
      <div className={`${collapsed ? "" : "sm:w-64"} transition-all`}>
        <aside
          className={`
            flex flex-col h-screen w-64 bg-surface border-r border-border
            transition-transform duration-200 ease-in-out z-50
            
            fixed top-0 left-0
            ${collapsed ? "-translate-x-64" : "translate-x-0"}
          `}
        >
          <SidebarHeader
            collapsed={false}
            onToggle={() => handleToggle(true)}
          />
          <SidebarNav collapsed={false} role={role} />
          <SidebarFooter collapsed={false} />
        </aside>
      </div>
    </>
  );
}
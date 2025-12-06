"use client";

import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import SidebarToggleButton from "./SidebarToggleButton";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {/* Floating toggle button - always shows when collapsed */}
      {collapsed && (
        <SidebarToggleButton
          collapsed={collapsed}
          onClick={() => setCollapsed(false)}
        />
      )}

      {/* Backdrop for mobile only */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity duration-300"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar wrapper - conditionally reserves space on desktop */}
      <div className={`${collapsed ? "" : "sm:w-64"} transition-all duration-300`}>
        <aside
          className={`
            flex flex-col h-screen w-64 bg-surface border-r border-border
            transition-transform duration-300 ease-in-out z-50
            
            fixed top-0 left-0
            ${collapsed ? "-translate-x-64" : "translate-x-0"}
          `}
        >
          <SidebarHeader
            collapsed={false}
            onToggle={() => setCollapsed(true)}
          />
          <SidebarNav collapsed={false} role={role} />
          <SidebarFooter collapsed={false} />
        </aside>
      </div>
    </>
  );
}
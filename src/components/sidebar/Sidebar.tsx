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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Floating toggle button when sidebar is hidden */}
      {collapsed && (
        <SidebarToggleButton
          collapsed={collapsed}
          onClick={() => setCollapsed(false)}
        />
      )}

      {/* Sidebar slides in/out */}
      <aside
        className={`
          flex flex-col h-screen w-64 bg-surface border-r border-border
          transform transition-transform duration-300
          ${collapsed ? "-translate-x-64" : "translate-x-0"}
        `}
      >
        <SidebarHeader collapsed={collapsed} onToggle={() => setCollapsed(true)} />
        <SidebarNav collapsed={collapsed} role={role} />
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}

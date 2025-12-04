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
      {collapsed && <SidebarToggleButton collapsed={collapsed} onClick={() => setCollapsed(false)} />}

      {/* Full sidebar */}
      <aside
        className={`${
          collapsed ? "hidden" : "flex"
        } flex-col bg-surface border-r border-border h-screen w-64 transition-all`}
      >
        <SidebarHeader collapsed={collapsed} onToggle={() => setCollapsed(true)} />
        <SidebarNav collapsed={collapsed} role={role} />
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}

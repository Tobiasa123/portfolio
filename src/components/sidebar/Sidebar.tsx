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
      {/* Floating toggle button when sidebar is fully hidden */}
      {collapsed && <SidebarToggleButton collapsed={collapsed} onClick={() => setCollapsed(c => !c)} />
}

      {/* Main sidebar */}
      <aside
        className={`flex flex-col bg-surface border-r border-border h-screen transition-all ${
          collapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        }`}
      >
        <SidebarHeader collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <SidebarNav collapsed={collapsed} role={role} />
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}

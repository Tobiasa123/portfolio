"use client";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarHeader({ collapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
      <button
        onClick={onToggle}
        className="p-2 rounded hover:bg-gray-200 transition"
        aria-label="Toggle sidebar"
      >
        {collapsed ? "→" : "←"}
      </button>
    </div>
  );
}

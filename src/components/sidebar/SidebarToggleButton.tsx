"use client";

interface SidebarToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

export default function SidebarToggleButton({ collapsed, onClick }: SidebarToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-4 left-4 z-50 p-2 rounded bg-gray-300 hover:bg-gray-400 shadow transition-transform ${
        collapsed ? "" : "translate-x-0"
      }`}
      aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
    >
      {collapsed ? "→" : "←"}
    </button>
  );
}

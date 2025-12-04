"use client";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarHeader({ onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button
        onClick={onToggle}
        className="p-2 rounded hover:bg-gray-200 transition"
      >
        ←
      </button>
    </div>
  );
}

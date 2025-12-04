"use client";

import { Button } from "../Button";

interface SidebarToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

export default function SidebarToggleButton({ collapsed, onClick }: SidebarToggleButtonProps) {
  return (
    <Button
      onClick={onClick}
      text={collapsed ? "→" : "←"}
      className="fixed top-4 left-4 z-50 p-2 rounded bg-gray-300 hover:bg-gray-400 shadow transition-all"
    />
  );
}

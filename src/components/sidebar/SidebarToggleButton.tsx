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
      className="fixed top-4 left-4 z-50 p-2 rounded bg-surface text-surface-fg hover:bg-surface-hover"
    />
  );
}

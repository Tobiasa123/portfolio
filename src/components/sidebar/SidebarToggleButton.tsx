"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "../Button";

interface SidebarToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

export default function SidebarToggleButton({ collapsed, onClick }: SidebarToggleButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 p-2 rounded bg-surface text-surface-fg hover:bg-surface-hover transition-colors"
      aria-label={collapsed ? "Open menu" : "Close menu"}
    >
      {collapsed ? (
        <HiMenuAlt2 className="w-6 h-6" />
      ) : (
        <IoMdArrowBack className="w-6 h-6" />
      )}
    </Button>
  );
}
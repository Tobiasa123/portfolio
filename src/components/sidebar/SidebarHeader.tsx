"use client";

import { Button } from "../Button";
import clsx from "clsx";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export default function SidebarHeader({ collapsed, onToggle, isMobile }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <h1
        className={clsx(
          "text-xl font-bold truncate transition-all duration-150",
          collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
        )}
      >
        Dashboard
      </h1>

      {/* Mobile-only close button */}
      {isMobile && (
        <Button
          onClick={onToggle}
          text="←"
          aria-label="Close sidebar"
          className="flex items-center justify-center"
        />
      )}
    </div>
  );
}

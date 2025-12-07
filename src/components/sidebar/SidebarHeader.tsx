"use client";

import { Button } from "../Button";
interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}


export default function SidebarHeader({ onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Button
        onClick={onToggle}
        text="←"
        className="flex items-center justify-center"
        aria-label="Toggle sidebar"
      />
    </div>
  );
}

"use client";

import { IconType } from "react-icons";
import { GlassCard } from "./ui/GlassCard";

interface TechItemProps {
  icon: IconType;
  label: string;
  color?: string; 
  iconSize?: number; 
}

export function TechItem({ icon: Icon, label, color, iconSize = 24 }: TechItemProps) {
  return (
    <GlassCard className="p-2 w-44">
      <div className="flex items-center justify-center gap-2">
        <Icon size={iconSize} className={color ?? "text-current"} />
        <span>{label}</span>
      </div>
    </GlassCard>
  );
}

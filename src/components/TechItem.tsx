"use client";

import { IconType } from "react-icons";
import { Card } from "./ui/Card";

interface TechItemProps {
  icon: IconType;
  label: string;
  color?: string; 
  iconSize?: number; 
}

export function TechItem({ icon: Icon, label, color, iconSize = 24 }: TechItemProps) {
  return (
    <Card className="p-4 w-44">
      <div className="flex items-center justify-center gap-2">
        <Icon size={iconSize} className={color ?? "text-current"} />
        <span>{label}</span>
      </div>
    </Card>
  );
}
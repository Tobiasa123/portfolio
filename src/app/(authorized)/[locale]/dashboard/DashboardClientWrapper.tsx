"use client";

import { useScrollNavigation } from "@/app/hooks/useScrollNavigation";

interface DashboardClientWrapperProps {
  role: string;
  children: React.ReactNode;
}

export default function DashboardClientWrapper({ role, children }: DashboardClientWrapperProps) {
  useScrollNavigation(role); 

  return <>{children}</>; 
}

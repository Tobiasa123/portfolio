"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  small?: boolean;
}

export default function ThemeToggle({ small = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
        rounded-base border border-border transition-all
        ${small ? "p-1 text-sm" : "p-2 text-base"}
        bg-surface text-surface-fg
      `}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}

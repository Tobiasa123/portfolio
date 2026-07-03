"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeToggleProps {
  small?: boolean;    // for collapsed sidebar
  fullWidth?: boolean; // for full width button
}

export default function ThemeToggle({ small = false, fullWidth = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Height is always fixed
  const heightClass = "h-10"; // 2.5rem
  // Width: fullWidth overrides small
  const widthClass = fullWidth ? "w-full" : small ? "w-10" : "w-14";
  const paddingClass = "p-2";

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
        ${widthClass} ${heightClass} ${paddingClass}
        flex items-center justify-center
        rounded-base border portfolio-border-brand
        portfolio-surface portfolio-text
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--portfolio-brand-muted)/0.5)]
      `}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
}
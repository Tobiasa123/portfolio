
// src/app/public/layout.tsx
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { PublicHeader } from "@/components/PublicHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PublicHeader />
      {children}
    </ThemeProvider>
  );
}

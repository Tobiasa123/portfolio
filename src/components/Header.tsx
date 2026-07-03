"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { FiPower } from "react-icons/fi";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface HeaderProps {
  user?: { uid: string; role?: string } | null;
}

export function Header({ user }: HeaderProps) {
  const t = useTranslations("public.header");
  const router = useRouter();
  const isMobile = useIsMobile();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Public header (no user)
  if (!user) {
    return (
      // Public header (no user)
      <header className="fixed top-0 left-0 right-0 z-50 border-b portfolio-border portfolio-base p-4">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-lg font-semibold portfolio-text">
            {t("logo")}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/login">
              <Button>{t("login")}</Button>
            </Link>
          </div>
        </div>

        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
          <Link
            href="/blog"
            className="portfolio-text-muted hover:portfolio-brand transition-colors"
          >
            {t("blog")}
          </Link>
          <Link
            href="/docs"
            className="portfolio-text-muted hover:portfolio-brand transition-colors"
          >
            {t("docs")}
          </Link>
        </nav>
      </header>
    );
  }

  // Logged-in header
  return (
    <header className="relative w-full border-b portfolio-border portfolio-base p-4">
      <div className="flex items-center justify-between h-full">
        <div className="shrink-0">
          {!isMobile ? (
            <Link href="/dashboard" className="text-lg font-semibold portfolio-text">
              {t("logo")}
            </Link>
          ) : (
            <div className="w-16 h-0" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          {!isMobile && (
            <Button onClick={logout} className="flex items-center gap-2">
              <FiPower className="w-4 h-4" />
              {t("logout")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
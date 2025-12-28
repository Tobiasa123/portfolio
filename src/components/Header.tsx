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

  return (
    <header className="relative w-full border-b border-border bg-bg p-2">
      <div className="flex items-center justify-between h-full">
        <Link href={user ? "/dashboard" : "/"} className="text-lg font-semibold">
          {t("logo")}
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Only show logout on desktop */}
          {user && !isMobile && (
            <Button onClick={logout} className="flex items-center gap-2">
              <FiPower className="w-4 h-4" />
              {t("logout")}
            </Button>
          )}
          {!user && (
            <Link href="/login">
              <Button>{t("login")}</Button>
            </Link>
          )}
        </div>
      </div>

      {!user && (
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
          <Link href="/blog" className="hover:underline">{t("blog")}</Link>
          <Link href="/docs" className="hover:underline">{t("docs")}</Link>
        </nav>
      )}
    </header>
  );
}

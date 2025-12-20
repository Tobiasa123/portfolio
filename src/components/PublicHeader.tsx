"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function PublicHeader() {
  const t = useTranslations("public");

  return (
    <header className="w-full shrink-0 border-b border-border bg-bg z-30">
      <div className="mx-auto max-w-6xl grid grid-cols-3 items-center gap-6 py-2 px-4">
        
        {/* Logo */}
        <div className="col-start-1">
          <Link href="/" className="text-lg font-semibold">
            {t("logo")}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="col-start-2 justify-self-center flex gap-6">
          <Link href="/blog" className="text-sm hover:underline">
            {t("blog")}
          </Link>
          <Link href="/docs" className="text-sm hover:underline">
            {t("docs")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="col-start-3 justify-self-end flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login">
            <Button>{t("login")}</Button>
          </Link>
        </div>

      </div>
    </header>
  );
}

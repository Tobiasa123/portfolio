"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function PublicHeader() {
  const t = useTranslations("public"); // matches your JSON key

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border bg-bg">
      <div className="mx-auto max-w-6xl grid grid-cols-3 items-center gap-6 px-6 py-3">

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
          <Link href="/register">
            <Button>{t("signup")}</Button>
          </Link>
        </div>

      </div>
    </header>
  );
}

"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border bg-bg">
      <div className="mx-auto max-w-6xl grid grid-cols-3 items-center gap-6 px-6 py-3">

        {/* Logo */}
        <div className="col-start-1">
          <Link href="/" className="text-lg font-semibold">
            logo maybe
          </Link>
        </div>

        {/* Navigation */}
        <nav className="col-start-2 justify-self-center flex gap-6">
          <Link href="/blog" className="text-sm hover:underline">
            Blog
          </Link>
          <Link href="/docs" className="text-sm hover:underline">
            Docs
          </Link>
        </nav>

        {/* Actions */}
        <div className="col-start-3 justify-self-end flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login">
            <Button>Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Sign up</Button>
          </Link>
        </div>

      </div>
    </header>
  );
}

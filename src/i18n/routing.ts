// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true 
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
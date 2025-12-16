// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !['en', 'sv'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}/public.json`)).default
  };
});

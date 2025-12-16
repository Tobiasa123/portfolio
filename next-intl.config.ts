// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !['en', 'sv'].includes(locale)) {
    locale = 'en';
  }

  const publicMessages = (
    await import(`./src/messages/${locale}/public.json`)
  ).default;

  const authorizedMessages = (
    await import(`./src/messages/${locale}/authorized.json`)
  ).default;

  return {
    locale,
    messages: {
      ...publicMessages,
      ...authorizedMessages
    }
  };
});

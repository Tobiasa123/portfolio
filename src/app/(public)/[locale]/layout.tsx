// src/app/(public)/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PublicHeader } from '@/components/PublicHeader';
import '../../globals.css';

interface PublicLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}

export default async function PublicLayout({ 
  children, 
  params 
}: PublicLayoutProps) {
  const { locale } = await params; 
  const messages = await getMessages({ locale }); 

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PublicHeader />
      {children}
    </NextIntlClientProvider>
  );
}
// src/app/(public)/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/Header';
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
      <div className="h-screen flex flex-col bg-bg text-fg">
        <Header />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
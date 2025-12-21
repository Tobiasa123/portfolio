import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/Header';
import { requireAuth } from '@/lib/auth';
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
  const user = await requireAuth();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="h-screen flex flex-col bg-bg text-fg">
        <Header user={user} />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
// src/app/(authorized)/[locale]/dashboard/layout.tsx
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatLauncher from "@/components/ChatLauncher"; // use launcher
import { requireAuth } from "@/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import '../../../globals.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params; 
  const messages = await getMessages({ locale }); // loads public + authorized messages

  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";
  const isAdmin = role === "admin";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="grid grid-cols-[auto_1fr] h-screen bg-pink-00 text-fg">
        <Sidebar role={role} />
        <main className="w-full max-w-6xl mx-auto my-6 p-6 border border-border rounded-md  relative">
          {children}

          {/* only show chat for non-admins via launcher */}
          {!isAdmin && <ChatLauncher userId={user.uid} />}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}

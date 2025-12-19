import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatLauncher from "@/components/ChatLauncher";
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
  const messages = await getMessages({ locale });
  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";
  const isAdmin = role === "admin";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex h-screen bg-bg text-fg">
        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main content centered */}
        <main className="flex justify-center w-full overflow-auto p-4">
          <div className="w-full max-w-6xl my-6 p-6 border border-border rounded-md relative">
            {children}
            {!isAdmin && <ChatLauncher userId={user.uid} />}
          </div>
        </main>
      </div>
    </NextIntlClientProvider>
  );
}

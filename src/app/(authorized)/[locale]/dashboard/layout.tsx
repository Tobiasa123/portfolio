import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatLauncher from "@/components/ChatLauncher";
import { requireAuth } from "@/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../../globals.css";
import { Header } from "@/components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";
  const isAdmin = role === "admin";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Page root */}
      <div className="h-screen flex flex-col bg-bg text-fg">

        {/* Header row (always above sidebar) */}
        <Header />

        {/* Main row */}
        <div className="flex flex-1 overflow-hidden">

          {/* Reserved sidebar space - maintains constant width */}
          <div className="relative h-full shrink-0 w-16 lg:block hidden">
            <Sidebar role={role} />
          </div>

          {/* Mobile sidebar (outside reserved space) */}
          <div className="lg:hidden">
            <Sidebar role={role} />
          </div>

          {/* Content column -  stable width */}
          <main className="flex-1 overflow-auto p-4 flex justify-center">
            <div className="w-full max-w-6xl my-6 p-6 border border-border rounded-md relative">
              {children}
              {!isAdmin && <ChatLauncher userId={user.uid} />}
            </div>
          </main>

        </div>
      </div>
    </NextIntlClientProvider>
  );
}
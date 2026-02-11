import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatLauncher from "@/components/ChatLauncher";
import { requireAuth } from "@/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../../globals.css";
import { Header } from "@/components/Header";
import DashboardClientWrapper from "./DashboardClientWrapper";

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
      <div className="h-screen flex flex-col bg-bg text-fg">
        <Header user={user} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar already rendered in layout */}
          <div className="relative h-full shrink-0 w-16 lg:block hidden">
            <Sidebar role={role} />
          </div>

          <div className="lg:hidden">
            <Sidebar role={role} />
          </div>

          {/* Client wrapper enables scroll navigation */}
          <DashboardClientWrapper role={role}>
            <main className="flex-1 overflow-auto p-4 flex justify-center">
              <div className="w-full max-w-6xl my-6 p-6 border border-border rounded-md relative">
                {children}
                {!isAdmin && <ChatLauncher userId={user.uid} />}
              </div>
            </main>
          </DashboardClientWrapper>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

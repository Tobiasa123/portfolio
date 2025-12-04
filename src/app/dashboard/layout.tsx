import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";

  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

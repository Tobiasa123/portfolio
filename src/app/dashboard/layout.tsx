import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";

  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

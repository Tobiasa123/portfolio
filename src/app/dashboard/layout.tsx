import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  if (!user) redirect("/login");

  const role = user.role ?? user.claims?.role ?? "user";

return (
    <div className="grid grid-cols-[auto_1fr] h-screen bg-bg text-fg">
      <Sidebar role={role} />
      <main className="w-full max-w-6xl mx-auto my-6 p-6 border border-border rounded-md bg-surface">
        {children}
      </main>
    </div>
  );
}

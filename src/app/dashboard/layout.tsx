// src/app/dashboard/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { adminAuth } from "@/lib/firebaseAdmin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) {
    redirect("/login");
  }

  // Decode session cookie to get role
  let role = "user";
  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    role = decoded.role || "user";
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

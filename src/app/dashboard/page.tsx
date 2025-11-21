// src/app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebaseAdmin";

export default async function DashboardPage() {
  const cookieStore = await cookies(); 
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) {
    redirect("/login"); 
  }

  const user = await adminAuth.verifySessionCookie(sessionCookie);
  const email = user.email;

  return <div>Hello {email}, welcome to the dashboard!</div>;
}

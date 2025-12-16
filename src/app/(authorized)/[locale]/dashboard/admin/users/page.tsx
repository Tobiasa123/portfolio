//src/app/dashboard/admin/users/page.tsx

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const user = await requireRole("admin");

  if (!user) {
    redirect("/404"); 
  }

  return <UsersClient />;
}

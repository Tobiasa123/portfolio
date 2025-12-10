//src/app/dashboard/admin/page.tsx

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminPage() {
  const user = await requireRole("admin");

  if (!user) {
    redirect("/404"); 
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex flex-col gap-4">
        <Link href="/dashboard/admin/users">
          <Button>Manage Users</Button>
        </Link>

        <Link href="/dashboard/admin/blog">
          <Button>Manage Blog</Button>
        </Link>

        {/* Add Chat button */}
        <Link href="/dashboard/admin/chats">
          <Button>View Chats</Button>
        </Link>
      </div>
    </div>
  );
}

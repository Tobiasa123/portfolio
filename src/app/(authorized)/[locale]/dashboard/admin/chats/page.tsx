//src/app/dashboard/admin/chats/page.tsx

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import ChatsClient from "./ChatsClient";

export default async function ChatsPage() {
  const user = await requireRole("admin");

  if (!user) {
    redirect("/404");
  }

  return <ChatsClient />;
}

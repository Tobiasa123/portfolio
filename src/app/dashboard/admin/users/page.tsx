import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import UsersClient from "./UsersClient";

export default async function Page() {
  const user = await requireRole("admin");

  if (!user) {
    redirect("/404"); // redirect if not authorized
  }

  return <UsersClient />;
}

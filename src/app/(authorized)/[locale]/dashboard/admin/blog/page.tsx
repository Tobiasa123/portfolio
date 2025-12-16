import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import BlogClient from "./BlogClient";

export default async function Page() {
  const user = await requireRole("admin");

  if (!user) {
    redirect("/404");
  }

  return <BlogClient />;
}

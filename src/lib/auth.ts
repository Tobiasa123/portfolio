// src/lib/auth.ts
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function requireAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get("__session")?.value;
    if (!session) return null;

  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    return null;
  }
}

export async function requireRole(required: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;
  if (!session) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    const role = decoded.role ?? decoded.claims?.role;
    if (role !== required) return null;
    return decoded; // includes uid, email, role
  } catch {
    return null;
  }
}

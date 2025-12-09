//src/app/api/admin/users/suspend/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { requireRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const decoded = await requireRole("admin");
    if (!decoded) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });

    // Disable login
    await adminAuth.updateUser(uid, { disabled: true });

    // Add suspended claim
    await adminAuth.setCustomUserClaims(uid, { role: "user", suspended: true });

    // Update Firestore
    await adminDb.collection("users").doc(uid).update({ status: "suspended" });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

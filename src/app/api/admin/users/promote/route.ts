//src/app/api/admin/promote/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { requireRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const decoded = await requireRole("admin");
    if (!decoded) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });

    // Add admin claim
    await adminAuth.setCustomUserClaims(uid, { role: "admin" });

    // Update Firestore
    await adminDb.collection("users").doc(uid).update({ role: "admin" });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

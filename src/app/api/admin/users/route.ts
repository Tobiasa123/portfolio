// src/app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split("__session=")?.[1];

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch users from Firestore
    const snapshot = await adminDb.collection("users").get();

    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        email: data.email,
        role: data.role || "user",
        createdAt: data.createdAt?.toDate?.() || null,
      };
    });

    return NextResponse.json(users);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

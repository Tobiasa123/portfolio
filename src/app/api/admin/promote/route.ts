import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split("__session=")?.[1];

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Only admins can promote others
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { uid } = await req.json();
    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    // Add admin claim
    await adminAuth.setCustomUserClaims(uid, { role: "admin" });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

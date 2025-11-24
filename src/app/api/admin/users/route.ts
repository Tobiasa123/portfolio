//src/app/api/admin/users/route.ts

import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

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

    const list = await adminAuth.listUsers();
    const users = list.users.map(u => ({
      uid: u.uid,
      email: u.email,
      createdAt: u.metadata.creationTime,
    }));

    return NextResponse.json(users);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// src/app/api/auth/oauth/register/route.ts

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { uid, email } = await req.json();

  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    await userRef.set({
      email,
      role: "user",
      createdAt: new Date(),
    });
  }

  return NextResponse.json({ message: "User created/verified" }, { status: 200 });
}

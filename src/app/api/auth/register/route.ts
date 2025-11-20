//src/app/api/auth/register/route.ts§

import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { registerUserSchema } from "@/schemas/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerUserSchema.parse(body);

    // Create Firebase Auth user
    const user = await adminAuth.createUser({
      email: parsed.email,
      password: parsed.password,
    });

    // Create Firestore document
    await adminDb.collection("users").doc(user.uid).set({
      email: parsed.email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User registered", uid: user.uid },
      { status: 201 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Registration failed" },
      { status: 400 }
    );
  }
}

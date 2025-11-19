// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { registerUserSchema } from "@/schemas/user";

export async function POST(request: Request) {
  const body = await request.json();

  // Validate input using Zod
  const parseResult = registerUserSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parseResult.error.format() },
      { status: 400 }
    );
  }

  const { email, password } = parseResult.data;

  try {
    const user = await adminAuth.createUser({ email, password });

    return NextResponse.json(
      { message: "User registered successfully", uid: user.uid },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

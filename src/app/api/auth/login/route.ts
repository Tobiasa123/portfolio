import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }

    // Decode the ID token to read custom claims
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    console.log("USER UID:", decodedToken.uid);
    console.log("USER ROLE:", decodedToken.role || decodedToken.claims?.role);

    // Create a session cookie (valid for 5 days)
    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set cookie in response
    const response = NextResponse.json(
      { message: "Logged in successfully", role: decodedToken.role || decodedToken.claims?.role },
      { status: 200 }
    );

    response.cookies.set({
      name: "__session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 400 });
  }
}

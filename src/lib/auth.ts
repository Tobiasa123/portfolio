// src/lib/auth.ts
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import type { DecodedIdToken } from "firebase-admin/auth";

const SESSION_COOKIE_NAME = "__session";
const SESSION_MAX_AGE = 14 * 24 * 60 * 60 * 1000; // 14 days

export async function requireAuth(): Promise<DecodedIdToken | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (!session) {
      return null;
    }

    const decoded = await adminAuth.verifySessionCookie(session, true);
    
    return decoded;
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

export async function requireRole(requiredRole: string): Promise<DecodedIdToken | null> {
  try {
    const decoded = await requireAuth();
    
    if (!decoded) {
      return null;
    }

    const userRole = decoded.role ?? decoded.claims?.role;
    
    if (userRole !== requiredRole) {
      console.warn(`Role mismatch: expected ${requiredRole}, got ${userRole}`);
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Role verification error:", error);
    return null;
  }
}

export async function createSessionCookie(idToken: string): Promise<string> {
  const expiresIn = SESSION_MAX_AGE;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  return sessionCookie;
}

export async function revokeSession(sessionCookie: string): Promise<void> {
  const decoded = await adminAuth.verifySessionCookie(sessionCookie);
  await adminAuth.revokeRefreshTokens(decoded.uid);
}
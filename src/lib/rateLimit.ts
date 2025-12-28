// src/lib/rateLimit.ts
import { adminDb } from "@/lib/firebaseAdmin";

// interface RateLimitConfig {
//   maxRequests: number;
//   windowSeconds: number;
// }

/**
 * Rate limit check using Firestore
 * @param key - Unique identifier (userId, IP, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param windowSeconds - Time window in seconds
 * @returns true if rate limited, false if allowed
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const now = Date.now();
    const windowStart = now - windowSeconds * 1000;
    
    const rateLimitRef = adminDb.collection("rateLimits").doc(key);
    const doc = await rateLimitRef.get();
    
    if (!doc.exists) {
      await rateLimitRef.set({
        requests: [now],
        lastCleanup: now,
      });
      return false;
    }
    
    const data = doc.data();
    let requests: number[] = data?.requests || [];
    
    requests = requests.filter((timestamp) => timestamp > windowStart);
    
    if (requests.length >= maxRequests) {
      return true;
    }
    
    requests.push(now);
    
    await rateLimitRef.update({
      requests,
      lastCleanup: now,
    });
    
    return false;
  } catch (error) {
    console.error("Rate limit check error:", error);
    return false;
  }
}

export async function cleanupRateLimits() {
  const cutoff = Date.now() - 3600 * 1000;
  
  const snapshot = await adminDb
    .collection("rateLimits")
    .where("lastCleanup", "<", cutoff)
    .limit(100)
    .get();
  
  const batch = adminDb.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  
  await batch.commit();
  return snapshot.size;
}
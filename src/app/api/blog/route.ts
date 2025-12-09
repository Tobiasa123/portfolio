//src/app/api/blog/route.ts

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("blog")
      .orderBy("createdAt", "desc")
      .limit(1) 
      .get();

    if (snapshot.empty) {
      return NextResponse.json(null);
    }

    const doc = snapshot.docs[0];

    const latestPost = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() ?? null,
    };

    return NextResponse.json(latestPost);
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

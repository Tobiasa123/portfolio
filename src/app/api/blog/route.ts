// src/app/api/blog/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 1;

    const snapshot = await adminDb
      .collection("blog")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() ?? null,
      };
    });

    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

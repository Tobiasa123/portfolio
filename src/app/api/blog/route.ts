// src/app/api/blog/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 1, 50);
    const cursor = searchParams.get("cursor"); // ISO string of the last post's createdAt

    let query = adminDb
      .collection("blog")
      .orderBy("createdAt", "desc")
      .limit(limit + 1); // fetch one extra so we know if there's a next page

    if (cursor) {
      const cursorDate = new Date(cursor);
      if (!isNaN(cursorDate.getTime())) {
        query = query.startAfter(cursorDate);
      }
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ posts: [], hasMore: false });
    }

    const docs = snapshot.docs;
    const hasMore = docs.length > limit;
    const pageDocs = hasMore ? docs.slice(0, limit) : docs;

    const posts = pageDocs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ posts, hasMore });
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
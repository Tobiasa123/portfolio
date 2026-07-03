//src/app/api/admin/blog/route.ts

import { requireRole } from "@/lib/auth";
import { blogPostSchema } from "@/schemas/blogPost";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// ------------ GET (Public) ------------ //

export async function GET() {
  try {
    const snapshot = await adminDb.collection("blog").orderBy("createdAt", "desc").get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/admin/blog error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// ------------ POST (Admin Only) ------------ //

export async function POST(req: Request) {
  try {
    // Check if user is admin
    const admin = await requireRole("admin");
    if (!admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const validated = blogPostSchema.parse(body);

    // Create new entry with server-side timestamps
    const now = new Date();
    const newPostRef = await adminDb.collection("blog").add({
      title: validated.title,
      content: validated.content,
      author: validated.author ?? "Admin",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        id: newPostRef.id,
        ...validated,
        createdAt: now,
        updatedAt: now,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/admin/blog error:", err);
    if (err.name === "ZodError") {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
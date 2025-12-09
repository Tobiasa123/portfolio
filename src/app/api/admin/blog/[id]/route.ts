import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireRole } from "@/lib/auth";
import { blogPostSchema } from "@/schemas/blogPost";

// GET ONE POST
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;       // <-- FIX
    if (!id) return new NextResponse("Bad Request", { status: 400 });

    const ref = await adminDb.collection("blog").doc(id).get();
    if (!ref.exists) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json({ id, ...ref.data() });
  } catch (err) {
    console.error("GET /api/admin/blog/[id]:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// UPDATE POST
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireRole("admin");
    if (!admin) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await params;      
    if (!id) return new NextResponse("Bad Request", { status: 400 });

    const body = await req.json();
    const validated = blogPostSchema.partial().parse(body);

    await adminDb.collection("blog").doc(id).update({
      ...validated,
      updatedAt: new Date(),
    });

    return NextResponse.json({ id, ...validated });
  } catch (err) {
    console.error("PUT /api/admin/blog/[id]:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE POST
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireRole("admin");
    if (!admin) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await params;     
    if (!id) return new NextResponse("Bad Request", { status: 400 });

    await adminDb.collection("blog").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/blog/[id]:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

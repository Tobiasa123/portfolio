// src/app/api/user/chat/route.ts
import { NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebaseAdmin";
import { requireAuth } from "@/lib/auth";
import { userMessageInputSchema } from "@/schemas/chatMessage";
import { checkRateLimit } from "@/lib/rateLimit";

export async function GET(req: Request) {
  try {
    const decoded = await requireAuth();
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.uid;

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);
    const before = searchParams.get("before");

    let query = adminDb
      .collection("chats")
      .doc(userId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(limit);

    if (before) {
      const beforeDate = new Date(before);
      query = query.where("timestamp", "<", beforeDate) as any;
    }

    const snapshot = await query.get();

    const messages = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          text: data.text,
          sender: data.sender,
          status: data.status,
          timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
        };
      })
      .reverse();

    return NextResponse.json({
      messages,
      hasMore: snapshot.docs.length === limit,
    });
  } catch (error) {
    console.error("User GET /api/user/chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const decoded = await requireAuth();
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.uid;

    const isLimited = await checkRateLimit(`user:${userId}`, 20, 60);
    if (isLimited) {
      return NextResponse.json(
        { error: "You're sending messages too quickly. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const input = userMessageInputSchema.parse(body);

    const chatRef = adminDb.collection("chats").doc(userId);

    await chatRef.set(
      {
        userId,
        lastMessageAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    const messageRef = await chatRef.collection("messages").add({
      userId,
      text: input.text,
      sender: "user",
      status: "new",
      timestamp: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      messageId: messageRef.id,
    });
  } catch (error: any) {
    console.error("User POST /api/user/chat error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid message format", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// src/app/api/admin/chat/route.ts
import { NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebaseAdmin";
import { requireRole } from "@/lib/auth";
import { adminMessageInputSchema, conversationQuerySchema } from "@/schemas/chatMessage";
import { checkRateLimit } from "@/lib/rateLimit";

export async function GET(req: Request) {
  try {
    const decoded = await requireRole("admin");
    if (!decoded) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = conversationQuerySchema.parse({
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50,
      offset: searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : 0,
      userId: searchParams.get("userId") || undefined,
    });

    let chatsQuery = adminDb.collection("chats").orderBy("lastMessageAt", "desc");

    if (query.userId) {
      const chatDoc = await adminDb.collection("chats").doc(query.userId).get();
      
      if (!chatDoc.exists) {
        return NextResponse.json({ conversations: [], total: 0 });
      }

      const msgsSnapshot = await chatDoc.ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();

      const messages = msgsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
      }));

      return NextResponse.json({
        conversations: [
          {
            userId: chatDoc.id,
            messages,
            lastMessageAt: chatDoc.data()?.lastMessageAt?.toDate?.()?.toISOString(),
          },
        ],
        total: 1,
      });
    }

    const chatsSnapshot = await chatsQuery.limit(query.limit).offset(query.offset).get();

    const conversations = await Promise.all(
      chatsSnapshot.docs.map(async (chatDoc) => {
        const userId = chatDoc.id;
        const chatData = chatDoc.data();

        const msgsSnapshot = await chatDoc.ref
          .collection("messages")
          .orderBy("timestamp", "desc")
          .limit(50)
          .get();

        const messages = msgsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
          }))
          .reverse();

        return {
          userId,
          messages,
          lastMessageAt: chatData?.lastMessageAt?.toDate?.()?.toISOString(),
          unreadCount: messages.filter((m: any) => m.status === "new" && m.sender === "user").length,
        };
      })
    );

    const totalSnapshot = await adminDb.collection("chats").count().get();
    const total = totalSnapshot.data().count;

    return NextResponse.json({
      conversations,
      total,
      limit: query.limit,
      offset: query.offset,
    });
  } catch (error) {
    console.error("Admin GET /api/admin/chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const decoded = await requireRole("admin");
    if (!decoded) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const isLimited = await checkRateLimit(`admin:${decoded.uid}`, 60, 60);
    if (isLimited) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const input = adminMessageInputSchema.parse(body);

    const chatRef = adminDb.collection("chats").doc(input.userId);

    await chatRef.set(
      {
        userId: input.userId,
        lastMessageAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    const messageRef = await chatRef.collection("messages").add({
      userId: input.userId,
      text: input.text,
      sender: "admin",
      status: "new",
      timestamp: FieldValue.serverTimestamp(),
      createdBy: decoded.uid,
    });

    return NextResponse.json({
      success: true,
      messageId: messageRef.id,
    });
  } catch (error: any) {
    console.error("Admin POST /api/admin/chat error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
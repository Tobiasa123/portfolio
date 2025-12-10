//src/app/api/admin/chat/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireRole } from "@/lib/auth";
import { chatMessageSchema } from "@/schemas/chatMessage";

// GET — Admin fetches all conversations
export async function GET() {
  const decoded = await requireRole("admin");
  if (!decoded)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Fetch all chat folders (one per user)
  const chatsSnapshot = await adminDb.collection("chats").get();

  const conversations: any[] = [];

  for (const chatDoc of chatsSnapshot.docs) {
    const userId = chatDoc.id;

    const msgsSnapshot = await chatDoc.ref
      .collection("messages")
      .orderBy("timestamp")
      .get();

    const messages = msgsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    }));

    conversations.push({
      userId,
      messages,
    });
  }

  return NextResponse.json(conversations);
}

// POST — Admin sends a message to a user
export async function POST(req: Request) {
  const decoded = await requireRole("admin");
  if (!decoded)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();

  const parsed = chatMessageSchema.parse({
    ...body,
    sender: "admin",
    timestamp: new Date(),
  });

  if (!parsed.userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  await adminDb
    .collection("chats")
    .doc(parsed.userId)
    .collection("messages")
    .add(parsed);

  return NextResponse.json({ success: true });
}

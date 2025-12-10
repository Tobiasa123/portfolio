//src/app/api/user/chat/route.ts

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAuth } from "@/lib/auth"; // user-required auth
import { chatMessageSchema } from "@/schemas/chatMessage";

// GET — user fetches their own messages
export async function GET() {
  const decoded = await requireAuth(); 
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = decoded.uid;

  const snapshot = await adminDb
    .collection("chats")
    .doc(userId)
    .collection("messages")
    .orderBy("timestamp")
    .get();

  const messages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),
  }));

  return NextResponse.json(messages);
}

// POST — user sends message to admin
export async function POST(req: Request) {
  const decoded = await requireAuth();
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = decoded.uid;
  const body = await req.json();

  const parsed = chatMessageSchema.parse({
    ...body,
    userId,
    sender: "user",
    timestamp: new Date(),
  });

  const chatRef = adminDb.collection("chats").doc(userId);
  
  // Initialize the parent document if it doesn't exist
  await chatRef.set(
    { 
      userId, 
      createdAt: new Date(),
      lastMessageAt: new Date() 
    }, 
    { merge: true }  
  );

  await chatRef.collection("messages").add(parsed);

  return NextResponse.json({ success: true });
}
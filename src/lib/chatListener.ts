// src/lib/chatListener.ts
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  userId: string;
  text: string;
  sender: "user" | "admin";
  status: "new" | "read";
  timestamp: string; 
}

export function listenToMessages(
  userId: string,
  callback: (msgs: Message[]) => void,
  onError?: (error: Error) => void
): () => void {
  if (!userId) {
    console.warn("listenToMessages called without userId");
    return () => {};
  }

  const q = query(
    collection(db, "chats", userId, "messages"),
    orderBy("timestamp", "asc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const messages: Message[] = snap.docs.map((d) => {
        const data = d.data();
        
        // Handle Firestore Timestamp conversion
        let timestampStr: string;
        if (data.timestamp instanceof Timestamp) {
          timestampStr = data.timestamp.toDate().toISOString();
        } else if (data.timestamp instanceof Date) {
          timestampStr = data.timestamp.toISOString();
        } else if (typeof data.timestamp === "string") {
          timestampStr = data.timestamp;
        } else {
          timestampStr = new Date().toISOString();
        }

        return {
          id: d.id,
          userId: data.userId || userId,
          text: data.text || "",
          sender: data.sender || "user",
          status: data.status || "new",
          timestamp: timestampStr,
        };
      });

      callback(messages);
    },
    (err) => {
      console.error("Firestore listener error:", err);
      onError?.(err as Error);
    }
  );

  return unsubscribe;
}
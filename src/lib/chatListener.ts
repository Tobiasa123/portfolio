// src/lib/chatListener.ts
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  limit,
  QueryConstraint,
} from "firebase/firestore";

export interface Message {
  id: string;
  userId: string;
  text: string;
  sender: "user" | "admin";
  status: "new" | "read";
  timestamp: string;
}

interface ListenerOptions {
  limit?: number;
  onError?: (error: Error) => void;
}

/**
 * Real-time listener for user's chat messages
 * Firestore rules ensure users can only read their own messages
 */
export function listenToMessages(
  userId: string,
  callback: (msgs: Message[]) => void,
  options: ListenerOptions = {}
): () => void {
  if (!userId || typeof userId !== "string") {
    console.error("Invalid userId provided to listenToMessages");
    return () => {};
  }

  const { limit: maxMessages = 100, onError } = options;

  try {
    const constraints: QueryConstraint[] = [
      orderBy("timestamp", "asc"),
      limit(maxMessages),
    ];

    const q = query(
      collection(db, "chats", userId, "messages"),
      ...constraints
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const messages: Message[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            const text = typeof data.text === "string" ? data.text : "";
            const sender = data.sender === "admin" ? "admin" : "user";
            const status = data.status === "read" ? "read" : "new";

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
              id: doc.id,
              userId: data.userId || userId,
              text,
              sender,
              status,
              timestamp: timestampStr,
            };
          });

          callback(messages);
        } catch (error) {
          console.error("Error processing snapshot:", error);
          onError?.(error as Error);
        }
      },
      (error) => {
        console.error("Firestore listener error:", error);
        onError?.(error as Error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up listener:", error);
    onError?.(error as Error);
    return () => {};
  }
}
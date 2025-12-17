"use client";

import { useRef, useEffect, useState } from "react";
import { listenToMessages } from "@/lib/chatListener";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string | Date;
};

interface ChatMessagesProps {
  userId: string;
}

export default function ChatMessages({ userId }: ChatMessagesProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = listenToMessages(
      userId,
      (msgs: Message[]) => {
        const updatedMsgs: Message[] = msgs.map((m) => ({
          ...m,
          timestamp: m.timestamp instanceof Date ? m.timestamp : new Date(m.timestamp),
        }));
        setMessages(updatedMsgs);
        setLoading(false);
      },
      (err: any) => {
        console.error("Listener error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) return <div className="p-2 text-sm text-surface-fg/70">Loading...</div>;

  return (
    <div
      ref={messagesRef}
      className="h-[300px] overflow-y-auto p-2 flex flex-col gap-2 border border-border rounded-base"
    >
      {messages.map((m) => {
        const timestamp: Date =
          m.timestamp instanceof Date ? m.timestamp : new Date(m.timestamp);

        const timeStr = timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={m.id}
            className={`p-2 rounded-base max-w-full wrap-break-word ${
              m.sender === "user" ? "ml-auto chat-user" : "mr-auto chat-admin"
            }`}
          >
            <p className="text-sm m-0">{m.text}</p>
            <span className="text-xs opacity-60 block mt-1">{timeStr}</span>
          </div>
        );
      })}
    </div>
  );
}

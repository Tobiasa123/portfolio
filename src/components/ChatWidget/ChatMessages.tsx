//src/components/ChatWidget/ChatMessages.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { listenToMessages, type Message } from "@/lib/chatListener";

interface ChatMessagesProps {
  userId: string;
}

export default function ChatMessages({ userId }: ChatMessagesProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const unsubscribe = listenToMessages(
      userId,
      (msgs) => {
        setMessages(msgs);
        setLoading(false);
        setError(null);
      },
      {
        limit: 100,
        onError: (err) => {
          console.error("Chat listener error:", err);
          setError("Failed to load messages");
          setLoading(false);
        },
      }
    );

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="h-75 flex items-center justify-center">
        <div className="text-sm text-surface-fg/70">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-75 flex items-center justify-center">
        <div className="text-sm text-red-500">{error}</div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-75 flex items-center justify-center">
        <div className="text-sm text-surface-fg/50">No messages yet</div>
      </div>
    );
  }

  return (
    <div
      ref={messagesRef}
      className="h-75 overflow-y-auto p-2 flex flex-col gap-2 rounded-base"
    >
      {messages.map((m) => {
        const isUser = m.sender === "user";
        const timestamp = new Date(m.timestamp);
        const timeStr = timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={m.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-base max-w-[80%] ${
                isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm wrap-break-word whitespace-pre-wrap m-0">
                {m.text}
              </p>
              <span className="text-xs opacity-60 block mt-1">{timeStr}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";
import { listenToMessages, type Message } from "@/lib/chatListener";

interface ChatMessagesProps {
  userId: string;
}

export default function ChatMessages({ userId }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isInitialLoad = useRef(true); // ✅ Track first render

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
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({
      behavior: isInitialLoad.current ? "auto" : "smooth",
    });

    isInitialLoad.current = false;
  }, [messages]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-sm opacity-70">Loading messages…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center opacity-50">
        No messages yet
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      {messages.map((m) => {
        const isUser = m.sender === "user";
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {
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
              <p className="text-sm whitespace-pre-wrap">{m.text}</p>
              <span className="text-xs opacity-60 block mt-1">
                {timeStr}
              </span>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}

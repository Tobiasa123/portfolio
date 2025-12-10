//src/components/ChatWidget/ChatMessages.tsx

"use client";

import { useRef, useEffect } from "react";

export default function ChatMessages({ messages, loading }: { messages: any[], loading: boolean }) {
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  if (loading) return <div className="p-2 text-sm text-surface-fg/70">Loading...</div>;

  return (
    <div ref={messagesRef} className="border border-border rounded-base overflow-y-auto p-2 flex flex-col gap-2">
      {messages.map(m => (
        <div
          key={m.id}
          className={`p-2 rounded-base max-w-full wrap-break-word ${
            m.sender === "user" ? "ml-auto chat-user" : "mr-auto chat-admin"
          }`}
        >
          <p className="text-sm m-0">{m.text}</p>
        </div>
      ))}
    </div>
  );
}

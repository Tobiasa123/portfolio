"use client";

//src/components/ChatWidget/ChatWidget.tsx

import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

// Define the Message type
type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string | Date;
};

export default function ChatWidget() {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/user/chat");
        if (!res.ok) throw new Error("Failed to load messages");
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const sendMessage = async (text: string) => {
    try {
      const res = await fetch("/api/user/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Send failed");

      setMessages(prev => [
        ...prev,
        { id: `tmp-${Date.now()}`, text, sender: "user", timestamp: new Date() },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 w-80 max-w-full border rounded-base shadow-lg bg-surface text-surface-fg overflow-hidden transition-all duration-300 ${collapsed ? "h-10" : "h-[400px]"}`}>
      <div className={`grid h-full ${collapsed ? "grid-rows-[40px]" : "grid-rows-[40px_1fr_48px]"}`}>
        <ChatHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        {!collapsed && <ChatMessages messages={messages} loading={loading} />}
        {!collapsed && <ChatInput sendMessage={sendMessage} />}
      </div>
    </div>
  );
}


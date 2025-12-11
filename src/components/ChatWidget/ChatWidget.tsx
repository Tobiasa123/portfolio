"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string | Date;
}

interface ChatWidgetProps {
  userId: string; 
}

export default function ChatWidget({ userId }: ChatWidgetProps) {
  const [collapsed, setCollapsed] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    try {
      await fetch("/api/user/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 w-80 max-w-full border rounded-base shadow-lg bg-surface text-surface-fg overflow-hidden transition-all duration-300 ${collapsed ? "h-10" : "h-[400px]"}`}>
      <div className={`grid h-full ${collapsed ? "grid-rows-[40px]" : "grid-rows-[40px_1fr_48px]"}`}>
        <ChatHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        {!collapsed && <ChatMessages userId={userId} />}
        {!collapsed && <ChatInput sendMessage={sendMessage} />}
      </div>
    </div>
  );
}

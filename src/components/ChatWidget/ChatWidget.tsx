"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Button } from "@/components/Button";
import { motion } from "motion/react";

interface ChatWidgetProps {
  userId: string;
  onClose: () => void;
}

export default function ChatWidget({ userId, onClose }: ChatWidgetProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed bottom-5 right-5 w-80 max-w-full border border-border rounded-base shadow-lg bg-surface text-surface-fg overflow-hidden"
    >
      <div className="flex justify-between items-center px-3 py-2 border-b border-border">
        <span className="font-semibold">Chat with us</span>
        <Button text="X" onClick={onClose} />
      </div>

      <ChatMessages userId={userId} />

      <ChatInput sendMessage={sendMessage} />
    </motion.div>
  );
}

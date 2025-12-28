//src/components/ChatWidget/ChatInput.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

interface ChatInputProps {
  sendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
}

export default function ChatInput({ sendMessage, disabled = false }: ChatInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || sending || disabled) return;
    
    setSending(true);
    try {
      await sendMessage(text.trim());
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally show error to user
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t border-border">
      <input
        className="flex-1 border border-border rounded-base p-2 bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={sending || disabled}
      />
      <Button
        text={sending ? "Sending..." : "Send"}
        disabled={sending || !text.trim() || disabled}
        onClick={handleSend}
      />
    </div>
  );
}
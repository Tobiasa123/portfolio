"use client";
//src/components/ChatWidget/ChatWidget.tsx
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Button } from "@/components/Button";
import { motion } from "motion/react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface ChatWidgetProps {
  userId: string;
  onClose: () => void;
}

export default function ChatWidget({ userId, onClose }: ChatWidgetProps) {
  const isMobile = useIsMobile();

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
      initial={{
        opacity: 0,
        y: isMobile ? 0 : 50,
        scale: isMobile ? 1 : 0.95,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: isMobile ? 0 : 50,
        scale: isMobile ? 1 : 0.95,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`
        fixed bg-surface text-surface-fg shadow-lg
        flex flex-col
        ${isMobile
          ? "inset-0 z-50"
          : "bottom-5 right-5 w-80 max-w-full h-125 max-h-[70vh] border border-border rounded-base"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border shrink-0">
        <span className="font-semibold">Chat with us</span>
        <Button text="X" onClick={onClose} />
      </div>

      {/* Messages (scroll area) */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages userId={userId} />
      </div>

      {/* Input (always at bottom) */}
      <div className="shrink-0 border-t border-border">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </motion.div>
  );
}

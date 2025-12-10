//src/components/ChatWidget/ChatInput.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export default function ChatInput({ sendMessage }: { sendMessage: (text: string) => void }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    await sendMessage(text.trim());
    setText("");
    setSending(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t border-border">
      <input
        className="flex-1 border border-border rounded-base p-2 bg-bg text-fg"
        placeholder="Type a message..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
      />
      <Button text="Send" disabled={sending} onClick={handleSend} />
    </div>
  );
}

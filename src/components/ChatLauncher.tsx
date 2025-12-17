"use client";

import { useState } from "react";
import ChatWidget from "./ChatWidget/ChatWidget";
import { FiMessageCircle } from "react-icons/fi";

export default function ChatLauncher({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWidget userId={userId} onClose={() => setOpen(false)} />}

      {!open && (
        <div className="fixed bottom-5 right-5">
          <button
            onClick={() => setOpen(true)}
            className="p-4 rounded-full shadow-lg hover:brightness-90 transition border border-border bg-surface hover:cursor-pointer"
            title="Open Chat"
          >
            <FiMessageCircle size={24} />
          </button>
        </div>
      )}
    </>
  );
}

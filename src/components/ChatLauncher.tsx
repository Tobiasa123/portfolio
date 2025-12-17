"use client";

import { useState } from "react";
import ChatWidget from "./ChatWidget/ChatWidget";
import { Button } from "@/components/Button";

export default function ChatLauncher({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWidget userId={userId} onClose={() => setOpen(false)} />}

      {!open && (
        <div className="fixed bottom-5 right-5">
          <Button text="Chat" onClick={() => setOpen(true)} />
        </div>
      )}
    </>
  );
}

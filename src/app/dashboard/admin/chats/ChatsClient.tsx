"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/Button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string | Date;
}

interface Conversation {
  userId: string;
  messages: Message[];
}

export default function ChatsClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // Scroll helper function
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/admin/chat", { credentials: "include" });
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/404";
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to load chats");
        }
        const data: Conversation[] = await res.json();
        setConversations(data);
        if (data.length > 0) setSelectedUserId((prev) => prev ?? data[0].userId);
      } catch (err: any) {
        setError(err.message || "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  // Scroll when messages change or user switches conversation
  useEffect(() => {
    scrollToBottom();
  }, [selectedUserId, conversations]);

  const currentChat = conversations.find((c) => c.userId === selectedUserId) ?? null;

  const sendMessage = async () => {
    if (!selectedUserId || !text.trim()) return;

    setSending(true);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId, text: text.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Failed to send message");

      setConversations((prev) =>
        prev.map((c) =>
          c.userId === selectedUserId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: `tmp-${Date.now()}`,
                    text: text.trim(),
                    sender: "admin",
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : c
        )
      );

      setText("");
      
      // Scroll after state update
      setTimeout(scrollToBottom, 0);
    } catch (err: any) {
      alert(err.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-fg">Loading chats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-[260px_1fr] gap-4 h-[600px]">
      {/* Sidebar */}
      <div className="bg-surface border-border border rounded-base overflow-y-auto">
        <div className="p-3">
          <h2 className="font-bold mb-3 text-surface-fg">Conversations</h2>
          {conversations.length === 0 ? (
            <p className="text-sm text-surface-fg/70">No chats yet.</p>
          ) : (
            <div className="space-y-2">
              {conversations.map((c) => (
                <button
                  key={c.userId}
                  onClick={() => setSelectedUserId(c.userId)}
                  className={`w-full text-left p-2 rounded-base border border-border text-sm ${
                    c.userId === selectedUserId
                      ? "bg-surface text-surface-fg border-border"
                      : "hover:bg-surface/50 border-transparent"
                  }`}
                >
                  <div className="truncate font-semibold">{c.userId}</div>
                  <div className="text-xs text-surface-fg/70 mt-1">{c.messages.length} messages</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="bg-surface border-border border rounded-base flex flex-col max-h-[600px]">
        {!currentChat ? (
          <div className="m-auto text-surface-fg/70">Select a conversation</div>
        ) : (
          <>
            <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px]">
              {currentChat.messages.map((m) => {
                const isAdmin = m.sender === "admin";
                const time = new Date(m.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={m.id}
                    className={`p-2 rounded-base max-w-[70%] wrap-break-word ${
                      isAdmin ? "ml-auto chat-admin" : "mr-auto chat-user"
                    }`}
                  >
                    <p className="text-sm m-0">{m.text}</p>
                    <span className="text-xs opacity-60 block mt-1">{time}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border p-3 flex gap-2">
              <input
                className="flex-1 border border-border rounded-base p-2 bg-bg text-fg"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button text="Send" disabled={sending} onClick={sendMessage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
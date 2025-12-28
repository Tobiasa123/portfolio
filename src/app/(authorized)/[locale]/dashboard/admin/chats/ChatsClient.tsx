// src/app/admin/chats/ChatsClient.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/Button";
import { listenToMessages, type Message } from "@/lib/chatListener";

interface Conversation {
  userId: string;
  messages: Message[];
  lastMessageAt?: string;
  unreadCount?: number;
}

interface AdminChatResponse {
  conversations: Conversation[];
  total: number;
  limit: number;
  offset: number;
}

export default function ChatsClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

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
        
        const data: AdminChatResponse = await res.json();
        setConversations(data.conversations || []);
        
        if (data.conversations.length > 0 && !selectedUserId) {
          setSelectedUserId(data.conversations[0].userId);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const unsubscribe = listenToMessages(
      selectedUserId,
      (msgs) => {
        setConversations((prev) =>
          prev.map((c) =>
            c.userId === selectedUserId
              ? { 
                  ...c, 
                  messages: msgs,
                  // ✅ Recalculate unread count from messages
                  unreadCount: msgs.filter(m => m.status === "new" && m.sender === "user").length
                }
              : c
          )
        );
        setTimeout(scrollToBottom, 100);
      },
      {
        onError: (err) => {
          console.error("Listener error for", selectedUserId, err);
        },
      }
    );

    return () => unsubscribe();
  }, [selectedUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUserId]);

  const currentChat = conversations.find((c) => c.userId === selectedUserId);

  const sendMessage = async () => {
    if (!selectedUserId || !text.trim() || sending) return;

    setSending(true);
    setError(null);
    
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: selectedUserId, 
          text: text.trim() 
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message");
      }

      setText("");
      setTimeout(scrollToBottom, 100);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-150">
        <div className="text-fg">Loading chats...</div>
      </div>
    );
  }

  if (error && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-150">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[260px_1fr] gap-4 h-150">
      <div className="bg-surface border-border border rounded-base overflow-y-auto">
        <div className="p-3">
          <h2 className="font-bold mb-3 text-surface-fg">Conversations</h2>
          {conversations.length === 0 ? (
            <p className="text-sm text-surface-fg/70">No chats yet.</p>
          ) : (
            <div className="space-y-2">
              {conversations.map((c) => {
                const lastMsg = c.messages[c.messages.length - 1];
                const preview = lastMsg?.text.slice(0, 40) || "No messages";
                const hasUnread = (c.unreadCount ?? 0) > 0;

                return (
                  <button
                    key={c.userId}
                    onClick={() => setSelectedUserId(c.userId)}
                    className={`w-full text-left p-2 rounded-base border text-sm transition-colors relative ${
                      c.userId === selectedUserId
                        ? "bg-bg border-blue-400"
                        : "border-border hover:cursor-pointer hover:bg-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="truncate font-semibold">{c.userId}</div>
                      {hasUnread && (
                        <span className="bg-blue-500  text-xs px-2 py-0.5 rounded-full">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-surface-fg/70 mt-1 truncate">
                      {preview}
                    </div>
                    <div className="text-xs text-surface-fg/50 mt-1">
                      {c.messages.length} messages
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 bg-surface border-border border rounded-base flex flex-col max-h-150">
        {!currentChat ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-surface-fg/70">Select a conversation</div>
          </div>
        ) : (
          <>
            <div className="border-b border-border p-3">
              <div className="font-semibold text-surface-fg">
                Chat with {selectedUserId}
              </div>
              <div className="text-xs text-surface-fg/60">
                {currentChat.messages.length} messages
              </div>
            </div>

            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {currentChat.messages.length === 0 ? (
                <div className="text-center text-surface-fg/50 mt-8">
                  No messages yet
                </div>
              ) : (
                currentChat.messages.map((m) => {
                  const isAdmin = m.sender === "admin";
                  const date = new Date(m.timestamp);
                  const timeStr = date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={m.id}
                      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`p-3 rounded-base max-w-[70%] ${
                          isAdmin
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm wrap-break-word whitespace-pre-wrap">
                          {m.text}
                        </p>
                        <span className="text-xs opacity-60 block mt-1">
                          {timeStr}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {error && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="border-t border-border p-3 flex gap-2">
              <input
                className="flex-1 border border-border rounded-base p-2 bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={sending}
              />
              <Button
                text={sending ? "Sending..." : "Send"}
                disabled={sending || !text.trim()}
                onClick={sendMessage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
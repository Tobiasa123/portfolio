// src/schemas/chatMessage.ts
import { z } from "zod";

export const chatMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  sender: z.enum(["user", "admin"]), 
  timestamp: z.date(),
  status: z.enum(["new", "read"]).optional().default("new"),
  userId: z.string().optional(), // optional for anonymous visitors
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

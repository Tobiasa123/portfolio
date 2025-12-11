// src/schemas/chatMessage.ts
import { z } from "zod";


export const chatMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
  sender: z.enum(["user", "admin"]), 
  timestamp: z.date(),
  status: z.enum(["new", "read"]).optional().default("new"),
  userId: z.string().min(1, "User ID is required"), 
});

export const userMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
});

export const adminMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
  userId: z.string().min(1, "User ID is required"),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
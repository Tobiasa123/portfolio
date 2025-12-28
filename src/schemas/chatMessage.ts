// src/schemas/chatMessage.ts
import { z } from "zod";

export const chatMessageSchema = z.object({
  userId: z.string().min(1, "User ID is required").max(128),
  text: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message too long (max 5000 characters)")
    .trim(),
  sender: z.enum(["user", "admin"]),
  status: z.enum(["new", "read"]).default("new"),
  timestamp: z.date(),
});

export const userMessageInputSchema = z.object({
  text: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message too long")
    .trim(),
});

export const adminMessageInputSchema = z.object({
  text: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message too long")
    .trim(),
  userId: z.string().min(1, "Target user ID is required").max(128),
});

// Query/pagination schemas
export const conversationQuerySchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().nonnegative().default(0),
  userId: z.string().max(128).optional(),
});

export const messageQuerySchema = z.object({
  limit: z.number().int().positive().max(500).default(100),
  before: z.string().datetime().optional(),
});

export const markReadSchema = z.object({
  messageIds: z.array(z.string().max(128)).min(1).max(50),
});

// Type exports
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type UserMessageInput = z.infer<typeof userMessageInputSchema>;
export type AdminMessageInput = z.infer<typeof adminMessageInputSchema>;
export type ConversationQuery = z.infer<typeof conversationQuerySchema>;
export type MessageQuery = z.infer<typeof messageQuerySchema>;
export type MarkReadInput = z.infer<typeof markReadSchema>;
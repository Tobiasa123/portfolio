// src/schemas/blogPost.ts
import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().optional(),              // Firestore ID
  title: z.string().min(3, "Title is too short"),
  slug: z.string().optional(),            // generated from title
  content: z.string().min(1, "Content cannot be empty"),
  author: z.string().optional(),          // probably your name
  published: z.boolean().default(true),   // hide drafts if needed

  // Firestore stores Timestamp → accept both
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

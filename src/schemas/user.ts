//src/schemas/user.ts
import { z } from "zod";

// Schema for validating registration input
export const registerUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Optional: type inferred from Zod schema
export type RegisterUserInput = z.infer<typeof registerUserSchema>;

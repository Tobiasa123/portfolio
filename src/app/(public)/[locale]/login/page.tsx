// src/app/(public)/[locale]/login/page.tsx
"use client";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return <AuthForm type="login" redirectTo="/dashboard" />;
}


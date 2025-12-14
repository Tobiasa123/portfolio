"use client";
//src/app/%28public%29/login/page.tsx

import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <AuthForm
      title="Log in"
      submitLabel="Log In"
      loadingLabel="Logging in..."
      endpoint="/api/auth/login"
      redirectTo="/dashboard"
      bottomLink={{
        label: "Not registered? Sign up here.",
        href: "/register",
      }}
    />
  );
}

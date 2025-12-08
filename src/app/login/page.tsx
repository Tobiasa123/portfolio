"use client";

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

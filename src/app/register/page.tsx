"use client";

import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <AuthForm
      title="Sign Up"
      submitLabel="Sign Up"
      loadingLabel="Registering..."
      endpoint="/api/auth/register"
      redirectTo="/login"
      bottomLink={{
        label: "Already registered? Log in here.",
        href: "/login",
      }}
    />
  );
}


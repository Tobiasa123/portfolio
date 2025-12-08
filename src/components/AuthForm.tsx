"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthFormProps {
  title: string;
  submitLabel: string;
  loadingLabel: string;
  endpoint: string;
  redirectTo: string;
  bottomLink?: {
    label: string;
    href: string;
  };
}

export function AuthForm({
  title,
  submitLabel,
  loadingLabel,
  endpoint,
  redirectTo,
  bottomLink,
}: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let body: any = {};

      if (endpoint === "/api/auth/login") {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        body = { idToken };
      }

      if (endpoint === "/api/auth/register") {
        body = { email, password };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="border border-border rounded-md p-8 max-w-md w-full shadow-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-fg text-center">
          {title}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-surface-foreground"
          />

          <input
            type="password"
            name="password"
            autoComplete={
              title.toLowerCase().includes("sign")
                ? "new-password"
                : "current-password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-surface-foreground"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            text={loading ? loadingLabel : submitLabel}
            disabled={loading}
          />
        </form>

        {bottomLink && (
          <div className="text-center mt-2">
            <Link
              href={bottomLink.href}
              className="text-sm text-surface-foreground hover:underline"
            >
              {bottomLink.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function RegisterPage() {
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="border border-border rounded-md p-8 max-w-md w-full shadow-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-fg text-center">Sign Up</h1>

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
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-surface-foreground"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            text={loading ? "Registering..." : "Sign Up"}
          />
        </form>

        <Button
          text="Already registered? Log in here"
          onClick={() => router.push("/login")}
          className="mt-2"
        />
      </div>
    </div>
  );
}

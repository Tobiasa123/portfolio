"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth"; // <-- add here
import { auth } from "@/lib/firebase";
import { SiGithub } from "react-icons/si";

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

     //github handler (will cleanup later)
    const handleGithubSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GithubAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const idToken = await user.getIdToken();

        await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        });

        await fetch("/api/auth/oauth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
        });

        router.push(redirectTo);
        } catch (err: any) {
            setError(err.message || "GitHub sign in failed");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="border border-border rounded-md p-8 max-w-md w-full shadow-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-fg text-center">{title}</h1>

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
            autoComplete={title.toLowerCase().includes("sign") ? "new-password" : "current-password"}
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

        {/* Add GitHub button */}
            <Button
            text="Continue with GitHub"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-black text-white hover:brightness-90"
            >
            <SiGithub />
            Continue with GitHub
            </Button>


        {bottomLink && (
          <div className="text-center mt-2">
            <Link href={bottomLink.href} className="text-sm text-surface-foreground hover:underline">
              {bottomLink.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

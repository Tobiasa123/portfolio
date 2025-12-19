"use client";

// src/components/AuthForm.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SiGithub } from "react-icons/si";
import { GlassCard } from "./ui/GlassCard";

interface AuthFormProps {
  type: "login" | "register";
  redirectTo: string;
}

export function AuthForm({ type, redirectTo }: AuthFormProps) {
  const tPublic = useTranslations("public");       
  const tAuth = useTranslations("public.auth");   
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
      if (type === "login") {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        body = { idToken };
      } else {
        body = { email, password };
      }

      const res = await fetch(`/api/auth/${type}`, {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
      <GlassCard className="flex flex-col gap-4 w-96">
        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-fg text-center">
          {type === "login" ? tPublic("login") : tPublic("signup")}
        </h1>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"                        
            autoComplete="email"                
            placeholder={tAuth("email")}
            title={tAuth("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-surface-foreground bg-white/10 dark:bg-black/20"
          />

          <input
            type="password"
            name="password"                     // required for browser autofill
            autoComplete={type === "login" ? "current-password" : "new-password"} // autofill
            placeholder={tAuth("password")}
            title={tAuth("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-surface-foreground bg-white/10 dark:bg-black/20"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading
              ? type === "login"
                ? tAuth("loggingIn")
                : tAuth("registering")
              : type === "login"
              ? tPublic("login")
              : tPublic("signup")}
          </Button>
        </form>

        {/* GitHub OAuth */}
        <Button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black text-white hover:brightness-90"
        >
          <SiGithub />
          {tAuth("continueWithGithub")}
        </Button>

        {/* Bottom Link */}
        <div className="text-center mt-2">
          <Link
            href={type === "login" ? "/register" : "/login"}
            className="text-sm text-surface-foreground hover:underline"
          >
            {type === "login" ? tAuth("notRegistered") : tAuth("alreadyRegistered")}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

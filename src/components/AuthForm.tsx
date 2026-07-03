"use client";

// src/components/AuthForm.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SiGithub } from "react-icons/si";
import { expo, stagger, fadeUp } from "@/components/sections/home/motion";

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
    <div
      className="relative h-full flex items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--portfolio-base)) 0%, rgb(var(--portfolio-surface)) 100%)",
      }}
    >
      {/* Brand glow, same treatment as HomeHero */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 size-120 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--portfolio-glow) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-96 flex flex-col gap-6 rounded-2xl border portfolio-border-brand portfolio-surface backdrop-blur-md p-8"
      >
        {/* Form Title */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: expo }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-center"
        >
          {type === "login" ? tPublic("login") : tPublic("signup")}
        </motion.h1>

        {/* Form Fields */}
        <motion.form
          variants={fadeUp}
          transition={{ duration: 0.7, ease: expo }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={tAuth("email")}
            title={tAuth("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border portfolio-border bg-transparent px-4 py-2.5 text-sm portfolio-text-muted focus:outline-none focus:ring-2 focus:ring-[rgb(var(--portfolio-brand-muted)/0.5)] transition-colors"
          />

          <input
            type="password"
            name="password"
            autoComplete={type === "login" ? "current-password" : "new-password"}
            placeholder={tAuth("password")}
            title={tAuth("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border portfolio-border bg-transparent px-4 py-2.5 text-sm portfolio-text-muted focus:outline-none focus:ring-2 focus:ring-[rgb(var(--portfolio-brand-muted)/0.5)] transition-colors"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" disabled={loading}>
            {loading
              ? type === "login"
                ? tAuth("loggingIn")
                : tAuth("registering")
              : type === "login"
              ? tPublic("login")
              : tPublic("signup")}
          </Button>
        </motion.form>

        {/* GitHub OAuth */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: expo }}>
          <Button
            onClick={handleGithubSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl border portfolio-border-brand portfolio-surface hover:brightness-95 transition"
          >
            <SiGithub />
            {tAuth("continueWithGithub")}
          </Button>
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: expo }}
          className="text-center"
        >
          <Link
            href={type === "login" ? "/register" : "/login"}
            className="text-sm portfolio-brand hover:underline"
          >
            {type === "login" ? tAuth("notRegistered") : tAuth("alreadyRegistered")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
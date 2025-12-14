"use client";

//src/app/public/page.tsx

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import BlogSection from "@/components/BlogSection";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-primary ">
      <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">

        {/* Left: Blog Section */}
        <GlassCard>
          <BlogSection limit={1} />
        </GlassCard>

        {/* Right: Login Card */}
        <GlassCard className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Welcome</h1>

          <Button
            text="Log in"
            onClick={() => router.push("/login")}
          />

          <Button
            text="Continue as Guest"
            onClick={() => router.push("/")}
          />
        </GlassCard>

      </div>
    </div>
  );
}

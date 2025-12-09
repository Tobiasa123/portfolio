'use client';

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-2 gap-4 w-full max-w-6xl">

        {/* Left: Blog Section */}
        <div>
          <BlogSection limit={1} />
        </div>

        {/* Right: Login Card */}
        <div className="border border-border">
          <h1>Welcome</h1>
          <Button text="Log in" onClick={() => router.push('/login')} />
          <Button text="Continue as Guest" onClick={() => router.push('/')} />
        </div>

      </div>
    </div>
  );
}

'use client';

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="border border-border rounded-md p-8 max-w-md w-full shadow-sm flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold text-fg">Landing Page</h1>
        <Button 
          text="Log in"
          onClick={() => router.push('/login')} 
        />
      </div>
    </div>
  );
}

'use client';

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col gap-4 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>landing page...</h1>

      <Button 
        text="log in"
        onClick={() => router.push('/login')} 
      />
    </div>
  );
}

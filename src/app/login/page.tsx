'use client';

//src/app/register/page.tsx
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";
import { use } from "react";
const LoginPage = () => {

      const router = useRouter();

  return (
    <div>
        <form>

            <h1 className=" font-bold text-center">Log in</h1>

            <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
            </label>

            <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
            </label>
            
            <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

        </form>
        <Button 
                text="not registered? sign up here"
                onClick={() => router.push('/register')} 
              />
    </div>
  )
}

export default LoginPage
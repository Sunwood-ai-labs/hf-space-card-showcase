"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          カードショーケース
        </Link>
        <div className="flex items-center space-x-4">
          {status === 'authenticated' && session?.user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {session.user.image && (
                  <Image 
                    src={session.user.image} 
                    alt="プロフィール画像" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                )}
                <span className="text-sm font-medium">
                  {session.user.username || session.user.name || 'マイアカウント'}
                </span>
              </div>
              <Link 
                href="/dashboard" 
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mr-2")}
              >
                ダッシュボード
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link 
              href="/login" 
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

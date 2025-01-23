import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          カードショーケース
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link 
                href="/dashboard" 
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mr-2")}
              >
                ダッシュボード
              </Link>
              <LogoutButton />
            </>
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

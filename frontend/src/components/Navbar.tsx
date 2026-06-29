'use client';

import Link from 'next/link';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { BriefcaseIcon } from 'lucide-react';

export default function Navbar() {
  const { isLoaded, userId } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-2 text-white shadow-lg shadow-blue-500/20">
            <BriefcaseIcon className="h-5 w-5" />
          </div>
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent sm:inline-block text-lg">
            TalentSync <span className="text-blue-400 font-semibold">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/jobs" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Find Jobs
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:inline-block">
            Dashboard
          </Link>
          {isLoaded && userId && (
            <Link href="/profile" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:inline-block">
              Profile
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoaded && userId && (
            <UserButton />
          )}
          {isLoaded && !userId && (
            <SignInButton mode="modal">
              <button className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] h-9 px-4 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}

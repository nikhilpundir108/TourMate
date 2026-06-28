// components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, Compass } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-slate-100 tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Compass className="w-5 h-5 text-white" />
              </span>
              <span>
                Tour <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Mate</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-1">
                <Link
                  href="/destinations"
                  className="text-slate-300 hover:text-white hover:bg-slate-900/50 px-4.5 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  Destinations
                </Link>
                <Link
                  href="/preferences"
                  className="text-slate-300 hover:text-white hover:bg-slate-900/50 px-4.5 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  Plan Custom Trip
                </Link>
                <Link
                  href="/itinerary"
                  className="text-slate-300 hover:text-white hover:bg-slate-900/50 px-4.5 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  AI Itinerary
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Clerk Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <div className="border border-slate-900 rounded-full p-1 bg-slate-950 hover:bg-slate-900 transition-colors">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              href="/destinations"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-300 hover:text-white hover:bg-slate-900 block px-4 py-3 rounded-xl text-base font-medium transition-all"
            >
              Destinations
            </Link>
            <Link
              href="/preferences"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-300 hover:text-white hover:bg-slate-900 block px-4 py-3 rounded-xl text-base font-medium transition-all"
            >
              Plan Custom Trip
            </Link>
            <Link
              href="/itinerary"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-300 hover:text-white hover:bg-slate-900 block px-4 py-3 rounded-xl text-base font-medium transition-all"
            >
              AI Itinerary
            </Link>
            <div className="pt-4 border-t border-slate-900 flex justify-center">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-slate-350 text-sm font-medium">Your Profile</span>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl text-base transition-all shadow-md shadow-blue-500/10">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
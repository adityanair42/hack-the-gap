"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-6">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            APKA Saathi
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-slate-600">
            <Link href="#" className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all">Features</Link>
            <Link href="#" className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all">Pricing</Link>
            <Link href="#" className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all">About Us</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" passHref>
              <button className="px-5 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-200 transition-colors">
                Login
              </button>
            </Link>
            <Link href="/register" passHref>
              <button className="px-5 py-2 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-800">
            Your Trusted Marketplace Partner
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-slate-600">
            Connect, trade, and grow with confidence. APKA Saathi provides the tools and community you need to succeed.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link href="/marketplace" passHref>
              <button className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                Explore Marketplace
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="#" passHref>
              <button className="px-8 py-3 font-semibold rounded-lg text-slate-700 hover:bg-slate-200 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto text-center p-6 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} APKA Saathi. All rights reserved.</p>
      </footer>
    </div>
  );
}
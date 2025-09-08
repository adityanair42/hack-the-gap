"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../register/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
            const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include", // <-- ADD THIS LINE
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Login successful, save session info to localStorage and redirect.
        const data = await res.json();
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        router.push("/");
        router.refresh(); // Ensures the header updates correctly
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      // Log the specific error to the console for more details
      console.error("Fetch error:", err);
      setError(
        `Failed to connect to the server. Please check your network or try again later. (${err.message})`
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-6">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            APKA Saathi
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-slate-600">
            <Link
              href="#"
              className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all"
            >
              Features
            </Link>
            <Link
              href="#"
              className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="hover:text-slate-900 hover:text-lg transition delay-100 duration-100 ease-in-out transition-all"
            >
              About Us
            </Link>
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
        <div className="w-full max-w-md px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Log in to your Account
              </h1>
              <p className="text-slate-500 mt-2">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-slate-700 hover:text-slate-900"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 rounded-lg border border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 rounded-lg border border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                Log In
              </button>
            </form>
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
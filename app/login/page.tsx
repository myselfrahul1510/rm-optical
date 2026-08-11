"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

  if (error) {
    setLoading(false);
    alert(error.message);
    return;
  }

  if (!data.session) {
    setLoading(false);
    alert("Login session could not be created.");
    return;
  }

  // Make sure session is available before navigation
  await supabase.auth.getSession();

  setLoading(false);

  window.location.replace("/admin");
}


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
      >

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0A2E73] text-3xl font-bold text-white shadow-lg">
            RM
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-[#0A2E73]">
          Admin Login
        </h1>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Login to R.M OPTICAL Admin Panel
        </p>

        {/* Email */}
        <div className="mb-5">
          <label
            className="mb-2 block text-sm font-semibold text-gray-700"
            style={{ padding: "5px" }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            style={{ padding: "5px" }}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none transition-all duration-300 focus:border-[#0A2E73] focus:ring-4 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-semibold text-gray-700"
            style={{ padding: "5px" }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            style={{ padding: "5px" }}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none transition-all duration-300 focus:border-[#0A2E73] focus:ring-4 focus:ring-blue-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "5px",
            backgroundColor: "rgb(41, 150, 228)",
            marginTop: "10px",
          }}
          className="w-full rounded-xl bg-[#0A2E73] py-3 text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08245A] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">

              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Logging in...

            </div>
          ) : (
            "Login"
          )}
        </button>

      </form>
    </div>
  );
}

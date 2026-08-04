"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-[#0A2E73]">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0A2E73] py-3 font-semibold text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}
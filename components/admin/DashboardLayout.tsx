"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);

  // =====================================================
  // CHECK ADMIN SESSION
  // =====================================================

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error("Session check error:", error);

          await supabase.auth.signOut();

          router.replace("/login");
          return;
        }

        if (!session) {
          router.replace("/login");
          return;
        }

        setCheckingSession(false);
      } catch (error) {
        console.error("Session checking error:", error);

        if (mounted) {
          await supabase.auth.signOut();
          router.replace("/login");
        }
      }
    }

    checkSession();

    // =====================================================
    // LISTEN FOR AUTH CHANGES
    // =====================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT" || !session) {
          router.replace("/login");
          return;
        }

        if (event === "SIGNED_IN") {
          setCheckingSession(false);
        }
      }
    );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  // =====================================================
  // LOGOUT
  // =====================================================

  async function handleLogout() {
  try {
    // Clear browser-side Supabase session
    await supabase.auth.signOut();

    // Clear server-side authentication cookies
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // Go directly to login
    window.location.replace("/login");
  } catch (error) {
    console.error("Logout error:", error);

    // Even if Supabase logout has an issue,
    // force the user back to login page
    window.location.replace("/login");
  }
}

  // =====================================================
  // SESSION CHECKING SCREEN
  // =====================================================

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0A2E73]" />

          <p className="text-sm font-semibold text-gray-600">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ORIGINAL ADMIN UI
  // =====================================================

  return (
    <div className="flex min-h-screen flex-col md:flex-row">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">

          <div className="min-w-0">

            <h1 className="truncate text-2xl font-bold text-[#0A2E73]">
              R.M OPTICAL Admin
            </h1>

            <p className="truncate text-sm text-gray-500">
              Welcome to the Admin Dashboard
            </p>

          </div>

          <div className="flex shrink-0 items-center">

            <button
              type="button"
              onClick={handleLogout}
              className="group flex h-9 w-[100px] items-center justify-center gap-2 rounded-xl border-2 border-red-500 bg-white px-3 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-red hover:shadow-lg hover:shadow-red-200 active:scale-95"
              style={{
                marginRight: "4rem",
                backgroundColor: "rgb(243, 51, 51)",
                color: "black",
              }}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h6a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2H3V4z"
                />

              </svg>

              <span className="whitespace-nowrap text-sm">
                Logout
              </span>

            </button>

          </div>

        </header>

        {/* Main */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

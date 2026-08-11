import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  const response = NextResponse.json({
    success: true,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("cookie") || "";

          return cookieHeader
            .split(";")
            .filter(Boolean)
            .map((cookie) => {
              const index = cookie.indexOf("=");

              return {
                name: cookie.slice(0, index).trim(),
                value: cookie.slice(index + 1).trim(),
              };
            });
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Server logout error:", error);
  }

  // Remove Supabase authentication cookies
  const cookies = request.headers.get("cookie") || "";

  cookies
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter(
      (name) =>
        name.startsWith("sb-") ||
        name.includes("supabase")
    )
    .forEach((name) => {
      response.cookies.set(name, "", {
        expires: new Date(0),
        maxAge: 0,
        path: "/",
      });
    });

  return response;
}
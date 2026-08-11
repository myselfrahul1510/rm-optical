import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(name, value);

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

  const pathname = request.nextUrl.pathname;

  let user = null;

  try {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    user = currentUser;
  } catch (error) {
    console.error("Auth check error:", error);
    user = null;
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // Logged-in user should not access login
  if (pathname === "/login" && user) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
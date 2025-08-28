import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy URLs to new structure
  if (pathname === "/admin/sdm-organisasi/pejabat") {
    return NextResponse.redirect(new URL("/admin/sdm-organisasi/staff", request.url));
  }

  // Jika sudah login dan akses /login, redirect ke admin
  if (pathname === "/login") {
    const userCookie = request.cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie.value));
        if (user.role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch (error) {
        // Cookie corrupt, biarkan akses login
        console.error("Cookie parsing error:", error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/sdm-organisasi/pejabat"],
};

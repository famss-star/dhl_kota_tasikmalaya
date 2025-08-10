import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Middleware tidak akan melakukan redirect untuk admin
  // Biarkan AdminAuthGuard yang handle autentikasi admin
  const { pathname } = request.nextUrl;

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
  matcher: ["/login"],
};

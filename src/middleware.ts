import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  // Daftar path yang harus login
  const protectedPaths = ["/admin", "/dashboard"];
  const { pathname } = request.nextUrl;

  // Cek apakah path sekarang butuh login
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (requiresAuth) {
    const userCookie = request.cookies.get("user");
    if (!userCookie) {
      // Redirect ke login jika belum login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Jika sudah login dan akses /login, redirect ke home
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // Untuk path lain, biarkan akses publik
  return NextResponse.next();
}


// Aktifkan middleware hanya untuk path yang diproteksi (lebih efisien)
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};

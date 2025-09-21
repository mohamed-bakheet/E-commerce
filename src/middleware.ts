import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("_vercel_jwt")?.value;

  const { pathname } = request.nextUrl;

  // Protect private routes
  const protectedRoutes = ["/products", "/cart", "/checkout", "/category", "/", "/wishlist"];
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from accessing login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products", "/cart", "/checkout", "/category", "/", "/wishlist", "/login"],
};

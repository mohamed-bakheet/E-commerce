import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
const token =
  request.cookies.get("next-auth.session-token")?.value ||
  request.cookies.get("__Secure-next-auth.session-token")?.value ||
  request.cookies.get("_vercel_jwt")?.value;
  const { pathname } = request.nextUrl;

  // Protect private routes
  if (!token && ["/products", "/cart", "/checkout", "/category", "/", "/wishlist"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from accessing login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/products", "/cart", "/checkout","/category","/","/wishlist"],
}
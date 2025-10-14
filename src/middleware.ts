import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES_EXACT = ['/'];
const PROTECTED_ROUTES_PREFIX = ['/channel', '/dm'];
const AUTH_ROUTES = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token')?.value;

  const isProtectedRoute =
    PROTECTED_ROUTES_EXACT.includes(pathname) ||
    PROTECTED_ROUTES_PREFIX.some(route => pathname.startsWith(route));

  // If user is on a protected route without an auth token, redirect to login
  if (isProtectedRoute && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If user is on an auth route with an auth token, redirect to home
  if (AUTH_ROUTES.includes(pathname) && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

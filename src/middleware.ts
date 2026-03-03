import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = [
  '/news',
  '/channel', 
  '/dm', 
  '/foryou', 
  '/company-news', 
  '/friends', 
  '/coworkers', 
  '/settings',
  '/add-contact',
  '/profile'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  const isLandingPage = pathname === '/';

  if (isProtectedRoute && !authToken) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  if ((isAuthRoute || isLandingPage) && authToken) {
    const url = new URL('/friends', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas protegidas que requieren sesión
const PROTECTED_ROUTES_PREFIX = [
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

  const isProtectedRoute = PROTECTED_ROUTES_PREFIX.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  const isLandingPage = pathname === '/';

  // 1. Si el usuario no tiene token y está en una ruta protegida -> Redirigir al Login
  if (isProtectedRoute && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Si el usuario TIENE token e intenta ir al login/signup o landing -> Redirigir a /friends (App Home)
  if ((isAuthRoute || isLandingPage) && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/friends';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

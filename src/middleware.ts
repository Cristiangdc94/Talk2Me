
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Permitimos el acceso público a la landing page (/)
const PUBLIC_ROUTES = ['/', '/login', '/signup'];

const PROTECTED_ROUTES_PREFIX = [
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

  const isProtectedRoute = PROTECTED_ROUTES_PREFIX.some(route => pathname.startsWith(route));
  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  // Si el usuario no tiene token y está en una ruta protegida
  if (isProtectedRoute && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si el usuario tiene token e intenta ir al login/signup
  if (isAuthRoute && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/friends'; // Redirigimos al dashboard (amigos) en lugar de la raíz
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

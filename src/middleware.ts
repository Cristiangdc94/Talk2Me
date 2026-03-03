
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas protegidas que requieren sesión
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

  // Verificar si la ruta actual es una de las protegidas
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  const isLandingPage = pathname === '/';

  // 1. Si el usuario NO tiene token e intenta acceder a una ruta protegida -> Login
  if (isProtectedRoute && !authToken) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // 2. Si el usuario TIENE token e intenta ir a Login, Signup o Landing -> Redirigir a la App (/friends)
  if ((isAuthRoute || isLandingPage) && authToken) {
    const url = new URL('/friends', request.url);
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

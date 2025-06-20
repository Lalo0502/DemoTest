import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true' || 
                         localStorage?.getItem('isAuthenticated') === 'true';

  // Lista de rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/login'];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si el usuario está autenticado y trata de acceder a una ruta pública
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
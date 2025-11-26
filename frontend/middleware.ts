import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Verificar si el token es válido
    try {
      const verifyResponse = await fetch(`${process.env.API_URL}/auth/validate-user`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      });

      if (!verifyResponse.ok) {
        // Token inválido, redirigir al login
        const response = NextResponse.redirect(new URL('/auth', request.url));
        response.cookies.delete('access_token');
        return response;
      }
    } catch (error) {
      // Error en la verificación, redirigir al login
      const response = NextResponse.redirect(new URL('/auth', request.url));
      response.cookies.delete('access_token');
      console.log(error);
      return response;
    }
  }

  // Si ya está autenticado, redirigir lejos de /auth
  if (pathname.startsWith('/auth') && token) {
    try {
      const verifyResponse = await fetch(`${process.env.API_URL}/auth/validate-user`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      });

      if (verifyResponse.ok) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (error) {
      // Si hay error en verificación, dejar que continúe a /auth
      console.log(error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth'],
};
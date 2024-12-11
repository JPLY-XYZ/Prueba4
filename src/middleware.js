import { NextResponse } from "next/server";
import { getCookie, updateCookie } from "@/lib/cookies";

const LOGIN_URL = '/login';
const PUBLIC_URL = ["/", "/login"];

const isPublicUrl = (pathname) => PUBLIC_URL.some((url) => pathname === url);

export async function middleware(request) {
  const cookie = await getCookie('session');
  console.log('MIDDLEWARE ', request.nextUrl.pathname, isPublicUrl(request.nextUrl.pathname));

  if (cookie) {
    // Si hay sesión, renovamos el tiempo de expiración de la cookie
    const newCookie = updateCookie('session', cookie);

    if (newCookie) {
      const response = NextResponse.next();
      response.cookies.set(newCookie.name, newCookie.value, { ...newCookie.options });
      return response;
    }
  }

  // Si no hay sesión y la ruta no es pública, redirigir a login
  if (!isPublicUrl(request.nextUrl.pathname)) {
    const loginUrl = new URL(LOGIN_URL, request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Todas las rutas excepto las que comienzan por:
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

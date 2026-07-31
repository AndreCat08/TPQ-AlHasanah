import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';

const LOGIN_PATH = '/admin/login';
const PUBLIC_PATHS = ['/api/admin/login', '/api/admin/logout'];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const isApi = pathname.startsWith('/api/');
  const authenticated = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === LOGIN_PATH) {
    if (authenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  if (authenticated) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json(
      { success: false, message: 'Tidak terautentikasi' },
      { status: 401 }
    );
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*', '/api/registrations'],
};

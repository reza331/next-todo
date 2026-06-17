import { NextResponse } from 'next/server';

export async function middleware(request) {

  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    '/login',
    '/register',
    '/recovery-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/recovery',
    '/api/auth/verifyrecoverycode',
    '/api/auth/getme',
  ];

  const ignoredPaths = [
    '/_next',
    '/images',
    '/fonts',
    '/favicon.ico',
  ];

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (
    ignoredPaths.some((path) => pathname.startsWith(path)) ||
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  if (!token && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const res = await fetch(`${request.nextUrl.origin}/api/auth/getme`, {
      method: 'GET',
      headers: {
        Cookie: `token=${token || ''}; refreshToken=${refreshToken || ''}`,
      },
    })

    if (res.status !== 200) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      response.cookies.delete('refreshToken');
      return response;
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Middleware error =>', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/:path*',
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // فقط مسیرهای ادمین رو چک کن (به جز لاگین)
  if (request.nextUrl.pathname.startsWith('/Admin') && 
      !request.nextUrl.pathname.startsWith('/Admin/login')) {
    
    const token = request.cookies.get('adminToken')?.value

    // اگر توکن وجود نداشت، به صفحه لاگین هدایت کن
    if (!token) {
      return NextResponse.redirect(new URL('/Admin/login', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/auth') && 
      !request.nextUrl.pathname.startsWith('/auth/login')) {
    
    const token = request.cookies.get('userToken')?.value

    // اگر توکن وجود نداشت، به صفحه لاگین هدایت کن
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // فقط مسیرهای خاص ادمین رو محافظت کن (به جز لاگین)
    '/admin/dashboard/:path*',
    '/admin/posts/:path*',
    '/admin/users/:path*',
    '/admin/settings/:path*',
    '/auth/dashboard/:path*'
  ],
};
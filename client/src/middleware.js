import { NextResponse } from 'next/server';

function isTokenExpired(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime > decoded.exp;
    } catch {
        return true; 
    }
}

export function middleware(request) {
    const token = request.cookies.get('admin_token')?.value;
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    if ((!token || isTokenExpired(token)) && !isLoginPage) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        
        response.cookies.delete('admin_token');
        response.cookies.delete('admin_username');
        return response;
    }

    if (token && !isTokenExpired(token) && isLoginPage) {
        return NextResponse.redirect(new URL('/admin/tours', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
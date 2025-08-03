import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // Force HTTPS redirect
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Handle www redirects (permanent redirect)
  if (hostname?.startsWith('www.')) {
    url.hostname = hostname.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  // Remove lang query parameters to prevent redirect loops
  if (url.searchParams.has('lang')) {
    url.searchParams.delete('lang');
    return NextResponse.redirect(url, 301);
  }

  // Ensure trailing slash consistency (Next.js export mode expects trailing slashes)
  if (url.pathname.match(/\/(privacy-policy|terms-of-service|cookie-policy)$/) && !url.pathname.endsWith('/')) {
    url.pathname = url.pathname + '/'; // Add trailing slash
    return NextResponse.redirect(url, 301);
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
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
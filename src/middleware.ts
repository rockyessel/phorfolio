import { NextRequest, NextResponse } from 'next/server';
import { findUserByUsername } from './utils/outerbase-req/users';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_vercel|/_static|[\\w-]+\\.\\w+|a/).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');
  const subdomain =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname!.replace(`.phorfolio.site`, '')
      : hostname!.replace(`.test.com:3000`, '');


  if (subdomain) {
    // validate subdomain here
    const foundUser = await findUserByUsername(subdomain);
    if (foundUser?.username) {
      // Check if the URL path starts with '/a/' and remove subdomain if so
      if (url.pathname.startsWith('/a/')) {
        url.pathname = url.pathname.replace(/^\/a\//, '/');
        return NextResponse.rewrite(url);
      } else {
        // Build the subdomain path
        const subdomainPath = `/subdomain/${foundUser.username}`;
        url.pathname = `${subdomainPath}${url.pathname}`;
        return NextResponse.rewrite(url);
      }
    }
    // url.pathname = `/404`;
    return NextResponse.next();
  }

  return NextResponse.next();
}

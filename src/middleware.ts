import { NextRequest, NextResponse } from 'next/server';
import { getUserBySubdomain } from './lib/users';
import { UserData } from './interface';

export const config = {
  matcher: ['/', '/_subdomain/:path*'],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname!.replace(`.phorfolio.site`, '')
      : hostname!.replace(`.localhost:3000`, '');

  // validate subdomain here
  const foundUser = (await getUserBySubdomain(currentHost)) as UserData;

  if (foundUser.username) {
    // Build the subdomain path
    const subdomainPath = `/subdomain/${foundUser.username}`;

    console.log('subdomainPath', subdomainPath);

    // Check the URL pathname to determine the appropriate rewrite
    if (url.pathname === '/about') {
      // Rewrite to the "about" page for the current subdomain
      url.pathname = `${subdomainPath}/about`;
      console.log('URL About: ', url);
    } else {
      // Rewrite to other paths under the current subdomain
      url.pathname = `${subdomainPath}${url.pathname}`;
      console.log('URL Subdomain: ', url);
    }

    console.log('URL Pathname: ', url);

    return NextResponse.rewrite(url);
  }

  url.pathname = `/404`;

  return NextResponse.next();
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Basic list of common scraping bots and aggressive crawlers
  const blockedBots = [
    'SemrushBot',
    'AhrefsBot',
    'MJ12bot',
    'DotBot',
    'PetalBot',
    'MauiBot',
    'MegaIndex',
    'BLEXBot',
    'DataForSeoBot'
  ];
  
  const isBot = blockedBots.some(bot => userAgent.includes(bot));
  
  if (isBot) {
    // Return a 403 Forbidden response for blocked bots
    return new NextResponse('Access Denied: Scraping is strictly prohibited on this site.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except Next.js internals and static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

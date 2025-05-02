import createMiddleware from 'next-intl/middleware';
import { locales } from './config';

export default createMiddleware({
  // List all supported locales
  locales: locales,
  // Default locale
  defaultLocale: 'en'
});

export const config = {
  // Match all pathnames except for
  // - files in the public folder
  // - API routes
  // - _next paths
  // - and all root files like favicon.ico, robots.txt, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
import createMiddleware from 'next-intl/middleware';

export const locales = ['en'];

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en)/:path*'],
};

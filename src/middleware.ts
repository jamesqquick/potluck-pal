import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

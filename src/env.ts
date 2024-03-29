import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    KINDE_CLIENT_ID: z.string(),
    KINDE_CLIENT_SECRET: z.string(),
    KINDE_ISSUER_URL: z.string(),
    KINDE_SITE_URL: z.string(),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string(),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string(),
    XATA_BRANCH: z.string(),
    XATA_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
});

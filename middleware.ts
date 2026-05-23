import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/config";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)"
]);

// next-intl middleware - does NOT redirect based on locale prefix
// Instead, it reads the locale from the NEXT_LOCALE cookie
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed" // No locale prefix in URLs
});

export default clerkMiddleware(async (auth, request) => {
  // Run next-intl middleware first to handle locale
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

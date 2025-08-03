// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "es"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const headers = { "accept-language": request.headers.get("accept-language") || "" };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets
  if (
    pathname.startsWith("/_next/") ||
    pathname.includes(".") || // Matches files with extensions (e.g., .png, .jpg)
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the detected locale for non-static paths
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Apply middleware to all paths except API routes, Next.js internals, and static assets
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
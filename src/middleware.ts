// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { adminAuth } from "@/lib/firebaseAdmin";

// export async function middleware(req: NextRequest) {
//   const cookie = req.cookies.get("__session")?.value;

//   if (!cookie) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     await adminAuth.verifySessionCookie(cookie); // <-- real verification
//     return NextResponse.next();
//   } catch (err) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard"],
// };

import createMiddleware from 'next-intl/middleware';
import { routing } from "@/i18n/routing";

export default createMiddleware({
  ...routing,
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/',
    '/(en|sv)/:path*',
    // Exclude dashboard, api, and other protected routes
    '/((?!api|_next|_vercel|dashboard|admin|.*\\..*).*)'
  ]
};
import { authMiddleware } from "@clerk/nextjs";

// export function middleware(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-url", request.url);

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

export default authMiddleware({
  publicRoutes: [
    "/api/webhooks(.*)",
    "/",
    "/api/products(.*)",
    "/category/(.*)",
    "/brand/(.*)",
    "/product/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

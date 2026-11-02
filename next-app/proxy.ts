import { NextResponse } from "next/server";

export function proxy(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/mw-redirect") {
    return NextResponse.redirect(new URL("/api/hello", request.url));
  }
  if (pathname === "/mw-rewrite") {
    return NextResponse.rewrite(new URL("/api/hello", request.url));
  }
  if (pathname === "/mw-header") {
    const headers = new Headers(request.headers);
    headers.set("x-mw-echo", "from-middleware");
    return NextResponse.next({ request: { headers } });
  }
  return NextResponse.next(); // /api/hello itself: plain pass-through
}

export const config = {
  matcher: ["/api/hello", "/mw-redirect", "/mw-rewrite", "/mw-header"],
};

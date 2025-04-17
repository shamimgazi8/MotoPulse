import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  const protectedRoutes = ["/add-review"];
  const attemptedPath = request.nextUrl.pathname;

  if (protectedRoutes.includes(attemptedPath) && !token) {
    const redirectUrl = new URL("/access-denied", request.url);
    redirectUrl.searchParams.set("from", attemptedPath);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

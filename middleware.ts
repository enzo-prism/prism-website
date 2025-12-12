import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOSTNAME = "www.design-prism.com";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const rawHost = request.headers.get("host") ?? url.host;
  const hostname = rawHost.split(":")[0].toLowerCase();
  const proto = (
    request.headers.get("x-forwarded-proto") ??
    url.protocol.replace(":", "")
  ).toLowerCase();

  const isPrismHostname =
    hostname === "design-prism.com" || hostname === CANONICAL_HOSTNAME;

  let shouldRedirect = false;

  if (isPrismHostname && (hostname !== CANONICAL_HOSTNAME || proto !== "https")) {
    url.protocol = "https:";
    url.host = CANONICAL_HOSTNAME;
    shouldRedirect = true;
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};


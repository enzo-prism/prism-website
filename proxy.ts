import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOSTNAME = "www.design-prism.com";

export function shouldNoindexBlogIndex(searchParams: URLSearchParams): boolean {
  const q = (searchParams.get("q") ?? "").trim();
  const category = (searchParams.get("category") ?? "").trim();

  if (q.length > 0) return true;
  if (category.length > 0 && category.toLowerCase() !== "all") return true;

  return false;
}

export function proxy(request: NextRequest) {
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
    // Assigning `host` leaves any existing port intact (WHATWG URL semantics),
    // which would emit https://www.design-prism.com:3000/... off the default
    // port. Set hostname + clear port explicitly, same as app/sitemap.ts.
    url.hostname = CANONICAL_HOSTNAME;
    url.port = "";
    shouldRedirect = true;
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  if (url.pathname === "/blog" && shouldNoindexBlogIndex(url.searchParams)) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

export const config = {
  // Skip Next's own asset pipeline and static files: canonical-host and
  // trailing-slash redirects only matter for page routes, and running the
  // proxy on /_next/* + media added invocation latency to requests that
  // should be pure CDN hits.
  //
  // Only list a directory here when it holds assets the extension alternative
  // below cannot cover (public/animations ships extensionless frame files) AND
  // no page route shares its name. `case-studies/` used to be listed, which
  // silently exempted the 20 indexable /case-studies/<slug> pages from the
  // canonical-host redirect — every one of them served 200 on the apex host
  // instead of 301ing to www. Its assets are all image files, so the extension
  // alternative already excludes them.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon-rounded.png|animations/|ascii/|logos/|pixelish/|home-hero/|unicorn/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|json|js|css|map|woff|woff2|ttf|otf|mp4|webm|mp3)$).*)",
  ],
};

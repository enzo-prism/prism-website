import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define a mapping of old paths to new paths
const redirects: Record<string, string> = {
  // Delete /our-work page - redirect to case studies
  "/our-work": "/case-studies",

  // Remove the /about redirect since we're now creating this page
  // "/about": "/",

  // Update existing redirects that were pointing to now-deleted pages
  "/about-us": "/about", // Was redirecting to /, now redirects to /about
  "/dr-kris-hamamoto": "/", // Was redirecting to /our-work, now redirects to /

  // Doctor profile pages - redirect directly to case studies instead of homepage
  "/dr-chris-wong": "/case-studies/dr-christopher-wong", // Was redirecting to homepage

  // These redirects remain unchanged
  "/our-services": "/",
  // "/blog": "/", // REMOVED - We now have a blog page
  "/pod": "/",
  "/refer": "/get-started",
  "/tools": "/services", // Redirect tools page to services

  // Also redirect all case study pages to the new case studies structure
  "/our-work/town-centre-dental-case-study": "/case-studies",
  "/our-work/olympic-bootworks-case-study": "/case-studies",
  "/our-work/chris-wong-case-study": "/case-studies/dr-christopher-wong",
  "/our-work/belize-kids-case-study": "/case-studies",
  "/our-work/restaurant-app-case-study": "/case-studies",
  "/our-work/rebellious-aging-case-study": "/case-studies",
  "/our-work/grace-dental-case-study": "/case-studies",
  "/our-work/leadership-summit-case-study": "/case-studies",
}

// Track redirects for analytics
const trackRedirect = (from: string, to: string) => {
  // In a real implementation, you would send this data to your analytics service
  console.log(`Redirect: ${from} -> ${to}`)
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is in our redirects map
  if (redirects[path]) {
    // Get the destination from our redirects map
    const destination = redirects[path]

    // Track the redirect for analytics
    trackRedirect(path, destination)

    // Create a new URL for the redirect destination
    const url = new URL(destination, request.url)

    // Return a 301 (permanent) redirect
    return NextResponse.redirect(url, 301)
  }

  // If no redirect is needed, continue with the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    "/about",
    "/our-work",
    "/about-us",
    "/our-services",
    "/dr-kris-hamamoto",
    "/dr-chris-wong",
    // "/blog", // REMOVED - We now have a blog page
    "/pod",
    "/refer",
    "/tools",
    "/our-work/:path*", // This will match all paths under /our-work/
  ],
}

"use client"

import { usePathname } from "next/navigation"
import StickyCTA from "./StickyCTA"

const ALLOWED_ROUTES = new Set([
  "/get-started",
  "/pricing-dental",
  "/services",
  "/",
])

export default function RouteAwareStickyCTA() {
  const pathname = usePathname()

  if (!ALLOWED_ROUTES.has(pathname)) return null
  return <StickyCTA />
}

"use client"

import { usePathname } from "next/navigation"
import StickyCTA from "./StickyCTA"

const ALLOWED_ROUTES = new Set([
  "/pricing",
  "/pricing-dental",
  "/pricing",
  "/services",
  "/",
])

export default function RouteAwareStickyCTA() {
  const pathname = usePathname()

  if (!ALLOWED_ROUTES.has(pathname)) return null
  return <StickyCTA />
}

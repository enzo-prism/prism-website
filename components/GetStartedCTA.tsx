"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { trackCTAClick } from "@/utils/analytics"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

/**
 * Deliberately framer-motion free.
 *
 * This CTA renders at the foot of every blog post, and importing `motion` here
 * put ~276 KB of framer-motion into the client bundle for all ~88 articles —
 * the single largest blog-only cost, on the site's main organic surface.
 *
 * None of that bought any motion. The section passed `initial="hidden"` /
 * `whileInView="visible"`, but the `fadeInUp` and `springScale` variants it
 * referenced only define `initial` / `animate` / `exit` keys. With no matching
 * variant names, framer resolved nothing and the scroll reveal never ran. The
 * one animation that did work was the arrow's hover nudge, which is a
 * `group-hover` transform below.
 */

interface GetStartedCTAProps {
  heading: string
  description?: string
  analyticsLabel: string
  variant?: "light" | "dark" | "gradient"
  className?: string
}

export default function GetStartedCTA({
  heading,
  description,
  analyticsLabel,
  variant = "light",
  className = ""
}: GetStartedCTAProps) {
  const ctaText = FREE_AUDIT_CTA_TEXT

  const getBackgroundClasses = () => {
    switch (variant) {
      case "dark":
        return "bg-neutral-900 text-white"
      case "gradient":
        return "bg-gradient-to-br from-neutral-50 to-white"
      default:
        return "bg-neutral-50"
    }
  }

  return (
    <section className={`py-16 md:py-24 ${getBackgroundClasses()} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl mb-6 ${
              variant === "dark" ? "text-white" : "text-neutral-900"
            }`}
          >
            {heading}
          </h2>

          {description && (
            <p
              className={`mx-auto max-w-2xl text-lg lowercase leading-relaxed mb-8 ${
                variant === "dark" ? "text-neutral-200" : "text-neutral-600"
              }`}
            >
              {description}
            </p>
          )}

          <div>
            <Button 
              size="lg" 
              asChild 
              className={`px-8 py-4 text-lg lowercase min-h-[44px] rounded-full ${
                variant === "dark" 
                  ? "bg-white text-neutral-900 hover:bg-neutral-100" 
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              <Link
                href="/free-analysis"
                onClick={() => trackCTAClick(ctaText, analyticsLabel)}
                className="group"
              >
                <span className="flex items-center transition-transform duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

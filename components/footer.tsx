"use client"

import { LOGO_CONFIG } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import Link from "next/link"
import { useEffect, useState } from "react"
import CoreImage from "./core-image"

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) {
    return (
      <footer className="border-t bg-gray-50/50">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <p className="text-xs text-neutral-500 lowercase">prism © 2023-2025.</p>
        </div>
      </footer>
    )
  }
  // Navigation items matching the navbar
  const navItems = [
    { emoji: "🏠", label: "home", href: "/" },
    { emoji: "🖥️", label: "websites", href: "/websites" },
    { emoji: "📱", label: "apps", href: "/apps" },
    { emoji: "🎨", label: "designs", href: "/designs" },
    { emoji: "📣", label: "ads", href: "/ads" },
    { emoji: "📍", label: "local listings", href: "/local-listings" },
    { emoji: "💸", label: "pricing", href: "/pricing" },
    { emoji: "🎁", label: "offers", href: "/offers" },
    { emoji: "✍️", label: "blog", href: "/blog" },
    { emoji: "🎙️", label: "podcast", href: "/podcast" },
    { emoji: "🤍", label: "wall of love", href: "/wall-of-love" },
    { emoji: "✅", label: "prism proof", href: "/proof" },
    { emoji: "🤝", label: "contact", href: "/contact" },
    { emoji: "🚀", label: "start", href: "/get-started" },
  ]

  return (
    <footer className="border-t bg-gray-50/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg isolate">
                <CoreImage
                  src={LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={32}
                  height={32}
                  className={`object-contain w-full h-full ${LOGO_CONFIG.className} overflow-hidden`}
                  priority
                  fallbackSrc={LOGO_CONFIG.fallbackSrc}
                  trackingId="footer_logo"
                  quality={90}
                />
              </div>
              <span className="text-2xl font-bold lowercase">prism</span>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              websites, local listing optimization, and online ad management that grow your business. we turn online
              searches into booked revenue.
            </p>
          </div>

          {/* Navigation section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-neutral-900 mb-4">explore</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const handleClick = (e: React.MouseEvent) => {
                  trackNavigation(`footer_${item.label}`, item.href)
                  
                  // Handle smooth scrolling for hash links
                  if (item.href.startsWith('/#')) {
                    e.preventDefault()
                    const elementId = item.href.substring(2)
                    const element = document.getElementById(elementId)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      // If element not found, navigate to homepage first
                      window.location.href = item.href
                    }
                  }
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    onClick={handleClick}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span className="lowercase">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-neutral-900 mb-4">legal</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/privacy-policy"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                onClick={() => trackNavigation("footer_privacy_policy", "/privacy-policy")}
              >
                privacy policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                onClick={() => trackNavigation("footer_terms_of_service", "/terms-of-service")}
              >
                terms of service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                onClick={() => trackNavigation("footer_contact", "/contact")}
              >
                contact
              </Link>
              <Link
                href="/careers"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                onClick={() => trackNavigation("footer_careers", "/careers")}
              >
                careers
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 lowercase">prism © 2023-2025. all rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs text-neutral-500 lowercase">made with 🤍 for growing businesses</p>
            <div className="flex items-center gap-x-3 text-sm">
              {" "}
              {/* Added text-sm for consistency if desired */}
              <Link
                href="https://www.instagram.com/the_design_prism/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prism Agency on Instagram"
                onClick={() =>
                  trackNavigation("footer_social_instagram", "https://www.instagram.com/the_design_prism/")
                }
                className="text-neutral-500 hover:text-neutral-900 transition-colors lowercase"
              >
                Instagram
              </Link>
              <Link
                href="https://www.youtube.com/@the_design_prism"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prism Agency on YouTube"
                onClick={() => trackNavigation("footer_social_youtube", "https://www.youtube.com/@the_design_prism")}
                className="text-neutral-500 hover:text-neutral-900 transition-colors lowercase"
              >
                YouTube
              </Link>
              <Link
                href="https://x.com/NosisTheGod"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prism Agency on X (formerly Twitter)"
                onClick={() => trackNavigation("footer_social_twitter_x", "https://x.com/NosisTheGod")}
                className="text-neutral-500 hover:text-neutral-900 transition-colors lowercase"
              >
                X
              </Link>
              <Link
                href="https://www.tiktok.com/@the_design_prism"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prism Agency on TikTok"
                onClick={() => trackNavigation("footer_social_tiktok", "https://www.tiktok.com/@the_design_prism")}
                className="text-neutral-500 hover:text-neutral-900 transition-colors lowercase"
              >
                TikTok
              </Link>
              <Link
                href="https://www.linkedin.com/company/web-prism/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prism Agency on LinkedIn"
                onClick={() =>
                  trackNavigation(
                    "footer_social_linkedin",
                    "https://www.linkedin.com/company/web-prism/?viewAsMember=true",
                  )
                }
                className="text-neutral-500 hover:text-neutral-900 transition-colors lowercase"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

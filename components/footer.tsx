"use client"

import Link from "next/link"
import { trackNavigation } from "@/utils/analytics"
import CoreImage from "./core-image"

export default function Footer() {
  // Navigation items matching the navbar
  const navItems = [
    { emoji: "🏠", label: "home", href: "/" },
    { emoji: "🖥️", label: "websites", href: "/websites" },
    { emoji: "📱", label: "apps", href: "/apps" },
    { emoji: "🎨", label: "designs", href: "/designs" },
    { emoji: "🎁", label: "offers", href: "/offers" },
    { emoji: "✍️", label: "blog", href: "/blog" },
    { emoji: "🎙️", label: "podcast", href: "/podcast" },
    { emoji: "❤️", label: "wall of love", href: "/wall-of-love" },
    { emoji: "💰", label: "affiliate", href: "/affiliate" },
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
                  src="/prism-logo-new.svg"
                  alt="Prism logo"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full rounded-lg overflow-hidden"
                  priority
                  fallbackSrc="/prism-logo.jpeg"
                  trackingId="footer_logo"
                  quality={90}
                />
              </div>
              <span className="text-2xl font-bold lowercase">prism</span>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              beautiful websites, apps, and designs that help your business grow. we create digital experiences that
              convert visitors into customers.
            </p>
          </div>

          {/* Navigation section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-neutral-900 mb-4">explore</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  onClick={() => trackNavigation(`footer_${item.label}`, item.href)}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="lowercase">{item.label}</span>
                </Link>
              ))}
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
            <p className="text-xs text-neutral-500 lowercase">made with ❤️ for growing businesses</p>
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

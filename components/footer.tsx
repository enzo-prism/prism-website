"use client"

import { LOGO_CONFIG } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import Link from "next/link"
import { useEffect, useState } from "react"
import CoreImage from "./core-image"

const footerSections = [
  {
    title: "solutions",
    items: [
      { label: "Websites", href: "/websites" },
      { label: "Dental photography", href: "/dental-photography" },
      { label: "Local listings", href: "/local-listings" },
      { label: "Ads", href: "/ads" },
      { label: "Apps", href: "/apps" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "proof",
    items: [
      { label: "Case studies", href: "/case-studies" },
      { label: "Success stories", href: "/success-stories" },
      { label: "Wall of love", href: "/wall-of-love" },
      { label: "Prism proof", href: "/proof" },
      { label: "Refer a partner", href: "/refer" },
    ],
  },
  {
    title: "resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Growth library", href: "/growth" },
      { label: "AI website launch", href: "/ai-website-launch" },
      { label: "Dental playbooks", href: "/why-dental-practices-love-prism" },
    ],
  },
  {
    title: "get started",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Free analysis", href: "/free-analysis" },
      { label: "Book a shoot", href: "/book-a-shoot" },
      { label: "Contact", href: "/contact" },
      { label: "Get started", href: "/get-started" },
    ],
  },
]

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/the_design_prism/", id: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@the_design_prism", id: "youtube" },
  { label: "X", href: "https://x.com/NosisTheGod", id: "twitter_x" },
  { label: "TikTok", href: "https://www.tiktok.com/@the_design_prism", id: "tiktok" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/web-prism/?viewAsMember=true",
    id: "linkedin",
  },
]

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) {
    return (
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <p className="text-xs text-neutral-500 lowercase">prism © 2023-2025.</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <CoreImage
                  src={LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={32}
                  height={32}
                  className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
                  priority
                  fallbackSrc={LOGO_CONFIG.fallbackSrc}
                  trackingId="footer_logo"
                  quality={90}
                />
              </div>
              <span className="text-2xl font-semibold lowercase">prism</span>
            </div>
            <p className="text-sm text-neutral-600">
              Growth studio for dental practices, local shops, and community brands. Websites, photography, and ad ops
              run by one integrated team.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              silicon valley · serving teams nationwide
            </p>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">{section.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-neutral-900"
                        onClick={() => trackNavigation(`footer_${section.title}_${item.label}`, item.href)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-100 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-xs text-neutral-500">
            <p>prism © 2023-2025. all rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-neutral-900"
                onClick={() => trackNavigation("footer_privacy_policy", "/privacy-policy")}
              >
                privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-neutral-900"
                onClick={() => trackNavigation("footer_terms_of_service", "/terms-of-service")}
              >
                terms
              </Link>
              <Link
                href="/careers"
                className="hover:text-neutral-900"
                onClick={() => trackNavigation("footer_careers", "/careers")}
              >
                careers
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prism on ${social.label}`}
                className="hover:text-neutral-900"
                onClick={() => trackNavigation(`footer_social_${social.id}`, social.href)}
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

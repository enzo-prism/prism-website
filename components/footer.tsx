"use client"

import { LOGO_CONFIG } from "@/lib/constants"
import { trackNavigation } from "@/utils/analytics"
import Link from "next/link"
import { useEffect, useState } from "react"
import CoreImage from "./core-image"

type FooterItem = {
  label: string
  href?: string
}

type FooterSection = {
  title: string
  items: FooterItem[]
}

const homeLink: FooterItem = { label: "Home", href: "/" }

const footerSections: FooterSection[] = [
  {
    title: "Core services",
    items: [
      { label: "Website", href: "/websites" },
      { label: "Ads", href: "/ads" },
      { label: "Map listings", href: "/local-listings" },
    ],
  },
  {
    title: "Customers we serve",
    items: [
      { label: "Dentists", href: "/why-dental-practices-love-prism" },
      { label: "Consulting companies", href: "/why-consulting-companies-love-prism" },
      { label: "Annual leadership events" },
      { label: "Online communities", href: "/why-online-community-founders-love-prism" },
      { label: "Education companies" },
      { label: "Private vacation rentals" },
      { label: "Nonprofits", href: "/why-nonprofits-love-prism" },
    ],
  },
  {
    title: "Results",
    items: [
      { label: "Wall of love", href: "/wall-of-love" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Our story", href: "/about" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
]

const navSections: FooterSection[] = [{ title: "Home", items: [homeLink] }, ...footerSections]

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
            <p className="text-sm text-neutral-600">impossible is temporary.</p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">silicon valley</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={homeLink.href!}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium lowercase text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900 sm:w-auto"
                onClick={() => trackNavigation("footer_home", homeLink.href!)}
              >
                go to homepage
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-5 py-2 text-sm font-semibold lowercase text-white transition hover:bg-neutral-800 sm:w-auto"
                onClick={() => trackNavigation("footer_contact_cta", "/contact")}
              >
                contact prism
              </Link>
            </div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">{section.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="transition-colors hover:text-neutral-900"
                          onClick={() => trackNavigation(`footer_${section.title}_${item.label}`, item.href!)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-neutral-400">{item.label}</span>
                      )}
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

import { LOGO_CONFIG } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"

type FooterItem = {
  label: string
  href?: string
}

type FooterSection = {
  title: string
  items: FooterItem[]
}

const homeLink: FooterItem = { label: "Homepage", href: "/" }

const footerSections: FooterSection[] = [
  {
  title: "Core services",
  items: [
    { label: "Website", href: "/websites" },
    { label: "Design", href: "/designs" },
    { label: "Ads", href: "/ads" },
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
      { label: "Library", href: "/library" },
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Our story", href: "/about" },
      { label: "Get Started", href: "/get-started" },
    ],
  },
]

const navSections: FooterSection[] = [{ title: "Site links", items: [homeLink] }, ...footerSections]

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
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <Image
                  src={LOGO_CONFIG.fallbackSrc ?? LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={32}
                  height={32}
                  className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
                />
              </div>
              <span className="text-2xl font-semibold uppercase font-pixel tracking-[0.12em]">prism</span>
            </div>
            <p className="text-sm text-muted-foreground">impossible is temporary.</p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-pixel">silicon valley</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={homeLink.href!}
                className="inline-flex w-full items-center justify-center rounded-md border border-border/60 bg-transparent px-5 py-2 text-xs font-semibold uppercase font-pixel tracking-[0.18em] text-muted-foreground transition hover:border-border hover:bg-muted/60 hover:text-foreground sm:w-auto"
              >
                go to homepage
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-2 text-xs font-semibold uppercase font-pixel tracking-[0.18em] text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
              >
                contact prism
              </Link>
            </div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground font-pixel">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground font-pixel">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>prism © 2023-2025. all rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-foreground"
              >
                privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-foreground"
              >
                terms
              </Link>
              <Link
                href="/careers"
                className="hover:text-foreground"
              >
                careers
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prism on ${social.label}`}
                className="hover:text-foreground"
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

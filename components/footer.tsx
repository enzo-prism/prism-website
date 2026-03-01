import { LOGO_CONFIG } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"

type FooterItem = {
  href: string
  label: string
}

type FooterSection = {
  items: FooterItem[]
  title: string
}

const footerSections: FooterSection[] = [
  {
    title: "Services",
    items: [
      { label: "Websites", href: "/websites" },
      { label: "Design", href: "/designs" },
      { label: "Ads", href: "/ads" },
      { label: "Local SEO", href: "/local-seo-services" },
    ],
  },
  {
    title: "Offers",
    items: [
      { label: "Free expert audit", href: "/free-analysis" },
      { label: "Website overhaul", href: "/pricing" },
      { label: "Growth partnership", href: "/pricing" },
      { label: "Book strategy call", href: "/get-started#book-call" },
    ],
  },
  {
    title: "Proof",
    items: [
      { label: "Case studies", href: "/case-studies" },
      { label: "Wall of love", href: "/wall-of-love" },
      { label: "Dental success stories", href: "/why-dental-practices-love-prism" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
]

const socialLinks = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/the_design_prism/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@the_design_prism" },
  { id: "twitter_x", label: "X", href: "https://x.com/NosisTheGod" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@the_design_prism" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/web-prism/?viewAsMember=true" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-background/95">
      <div className="container mx-auto px-4 py-14 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)] lg:items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-border/60">
                <Image
                  src={LOGO_CONFIG.fallbackSrc ?? LOGO_CONFIG.src}
                  alt={LOGO_CONFIG.alt}
                  width={32}
                  height={32}
                  className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
                />
              </div>
              <div>
                <p className="font-pixel text-xl uppercase tracking-[0.14em] text-foreground">prism</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-pixel">
                  silicon valley
                </p>
              </div>
            </div>

            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Prism builds conversion-first websites and growth systems for local teams that want measurable results,
              fast execution, and one integrated partner.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-muted-foreground">
                13+ launches delivered
              </span>
              <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-muted-foreground">
                7-day execution
              </span>
              <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-muted-foreground">
                websites + ads + SEO
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started#book-call"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary/90"
              >
                book a 30-min call
              </Link>
              <Link
                href="/free-analysis"
                className="inline-flex items-center justify-center rounded-md border border-border/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition hover:border-border hover:bg-muted/60 hover:text-foreground"
              >
                get a free audit
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="font-pixel text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="transition-colors hover:text-foreground">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-border/60 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-muted-foreground">
            <p>Prism © 2023-{currentYear}. All rights reserved.</p>
            <p className="text-xs">Built in Silicon Valley. Serving teams worldwide.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link href="/privacy-policy" className="hover:text-foreground">
                privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-foreground">
                terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                contact
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
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

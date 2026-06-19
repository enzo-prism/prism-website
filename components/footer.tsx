import Link from 'next/link'
import TrackedLink from '@/components/tracked-link'

type FooterItem = {
  href: string
  label: string
}

type FooterColumn = {
  heading: string
  links: FooterItem[]
}

const footerColumns: FooterColumn[] = [
  {
    heading: 'System',
    links: [
      { label: 'Founder OS', href: '/founder-os' },
      { label: 'Websites', href: '/websites' },
      { label: 'SEO', href: '/seo' },
      { label: 'AI search', href: '/ai-seo-services' },
      { label: 'Ads', href: '/ads' },
      { label: 'Local listings', href: '/local-listings' },
      { label: 'All services', href: '/services' },
    ],
  },
  {
    heading: 'Proof',
    links: [
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Wall of love', href: '/wall-of-love' },
      { label: 'Prism Proof', href: '/proof' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const socialLinks = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/the_design_prism/',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@the_design_prism',
  },
  { id: 'twitter_x', label: 'X', href: 'https://x.com/NosisTheGod' },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@the_design_prism',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/web-prism/?viewAsMember=true',
  },
]

type FooterProps = {
  variant?: 'default' | 'home'
}

export default function Footer({ variant: _variant = 'default' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/12 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]">
                prism
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8f877b]">
                impossible is temporary
              </p>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#b8afa2]">
              Conversion-first websites. One growth system.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
              <TrackedLink
                href="/get-started"
                label="Free audit"
                location="footer"
                className="inline-flex min-h-12 items-center border-b border-[#f5f0e8] pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors hover:text-white"
              >
                Free audit
              </TrackedLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-white/12 pt-6 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
            {footerColumns.map((column) => (
              <div key={column.heading} className="space-y-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f877b]">
                  {column.heading}
                </p>
                <ul className="space-y-2">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="text-sm text-[#b8afa2] transition-colors hover:text-[#f5f0e8]"
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

        <div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-[#8f877b]">
            <p>Prism © 2023-{currentYear}.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link
                href="/privacy-policy"
                prefetch={false}
                className="transition-colors hover:text-[#f5f0e8]"
              >
                privacy
              </Link>
              <Link
                href="/terms-of-service"
                prefetch={false}
                className="transition-colors hover:text-[#f5f0e8]"
              >
                terms
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="transition-colors hover:text-[#f5f0e8]"
              >
                contact
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.12em] text-[#8f877b]">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prism on ${social.label}`}
                className="transition-colors hover:text-[#f5f0e8]"
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

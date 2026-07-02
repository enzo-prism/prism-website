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
    heading: 'Offers',
    links: [
      { label: 'Website — $300', href: '/websites' },
      { label: 'Content OS', href: '/content-os' },
      { label: 'Dental OS', href: '/dental-os' },
      { label: 'Prism Infinity', href: '/prism-infinity' },
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
      { label: 'Refer a friend — $100', href: '/refer' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

type SocialLink = {
  id: string
  label: string
  href: string
  /** simple-icons 24×24 glyph path, drawn with `currentColor`. */
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/the_design_prism/',
    icon: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@the_design_prism',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    id: 'twitter_x',
    label: 'X',
    href: 'https://x.com/NosisTheGod',
    icon: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@the_design_prism',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/web-prism/?viewAsMember=true',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

const legalLinks: FooterItem[] = [
  { label: 'privacy', href: '/privacy-policy' },
  { label: 'terms', href: '/terms-of-service' },
  { label: 'contact', href: '/contact' },
]

// Shared visible-focus ring; per-link offset is appended at the call site.
const focusRing =
  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-black'

type FooterProps = {
  variant?: 'default' | 'home'
}

export default function Footer({ variant: _variant = 'default' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/12 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        {/* Top region: brand block + link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Brand block */}
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]">
                prism
              </p>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#8f877b]">
                impossible is temporary
              </p>
            </div>

            <p className="text-sm leading-7 text-pretty text-[#b8afa2]">
              Conversion-first websites. One growth system.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
              <TrackedLink
                href="/websites"
                label="Order a website"
                location="footer"
                className={`group inline-flex min-h-11 w-full items-center justify-between gap-3 border-b border-[#f5f0e8] pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors hover:text-white focus-visible:ring-offset-4 sm:w-auto sm:justify-start ${focusRing}`}
              >
                Order a website
                <span
                  aria-hidden="true"
                  className="text-[#8f877b] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#f5f0e8]"
                >
                  →
                </span>
              </TrackedLink>
              <TrackedLink
                href="/get-started"
                label="Get started free"
                location="footer"
                className={`group inline-flex min-h-11 w-full items-center justify-between gap-3 border-b border-white/30 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#b8afa2] transition-colors hover:border-[#f5f0e8] hover:text-[#f5f0e8] focus-visible:ring-offset-4 sm:w-auto sm:justify-start ${focusRing}`}
              >
                Get started free
                <span
                  aria-hidden="true"
                  className="text-[#8f877b] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#f5f0e8]"
                >
                  →
                </span>
              </TrackedLink>
            </div>
          </div>

          {/* Link columns: 1 col on phones, 3 cols from 480px up, beside the brand on lg */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 min-[480px]:grid-cols-3 lg:gap-x-12 lg:border-t-0 lg:pt-0"
          >
            {footerColumns.map((column) => (
              <div key={column.heading} className="space-y-3.5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f877b]">
                  {column.heading}
                </p>
                <ul className="space-y-1">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className={`inline-flex min-h-11 items-center rounded-sm text-sm text-[#b8afa2] transition-colors hover:text-[#f5f0e8] focus-visible:ring-offset-2 ${focusRing}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar: copyright + legal, then socials — stacks on mobile, aligns on desktop */}
        <div className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 text-[#8f877b] sm:flex-row sm:items-center sm:gap-5">
            <p className="font-mono text-[11px] tracking-[0.08em]">
              Prism © 2023-{currentYear}.
            </p>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-white/15 sm:block"
            />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`inline-flex min-h-11 items-center rounded-sm text-xs text-[#8f877b] transition-colors hover:text-[#f5f0e8] focus-visible:ring-offset-2 ${focusRing}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="-ml-2.5 flex flex-wrap items-center gap-1 sm:gap-2 md:-mr-2.5 md:ml-0">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prism on ${social.label}`}
                className={`inline-flex size-11 items-center justify-center rounded-md text-[#8f877b] transition-colors hover:bg-white/5 hover:text-[#f5f0e8] focus-visible:ring-offset-2 ${focusRing}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={social.icon} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

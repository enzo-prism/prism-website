type PricingTokenRule = {
  label: string
  pattern: RegExp
}

export type PricingConsistencyViolation = {
  filePath: string
  line: number
  label: string
  excerpt: string
}

export const PRICING_STRICT_FILES = [
  'app/pricing/client-page.tsx',
  'components/pricing/PricingHero.tsx',
  'lib/pricing-model.ts',
  'app/faq/page.tsx',
  'app/services/page.tsx',
  'app/websites/page.tsx',
  'app/ads/page.tsx',
  'app/chatgpt-ads/page.tsx',
  'app/seo/page.tsx',
  'app/local-listings/page.tsx',
  'components/footer.tsx',
  'components/social-link-hub.tsx',
  'components/home/HomeOffersSection.tsx',
  'components/home/HomeHeroSection.tsx',
  'app/content/page.tsx',
  'app/dental-os/page.tsx',
  'app/prism-infinity/page.tsx',
  'app/dental-website/page.tsx',
  'app/waitlist/page.tsx',
  'lib/services.ts',
  'lib/waitlist.ts',
  'app/sitemap.ts',
  'next.config.mjs',
] as const

export const PRICING_CONTEXT_RULES: Record<string, RegExp[]> = {
  'app/refer/page.tsx': [/referral payout/i, /not service pricing/i],
  // Editorial market-rate comparisons (e.g. "$5,000–$25,000 agency range") are
  // allowed as long as the Prism section stays call-first.
  'content/blog/dental-website-cost-guide-2026.mdx': [
    /What Prism charges/i,
    /scoped on a 30-minute call/i,
  ],
  'app/google/dental-ads/page.tsx': [
    /ad fee examples/i,
    /not Prism core pricing/i,
  ],
  'app/dental-photography/before-after/GuideTabs.tsx': [
    /equipment budget/i,
    /not prism service pricing/i,
  ],
}

export const LEGACY_PRICING_TOKEN_RULES: PricingTokenRule[] = [
  {
    label: '$1,000 one-time retired website overhaul price',
    pattern: /\$1,000 one-time/i,
  },
  {
    label: 'Website Overhaul retired offer name',
    pattern: /Website Overhaul/i,
  },
  {
    label: 'Growth Partnership retired offer name',
    pattern: /Growth Partnership/i,
  },
  {
    label: 'Free Expert Audit retired offer name',
    pattern: /Free Expert Audit/i,
  },
  {
    label: 'Deep Growth Audit retired offer name',
    pattern: /Deep Growth Audit/i,
  },
  { label: 'Growth Sprint retired offer name', pattern: /\bGrowth Sprint\b/i },
  {
    label: 'Growth Partner retired offer name',
    pattern: /\bGrowth Partner\b/i,
  },
  { label: '$400 legacy website price', pattern: /\$400\b/ },
  { label: '$900/mo legacy plan price', pattern: /\$900\/mo\b/i },
  { label: '$1,500/mo legacy plan price', pattern: /\$1,500\/mo\b/i },
  { label: '$2,500 legacy website price', pattern: /\$2,500\b/ },
  { label: '$297 legacy monthly plan price', pattern: /\$297\b/ },
  { label: '$97 legacy support plan price', pattern: /\$97\b/ },
  { label: '$3,000/mo legacy dental plan price', pattern: /\$3,000\/mo\b/i },
  { label: '$3,600/mo legacy bundle price', pattern: /\$3,600\/mo\b/i },
  { label: '$1,100/mo legacy bundle price', pattern: /\$1,100\/mo\b/i },
  { label: '$1,400/mo legacy bundle price', pattern: /\$1,400\/mo\b/i },
  { label: '$300/mo legacy bundle price', pattern: /\$300\/mo\b/i },
  {
    label: 'starting around $1,000 wording',
    pattern: /starting around \$1,000/i,
  },
  { label: '~$1,000 wording', pattern: /~\$1,000/i },
  { label: '$1,000/mo legacy dental price', pattern: /\$1,000\/mo\b/i },
  { label: 'from $1,500/mo wording', pattern: /from \$1,500\/mo/i },
  // 2026-07-27 call-first repositioning: NO offer shows public exact pricing.
  // 2026-09-14 waitlist revision: every offer's primary action is WAITLIST_CTA
  // (lib/waitlist.ts); scope is agreed once Prism reaches out.
  {
    label: '$5,000 retired public Content OS setup price',
    pattern: /\$5,000\b/,
  },
  {
    label: '$1,000/month retired public Content OS monthly price',
    pattern: /\$1,000\/month\b/i,
  },
  {
    label: '$2,000/month retired public Prism Infinity price',
    pattern: /\$2,000\/month\b/i,
  },
  {
    label: '$300 retired public website price',
    pattern: /\$300\b/,
  },
  {
    label: '$100/month retired public website care price',
    pattern: /\$100\/month\b/i,
  },
]

export const REQUIRED_CANONICAL_SNIPPETS: Record<string, string[]> = {
  'app/pricing/client-page.tsx': [
    'growthPathSteps',
    'pricingSnapshot',
    'partnerLevels',
    'PricingStructuredData',
  ],
  'components/pricing/PricingHero.tsx': [
    'A clearer way to invest in growth.',
    'PRICING_PRIMARY_CTA',
  ],
  'lib/pricing-model.ts': [
    'WAITLIST_CTA',
    'NO offer shows public',
    'Prism is at capacity',
  ],
  'lib/waitlist.ts': [
    "label: 'Join the waitlist'",
    'Prism is fully booked right now.',
  ],
  'app/websites/page.tsx': [
    'Prism PRO website',
    'WEBSITE_WAITLIST_CTA',
    'Support discovery on Google and in AI.',
  ],
  'components/social-link-hub.tsx': ['WAITLIST_FOCUS_HREFS'],
  'components/footer.tsx': ['WAITLIST_CTA'],
}

/**
 * Waitlist funnel (2026-09-14): booking a call is no longer a public primary
 * action. These tokens must not reappear on pricing-sensitive surfaces.
 */
export const RETIRED_CTA_TOKEN_RULES: PricingTokenRule[] = [
  { label: 'BOOK_A_CALL_CTA retired booking constant', pattern: /BOOK_A_CALL_CTA/ },
  { label: 'WEBSITE_START_CTA retired intake constant', pattern: /WEBSITE_START_CTA/ },
  { label: 'Book a Free Demo retired public CTA label', pattern: /Book a Free Demo/i },
  { label: 'Start my website retired public CTA label', pattern: /Start my website/i },
  {
    // Redirect *sources* in next.config.mjs may name the old routes; links and
    // redirect destinations may not.
    label: 'retired service intake route used as a destination',
    pattern: /(?:href|destination)\s*[=:]\s*[{"'`]+\/(website|content|ads)-intake\b/,
  },
]

export function collectPricingConsistencyViolations(
  filePath: string,
  content: string,
): PricingConsistencyViolation[] {
  const violations: PricingConsistencyViolation[] = []
  const isStrictFile = PRICING_STRICT_FILES.includes(
    filePath as (typeof PRICING_STRICT_FILES)[number],
  )
  const contextChecks = PRICING_CONTEXT_RULES[filePath]
  const hasContextLabel = contextChecks
    ? contextChecks.every((pattern) => pattern.test(content))
    : false

  const tokenRules = isStrictFile
    ? [...LEGACY_PRICING_TOKEN_RULES, ...RETIRED_CTA_TOKEN_RULES]
    : LEGACY_PRICING_TOKEN_RULES

  if (isStrictFile || contextChecks) {
    for (const rule of tokenRules) {
      const regex = new RegExp(
        rule.pattern.source,
        rule.pattern.flags.includes('g')
          ? rule.pattern.flags
          : `${rule.pattern.flags}g`,
      )
      let match: RegExpExecArray | null = regex.exec(content)
      while (match) {
        const index = match.index
        const line = content.slice(0, index).split('\n').length
        const excerpt = content.split('\n')[line - 1]?.trim() ?? ''
        if (!(contextChecks && hasContextLabel)) {
          violations.push({
            filePath,
            line,
            label: rule.label,
            excerpt,
          })
        }
        match = regex.exec(content)
      }
    }
  }

  const requiredSnippets = REQUIRED_CANONICAL_SNIPPETS[filePath]
  if (requiredSnippets) {
    for (const snippet of requiredSnippets) {
      if (!content.includes(snippet)) {
        violations.push({
          filePath,
          line: 1,
          label: `missing canonical snippet: ${snippet}`,
          excerpt: '',
        })
      }
    }
  }

  return violations
}

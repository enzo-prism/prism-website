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
  "app/pricing/client-page.tsx",
  "components/pricing/PricingHero.tsx",
  "lib/pricing-model.ts",
  "app/faq/page.tsx",
  "app/services/page.tsx",
  "app/get-started/page.tsx",
  "app/websites/page.tsx",
  "app/ads/page.tsx",
  "app/seo/page.tsx",
  "app/local-listings/page.tsx",
  "components/footer.tsx",
  "app/sitemap.ts",
  "next.config.mjs",
] as const

export const PRICING_CONTEXT_RULES: Record<string, RegExp[]> = {
  "app/refer/page.tsx": [/referral payout/i, /not service pricing/i],
  "app/google/dental-ads/page.tsx": [/ad fee examples/i, /not Prism core pricing/i],
  "app/dental-photography/before-after/GuideTabs.tsx": [/equipment budget/i, /not prism service pricing/i],
}

export const LEGACY_PRICING_TOKEN_RULES: PricingTokenRule[] = [
  { label: "$1,000 one-time retired website overhaul price", pattern: /\$1,000 one-time/i },
  { label: "Website Overhaul retired offer name", pattern: /Website Overhaul/i },
  { label: "Growth Partnership retired offer name", pattern: /Growth Partnership/i },
  { label: "Free Expert Audit retired offer name", pattern: /Free Expert Audit/i },
  { label: "$2,000/month retired growth partnership price", pattern: /\$2,000\/month\b/i },
  { label: "$400 legacy website price", pattern: /\$400\b/ },
  { label: "$900/mo legacy plan price", pattern: /\$900\/mo\b/i },
  { label: "$1,500/mo legacy plan price", pattern: /\$1,500\/mo\b/i },
  { label: "$2,500 legacy website price", pattern: /\$2,500\b/ },
  { label: "$297 legacy monthly plan price", pattern: /\$297\b/ },
  { label: "$97 legacy support plan price", pattern: /\$97\b/ },
  { label: "$3,000/mo legacy dental plan price", pattern: /\$3,000\/mo\b/i },
  { label: "$3,600/mo legacy bundle price", pattern: /\$3,600\/mo\b/i },
  { label: "$1,100/mo legacy bundle price", pattern: /\$1,100\/mo\b/i },
  { label: "$1,400/mo legacy bundle price", pattern: /\$1,400\/mo\b/i },
  { label: "$300/mo legacy bundle price", pattern: /\$300\/mo\b/i },
  { label: "starting around $1,000 wording", pattern: /starting around \$1,000/i },
  { label: "~$1,000 wording", pattern: /~\$1,000/i },
  { label: "$1,000/mo legacy dental price", pattern: /\$1,000\/mo\b/i },
  { label: "from $1,500/mo wording", pattern: /from \$1,500\/mo/i },
]

export const REQUIRED_CANONICAL_SNIPPETS: Record<string, string[]> = {
  "app/pricing/client-page.tsx": [
    "growthPathSteps",
    "pricingSnapshot",
    "partnerLevels",
    "PricingStructuredData",
  ],
  "components/pricing/PricingHero.tsx": [
    "A clearer way to invest in growth.",
    "PRICING_PRIMARY_CTA",
  ],
  "lib/pricing-model.ts": [
    "Create Free Growth Dashboard",
    "Normally $500",
    "Starts at $3,500",
    "Starts at $1,500/month",
  ],
  "app/websites/page.tsx": [
    "One-time website build",
    "Starts at $300",
    "price: '300'",
  ],
}

export function collectPricingConsistencyViolations(
  filePath: string,
  content: string,
): PricingConsistencyViolation[] {
  const violations: PricingConsistencyViolation[] = []
  const isStrictFile = PRICING_STRICT_FILES.includes(filePath as (typeof PRICING_STRICT_FILES)[number])
  const contextChecks = PRICING_CONTEXT_RULES[filePath]
  const hasContextLabel = contextChecks ? contextChecks.every((pattern) => pattern.test(content)) : false

  if (isStrictFile || contextChecks) {
    for (const rule of LEGACY_PRICING_TOKEN_RULES) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`)
      let match: RegExpExecArray | null = regex.exec(content)
      while (match) {
        const index = match.index
        const line = content.slice(0, index).split("\n").length
        const excerpt = content.split("\n")[line - 1]?.trim() ?? ""
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
          excerpt: "",
        })
      }
    }
  }

  return violations
}

export type PrismImpactLinkKind = "internal" | "external"

export type PrismImpactLink = {
  label: string
  href: string
  kind: PrismImpactLinkKind
  reason: string
}

export type PrismLink = PrismImpactLink

export type PrismImpactConfig = {
  title?: string
  impactSummary: string
  clientOutcomes: string[]
  serviceLinks: PrismImpactLink[]
  referenceLinks: PrismImpactLink[]
  forceRender?: boolean
}

type PrismImpactResolverInput = {
  slug: string
  category: string
  content: string
}

export const PRISM_IMPACT_SECTION_TITLE = "How this translates at Prism"

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function normalizeLinkText(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function hasExplicitPrismCloseout(content: string) {
  const normalized = content.toLowerCase()
  const phrases = [
    "work with prism",
    "how prism",
    "what prism",
    "prism can",
    "prism does",
    "prism helps",
    "prism's",
    "need help implementing",
    "we can help",
    "we help",
    "need help building",
    "want to implement",
    "when to bring in prism",
    "how we apply this",
  ]

  return phrases.some((phrase) => normalized.includes(phrase))
}

function dedupeLinks(links: PrismImpactLink[]) {
  const seen = new Set<string>()
  return links.filter((link) => {
    const key = normalizeLinkText(`${link.href}|${link.label}`)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function dedupeText(values: string[]) {
  const seen = new Set<string>()
  return values.filter((value) => {
    const key = normalizeLinkText(value)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function normalizeImpactConfig(config: PrismImpactConfig): PrismImpactConfig {
  return {
    ...config,
    title: config.title || PRISM_IMPACT_SECTION_TITLE,
    clientOutcomes: dedupeText(config.clientOutcomes).slice(0, 3),
    serviceLinks: dedupeLinks(config.serviceLinks).slice(0, 3),
    referenceLinks: dedupeLinks(config.referenceLinks).slice(0, 4),
  }
}

const SEO_REFERENCE_LINKS: PrismImpactLink[] = [
  {
    label: "Google Search essentials",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    kind: "external",
    reason: "How Google evaluates useful, trustworthy content quality at scale.",
  },
  {
    label: "Google AI Overviews docs",
    href: "https://developers.google.com/search/docs/appearance/overview",
    kind: "external",
    reason: "How AI search surfaces consume and summarize page content.",
  },
  {
    label: "SEO starter guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    kind: "external",
    reason: "Practical baseline for measurable improvements in visibility.",
  },
]

const AI_REFERENCE_LINKS: PrismImpactLink[] = [
  {
    label: "OpenAI product documentation",
    href: "https://platform.openai.com/docs/overview",
    kind: "external",
    reason: "Implementation guidance for practical LLM features.",
  },
  {
    label: "Anthropic model and agent overview",
    href: "https://www.anthropic.com/index/claude-3",
    kind: "external",
    reason: "Reference on modern agent capabilities and limits.",
  },
]

const DEVOPS_REFERENCE_LINKS: PrismImpactLink[] = [
  {
    label: "Next.js performance best practices",
    href: "https://nextjs.org/docs/app/building-your-application/optimizing/performance",
    kind: "external",
    reason: "Production performance patterns for fast and stable applications.",
  },
  {
    label: "Vercel deployment guide",
    href: "https://vercel.com/docs",
    kind: "external",
    reason: "Reliable deployment workflows for Next.js production teams.",
  },
  {
    label: "MCP server documentation",
    href: "https://github.com/modelcontextprotocol",
    kind: "external",
    reason: "How agentic workflows connect to real-world systems.",
  },
]

const ADS_REFERENCE_LINKS: PrismImpactLink[] = [
  {
    label: "Google Ads quality and policy",
    href: "https://support.google.com/google-ads/answer/1704365",
    kind: "external",
    reason: "Policy and quality guidance for sustainable paid acquisition.",
  },
  {
    label: "Meta Ads policy help",
    href: "https://www.facebook.com/business/help",
    kind: "external",
    reason: "Troubleshooting and creative/ad account operational notes.",
  },
  {
    label: "Google Ads campaign diagnostics",
    href: "https://support.google.com/google-ads/answer/6312388",
    kind: "external",
    reason: "Measurement basics for campaign-level decision-making.",
  },
]

const DEFAULT_IMPACT: Omit<PrismImpactConfig, "title"> = {
  impactSummary:
    "At Prism, we convert strategy into measurable growth by pairing execution systems, measurement, and iterative optimization across site, search, and acquisition touchpoints.",
  clientOutcomes: [
    "Faster launch cycles for new pages, campaigns, and experiments.",
    "Reliable funnel tracking from first touch to booked outcome.",
    "Less operational drag with clearer execution ownership.",
  ],
  serviceLinks: [
    {
      label: "AI and SEO services",
      href: "/services",
      kind: "internal",
      reason: "High-leverage growth services for AI-era acquisition.",
    },
    {
      label: "Get your AI-ready growth roadmap",
      href: "/get-started",
      kind: "internal",
      reason: "Start with a focused implementation plan and outcomes.",
    },
    {
      label: "AI SEO services",
      href: "/ai-seo-services",
      kind: "internal",
      reason: "Built for citations, trust signals, and AI-discovery readiness.",
    },
  ],
  referenceLinks: SEO_REFERENCE_LINKS,
  forceRender: true,
}

const SEO_IMPACT: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "Search behavior is changing, but the fundamentals remain: clearer intent, stronger proof, and consistent technical quality. Prism operationalizes that into predictable results.",
  clientOutcomes: [
    "Build a stronger SEO base with cleaner indexing and AI discoverability.",
    "Turn search visibility into booked calls and qualified leads.",
    "Scale content and local trust updates without losing consistency.",
  ],
  serviceLinks: [
    {
      label: "SEO services",
      href: "/seo",
      kind: "internal",
      reason: "Comprehensive local and organic visibility support.",
    },
    {
      label: "Local SEO services",
      href: "/local-seo-services",
      kind: "internal",
      reason: "Listings, maps, and trust layer upgrades for local demand.",
    },
    {
      label: "AI SEO services",
      href: "/ai-seo-services",
      kind: "internal",
      reason: "AI visibility execution for search and assistant surfaces.",
    },
  ],
  referenceLinks: SEO_REFERENCE_LINKS,
  forceRender: true,
}

const AI_IMPACT: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "AI can compress execution time, but reliability comes from systems. Prism builds repeatable AI workflows that are trackable, auditable, and business-relevant.",
  clientOutcomes: [
    "Run experiments with fewer approvals and clearer outcomes.",
    "Standardize AI systems so quality stays predictable.",
    "Scale output with less staff drag on repeat work.",
  ],
  serviceLinks: [
    {
      label: "AI programs",
      href: "/ai",
      kind: "internal",
      reason: "Practical AI workflows for teams and operators.",
    },
    {
      label: "AI website launch",
      href: "/ai-website-launch",
      kind: "internal",
      reason: "Launch and optimize AI-visible web experiences quickly.",
    },
    {
      label: "Book a growth implementation call",
      href: "/get-started",
      kind: "internal",
      reason: "Convert the post’s ideas into a prioritized action plan.",
    },
  ],
  referenceLinks: dedupeLinks([...AI_REFERENCE_LINKS, ...SEO_REFERENCE_LINKS]),
  forceRender: true,
}

const DENTISTRY_IMPACT: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "For dental operators, the highest leverage is improving trust, speed, and booking confidence across web search, AI discovery, and your team’s internal workflow.",
  clientOutcomes: [
    "Increase first-contact patient requests from high-intent discovery channels.",
    "Build stronger authority signals through consistent, clear proof.",
    "Reduce time from lead to consultation with cleaner routing.",
  ],
  serviceLinks: [
    {
      label: "Dental websites that convert",
      href: "/dental-website",
      kind: "internal",
      reason: "Conversion-first launches for dental patient acquisition.",
    },
    {
      label: "Dental practice SEO",
      href: "/dental-practice-seo-expert",
      kind: "internal",
      reason: "Industry-specific search and review strategy for practices.",
    },
    {
      label: "Get started for your clinic",
      href: "/get-started",
      kind: "internal",
      reason: "Prioritize the highest impact pages and funnel upgrades.",
    },
  ],
  referenceLinks: [...SEO_REFERENCE_LINKS],
  forceRender: true,
}

const ADS_IMPACT: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "Paid channels perform best when content, offer, and attribution are treated as one system. Prism aligns copy, landing pages, and campaign metrics into one execution loop.",
  clientOutcomes: [
    "Reduce waste from underperforming campaigns with tighter review cycles.",
    "Improve lead quality by aligning search intent to landing execution.",
    "Convert more spend into booked opportunities across channels.",
  ],
  serviceLinks: [
    {
      label: "Google and Meta campaign support",
      href: "/ads",
      kind: "internal",
      reason: "Execution-first media systems for growth teams.",
    },
    {
      label: "Facebook ads playbook for clinics",
      href: "/facebook-ads-for-dentists",
      kind: "internal",
      reason: "Message and funnel recommendations for local health services.",
    },
    {
      label: "Web and campaign integration",
      href: "/websites",
      kind: "internal",
      reason: "Keep acquisition and conversion infrastructure synchronized.",
    },
  ],
  referenceLinks: [...ADS_REFERENCE_LINKS, ...SEO_REFERENCE_LINKS],
  forceRender: true,
}

const DEVELOPMENT_IMPACT: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "Execution speed matters when your team is asked to ship often. Prism combines AI-assisted production workflows with stable web engineering and QA systems.",
  clientOutcomes: [
    "Move from idea to shipped experience with lower risk.",
    "Increase reliability while expanding content and feature velocity.",
    "Keep systems maintainable even as teams and requirements scale.",
  ],
  serviceLinks: [
    {
      label: "Conversion-focused website builds",
      href: "/websites",
      kind: "internal",
      reason: "Fast, measurable web builds tuned for growth.",
    },
    {
      label: "Software and tooling support",
      href: "/software",
      kind: "internal",
      reason: "Operational tooling for teams in motion.",
    },
    {
      label: "Replit and rapid prototyping",
      href: "/replit",
      kind: "internal",
      reason: "Proof-of-concept workflows and technical acceleration.",
    },
  ],
  referenceLinks: [...DEVOPS_REFERENCE_LINKS, ...AI_REFERENCE_LINKS],
  forceRender: true,
}

const DARK_FACTORY_OVERRIDE: PrismImpactConfig = {
  title: PRISM_IMPACT_SECTION_TITLE,
  impactSummary:
    "We build the same model: clear specifications, deterministic execution, and an outcome-first review loop that prevents model drift from becoming operational risk.",
  clientOutcomes: [
    "Deliver production-grade experiments quickly with quality controls.",
    "Turn model output into measurable revenue outcomes.",
    "Create a compounding operating system that reduces founder bottlenecks.",
  ],
  serviceLinks: [
    {
      label: "AI website launch",
      href: "/ai-website-launch",
      kind: "internal",
      reason: "Production-focused AI-native growth execution.",
    },
    {
      label: "AI and automation services",
      href: "/ai",
      kind: "internal",
      reason: "Scale implementation across search, marketing, and operations.",
    },
    {
      label: "Get started with Prism",
      href: "/get-started",
      kind: "internal",
      reason: "Define your first specs and first measurable outcomes.",
    },
  ],
  referenceLinks: [
    {
      label: "StrongDM Factory",
      href: "https://factory.strongdm.ai",
      kind: "external",
      reason: "Reference for production AI workflow automation.",
    },
    {
      label: "Web4 AI",
      href: "https://web4.ai/",
      kind: "external",
      reason: "Current examples of sovereign agents and automation infrastructure.",
    },
    {
      label: "Anthropic model strategy",
      href: "https://www.anthropic.com/index/claude-3",
      kind: "external",
      reason: "Context on modern Claude Code and model-native workflows.",
    },
  ],
  forceRender: true,
}

const CATEGORY_RULES: Array<(category: string) => PrismImpactConfig | null> = [
  (category) =>
    category.includes("ai-dentistry")
      ? DENTISTRY_IMPACT
      : null,
  (category) =>
    category.includes("dental") || category.includes("dentistry")
      ? DENTISTRY_IMPACT
      : null,
  (category) =>
    category.includes("seo") ||
    category.includes("search") ||
    category.includes("reputation") ||
    category.includes("local-seo") ||
    category.includes("local") ||
    category.includes("appear-in-ai-search")
      ? SEO_IMPACT
      : null,
  (category) =>
    category.includes("google-ads") ||
    category.includes("facebook-ads") ||
    category.includes("ads")
      ? ADS_IMPACT
      : null,
  (category) =>
    category.includes("web-ops-and-tooling") ||
    category.includes("website") ||
    category.includes("ai-development") ||
    category.includes("design-and-product") ||
    category.includes("development")
      ? DEVELOPMENT_IMPACT
      : null,
  (category) =>
    category.includes("ai-") ||
    category.includes("business-and-ai") ||
    category.includes("entrepreneur") ||
    category.includes("business") ||
    category.includes("leadership")
      ? AI_IMPACT
      : null,
  () => DEFAULT_IMPACT,
]

const SLUG_OVERRIDES: Record<string, PrismImpactConfig> = {
  "the-dark-factory-is-already-running-and-it-is-about-to-move-out-of-the-building": DARK_FACTORY_OVERRIDE,
  "how-to-rank-1-chatgpt": SEO_IMPACT,
  "6m-arr-playbook": ADS_IMPACT,
  "differentiation-is-survival": AI_IMPACT,
  "the-ai-shift-already-happened-what-it-means-for-your-business": AI_IMPACT,
  "new-rules-of-visibility-ai-seo": SEO_IMPACT,
  "gpt-5-2-vs-gpt-5-1-codex-max-dentist-website": DENTISTRY_IMPACT,
  "dental-practice-rank-higher-google-search": SEO_IMPACT,
}

function getCategoryImpact(category: string): PrismImpactConfig {
  const normalizedCategory = normalizeCategory(category)

  for (const rule of CATEGORY_RULES) {
    const candidate = rule(normalizedCategory)
    if (candidate) {
      return normalizeImpactConfig(candidate)
    }
  }

  return normalizeImpactConfig({
    title: PRISM_IMPACT_SECTION_TITLE,
    ...DEFAULT_IMPACT,
  })
}

export function getPrismImpactForPost({
  slug,
  category,
  content,
}: PrismImpactResolverInput): PrismImpactConfig | null {
  const slugKey = slug.trim().toLowerCase()
  const selectedConfig =
    (slugKey ? SLUG_OVERRIDES[slugKey] : null) || getCategoryImpact(category)
  const normalizedConfig = normalizeImpactConfig(selectedConfig)

  const hasCloseout = hasExplicitPrismCloseout(content)
  if (normalizedConfig.forceRender === false && hasCloseout) {
    return null
  }

  return {
    ...normalizedConfig,
    clientOutcomes: normalizedConfig.clientOutcomes.slice(0, 3),
    serviceLinks: normalizedConfig.serviceLinks.slice(0, 4),
    referenceLinks: normalizedConfig.referenceLinks.slice(0, 4),
    forceRender: normalizedConfig.forceRender ?? true,
  }
}

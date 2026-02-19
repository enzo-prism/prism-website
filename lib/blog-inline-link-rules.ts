export type OutboundLinkConfidence = "high" | "medium"

export type OutboundLinkRule = {
  phrase: string
  href: string
  reason: string
  confidence?: OutboundLinkConfidence
  variants?: string[]
  force?: boolean
}

export type BlogOutboundLinkContext = {
  slug: string
  category: string
  title: string
  content: string
  tags?: string[]
}

export type BlogOutboundLinkProfile = {
  rules: OutboundLinkRule[]
  skipWhenAlreadyLinked?: boolean
  disableAiSignalRules?: boolean
  maxLinks?: number
  skipIfNotHighConfidence?: boolean
  title?: string
}

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
}

function normalizeHref(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

function normalizePhrase(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase()
}

function dedupeRules(rules: OutboundLinkRule[]): OutboundLinkRule[] {
  const seen = new Set<string>()
  const deduped: OutboundLinkRule[] = []

  for (const rule of rules) {
    const key = `${normalizePhrase(rule.phrase)}|${normalizeHref(rule.href)}`
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(rule)
  }

  return deduped
}

function withDefaults(profile: BlogOutboundLinkProfile): BlogOutboundLinkProfile {
  const maxLinks = profile.maxLinks ?? 6
  return {
    ...profile,
    maxLinks: Math.max(1, Math.min(8, maxLinks)),
    rules: dedupeRules(profile.rules).slice(0, 16).map((rule) => ({
      ...rule,
      href: normalizeHref(rule.href),
      confidence: rule.confidence ?? "medium",
    })),
    skipIfNotHighConfidence: profile.skipIfNotHighConfidence ?? false,
    skipWhenAlreadyLinked: profile.skipWhenAlreadyLinked ?? false,
  }
}

function isLikelyAiHeavy(content: string) {
  const body = content.toLowerCase()
  return (
    /\bai\b/.test(body)
    || /\bartificial intelligence\b/.test(body)
    || /\bchatgpt\b/.test(body)
    || /\bgpt\b/.test(body)
    || /\bllm\b/.test(body)
    || /\bai-powered\b/.test(body)
  )
}

function isDental(content: string, category: string) {
  const body = content.toLowerCase()
  const normalizedCategory = normalizeCategory(category)
  return (
    normalizedCategory.includes("dent") ||
    body.includes(" dental ") ||
    body.includes(" patient") ||
    body.includes("practice ")
  )
}

function isWebsiteMentioned(content: string) {
  return /\bwebsite(s)?\b/.test(content.toLowerCase())
}

function isMarketingSignal(content: string) {
  return /\b(marketing|ads?|campaign|lead|leadgen|lead magnet|lead-magnet|growth)\b/.test(
    content.toLowerCase(),
  )
}

function categoryContains(needle: string, category: string) {
  return normalizeCategory(category).includes(normalizeCategory(needle))
}

function isLanding(content: string) {
  return /\blanding(ing)?\s+page\b/.test(content.toLowerCase())
}

const SEO_RULES: OutboundLinkRule[] = [
  {
    phrase: "AI search",
    href: "https://developers.google.com/search/docs/appearance",
    reason:
      "Google guidance for AI-assisted search and how answers are surfaced for users.",
    confidence: "high",
  },
  {
    phrase: "Google Search",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    reason:
      "Practical notes on producing content that is easier for search systems to evaluate.",
    confidence: "high",
    variants: ["Google search", "search"],
  },
  {
    phrase: "SEO",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    reason: "A practical entry point for organic discovery.",
    confidence: "high",
    variants: ["search engine optimization", "organic"],
  },
  {
    phrase: "Google Business Profile",
    href: "https://www.google.com/business/",
    reason: "Official setup and management surface for local business presence.",
    confidence: "medium",
    variants: ["Google Maps", "business profile", "Google profile"],
  },
  {
    phrase: "Google Search Console",
    href: "https://search.google.com/search-console/about",
    reason: "Track indexing and performance from a single source of truth.",
    confidence: "high",
    variants: ["search console"],
  },
]

const AI_RULES: OutboundLinkRule[] = [
  {
    phrase: "AI",
    href: "https://www.ibm.com/think/topics/ai",
    reason: "A practical orientation on current AI systems and capabilities.",
    confidence: "high",
    variants: ["artificial intelligence", "artificially intelligent"],
  },
  {
    phrase: "Anthropic",
    href: "https://www.anthropic.com/",
    reason: "Official company reference for Claude, safety, and model updates.",
    confidence: "high",
  },
  {
    phrase: "Claude",
    href: "https://docs.anthropic.com/en/docs/claude-code/",
    reason: "Claude Code and related model workflows in production.",
    confidence: "high",
    variants: ["claude code", "claude"],
  },
  {
    phrase: "MCP",
    href: "https://modelcontextprotocol.io/",
    reason: "Core protocol for tool-calling and model interoperability.",
    confidence: "high",
    variants: ["model context protocol"],
  },
  {
    phrase: "RAG",
    href: "https://www.ibm.com/think/topics/retrieval-augmented-generation",
    reason: "Reliable pattern for grounding model outputs with source context.",
    confidence: "medium",
    variants: ["retrieval"],
  },
  {
    phrase: "ChatGPT",
    href: "https://www.ibm.com/think/topics/chatgpt",
    reason: "Context on ChatGPT usage and behavior.",
    confidence: "medium",
    variants: ["gpt", "openai", "gpt-5"],
  },
  {
    phrase: "agentic AI",
    href: "https://www.ibm.com/think/topics/agentic-ai",
    reason:
      "How agentic systems are built, constrained, and evaluated in production.",
    confidence: "medium",
    variants: ["agentic", "agents"],
  },
]

const DENTISTRY_RULES: OutboundLinkRule[] = [
  {
    phrase: "dentist",
    href: "https://www.ada.org/en",
    reason: "Clinical standards and evidence expectations for dental teams.",
    confidence: "high",
    variants: ["dentistry", "dental"],
  },
  {
    phrase: "dentists",
    href: "https://www.ada.org/en",
    reason: "Clinical and patient-education standards for dental practices.",
    confidence: "high",
    variants: ["practice"],
  },
  {
    phrase: "Google Business Profile",
    href: "https://www.google.com/business/",
    reason:
      "Local trust layer for clinics: listing and location accuracy settings.",
    confidence: "medium",
    variants: ["google business profile", "google maps"],
  },
]

const ADS_RULES: OutboundLinkRule[] = [
  {
    phrase: "Google Ads",
    href: "https://ads.google.com/home/",
    reason: "Campaign setup, reporting, and ad lifecycle controls.",
    confidence: "high",
    variants: ["google ads", "ads"],
  },
  {
    phrase: "Facebook Ads",
    href: "https://www.facebook.com/business/help",
    reason: "Campaign delivery, account settings, and policy guidance.",
    confidence: "high",
    variants: ["meta ads"],
  },
  {
    phrase: "landing page",
    href: "https://unbounce.com/landing-page-articles/what-is-a-landing-page/",
    reason: "Landing-page mechanics matter for conversion and ad quality.",
    confidence: "medium",
  },
  {
    phrase: "campaign",
    href: "https://ads.google.com/home/tools/keyword-planner/",
    reason: "Campaign structure and keyword strategy from launch to scale.",
    confidence: "medium",
    variants: ["campaigns"],
  },
]

const WEBOPS_RULES: OutboundLinkRule[] = [
  {
    phrase: "website",
    href: "https://web.dev/",
    reason: "Operational guidance for fast, stable web delivery.",
    confidence: "high",
    variants: ["web site", "site"],
  },
  {
    phrase: "Next.js",
    href: "https://nextjs.org/docs",
    reason: "Production docs for routing, rendering, and app architecture.",
    confidence: "high",
  },
  {
    phrase: "Vercel",
    href: "https://vercel.com/docs",
    reason: "Deployment and performance controls for modern frontend apps.",
    confidence: "high",
    variants: ["vercel docs"],
  },
  {
    phrase: "Replit",
    href: "https://docs.replit.com/",
    reason: "Reference for hosted prototyping and app iteration.",
    confidence: "high",
    variants: ["replit"],
  },
  {
    phrase: "GitHub",
    href: "https://docs.github.com/en",
    reason: "Repository workflows and team execution across engineering.",
    confidence: "medium",
    variants: ["github"],
  },
]

const DESIGN_RULES: OutboundLinkRule[] = [
  {
    phrase: "design",
    href: "https://www.interaction-design.org/literature/topics/ux-design",
    reason:
      "Cross-check UX design patterns and practical product language.",
    confidence: "high",
    variants: ["ux", "ui"],
  },
  {
    phrase: "Figma",
    href: "https://help.figma.com/",
    reason: "Design documentation and collaboration reference.",
    confidence: "high",
  },
  {
    phrase: "growth",
    href: "https://www.hbr.org/topic/strategy",
    reason: "High-level strategy framing for sustainable positioning.",
    confidence: "medium",
  },
]

const BUSINESS_RULES: OutboundLinkRule[] = [
  {
    phrase: "business",
    href: "https://www.sba.gov/business-guide/launch-your-business",
    reason: "Reliable baseline for planning, structure, and business execution.",
    confidence: "high",
    variants: ["businesses", "venture", "startup"],
  },
  {
    phrase: "leadership",
    href: "https://hbr.org/topic/leadership",
    reason:
      "Leadership behaviors and operating systems for durable execution.",
    confidence: "high",
    variants: ["leaders", "lead"],
  },
  {
    phrase: "growth",
    href: "https://www.hbr.org/topic/subject/strategy",
    reason: "Growth and differentiation framing with a business lens.",
    confidence: "medium",
    variants: ["scale", "expansion"],
  },
  {
    phrase: "marketing",
    href: "https://www.hubspot.com/resources/marketing",
    reason:
      "Practical frameworks for campaign planning and message quality.",
    confidence: "high",
    variants: ["brand", "acquisition"],
  },
]

const CONTENT_RULES: OutboundLinkRule[] = [
  {
    phrase: "content",
    href: "https://moz.com/learn/seo/content-marketing",
    reason:
      "A practical reference for content strategy and distribution.",
    confidence: "high",
    variants: ["content marketing", "editorial"],
  },
  {
    phrase: "strategy",
    href: "https://contentmarketinginstitute.com/learn/what-is-content-marketing/",
    reason: "Strategic framing for editorial and campaign planning.",
    confidence: "medium",
    variants: ["strategies", "strategy"],
  },
  {
    phrase: "brand",
    href: "https://hbr.org/topic/strategy",
    reason:
    "Brand clarity as a strategic filter for growth decisions.",
    confidence: "medium",
    variants: ["positioning", "branding"],
  },
]

const MOTIVATION_RULES: OutboundLinkRule[] = [
  {
    phrase: "work",
    href: "https://hbr.org/topic/subject/personal-productivity",
    reason:
      "Research-backed techniques for sustained execution under uncertainty.",
    confidence: "high",
    variants: ["working", "grind"],
  },
  {
    phrase: "focus",
    href: "https://hbr.org/topic/subject/personal-productivity",
    reason: "Methods for maintaining depth over noise.",
    confidence: "medium",
    variants: ["focuses", "concentration"],
  },
  {
    phrase: "motivation",
    href: "https://www.apa.org/topics/motivation",
    reason: "Behavioral science on what sustains effort.",
    confidence: "medium",
    variants: ["grit", "discipline"],
  },
]

const DARK_FACTORY_RULES: OutboundLinkRule[] = [
  {
    phrase: "StrongDM",
    href: "https://factory.strongdm.ai/",
    reason:
      "Reference implementation of automated AI-native production workflows.",
    confidence: "high",
    variants: ["strongdm", "factory.strongdm.ai"],
  },
  {
    phrase: "Web4.ai",
    href: "https://web4.ai/",
    reason:
      "Production infrastructure for sovereign AI agents.",
    confidence: "high",
    variants: ["web4", "web 4"],
  },
  {
    phrase: "x402",
    href: "https://www.x402.org/",
    reason:
      "Protocol reference for machine-to-machine payment rails in autonomous systems.",
    confidence: "medium",
    variants: ["HTTP 402"],
  },
]

const DEFAULT_RULES: OutboundLinkRule[] = [
  {
    phrase: "AI",
    href: "https://www.ibm.com/think/topics/ai",
    reason: "Reliable baseline on current AI development and deployment.",
    confidence: "high",
    variants: ["artificial intelligence"],
  },
  {
    phrase: "Google",
    href: "https://www.google.com/",
    reason: "Core documentation surface for search and product behavior.",
    confidence: "high",
    variants: ["google search", "search engine"],
  },
  {
    phrase: "business",
    href: "https://www.sba.gov/business-guide/launch-your-business",
    reason: "Practical reference for structured business execution.",
    confidence: "high",
    variants: ["company"],
  },
  {
    phrase: "website",
    href: "https://web.dev/",
    reason: "Reference for modern, high-performing web experiences.",
    confidence: "medium",
    variants: ["site", "web site"],
  },
  {
    phrase: "design",
    href: "https://www.interaction-design.org/literature/topics/ux-design",
    reason: "Design systems and execution patterns for usable products.",
    confidence: "medium",
    variants: ["ux", "ui", "product design"],
  },
  {
    phrase: "marketing",
    href: "https://www.hubspot.com/resources/marketing",
    reason: "Practical marketing planning resources and playbooks.",
    confidence: "medium",
    variants: ["acquisition", "promotions"],
  },
]

const CATEGORY_PROFILES: Array<(category: string) => BlogOutboundLinkProfile | null> = [
  (category) =>
    categoryContains("seo", category) ||
    categoryContains("local-seo", category) ||
    categoryContains("appear-in-ai-search", category) ||
    categoryContains("ai-search", category)
      ? withDefaults({ rules: SEO_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    categoryContains("google-ads", category) ||
    categoryContains("facebook", category) ||
    categoryContains("google ads", category) ||
    categoryContains("ads", category)
      ? withDefaults({ rules: ADS_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    categoryContains("dentistry", category) || categoryContains("dental", category)
      ? withDefaults({ rules: DENTISTRY_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    categoryContains("web-ops", category) ||
    categoryContains("tooling", category) ||
    categoryContains("development", category) ||
    categoryContains("website", category) ||
    categoryContains("ai-powered-web-development", category) ||
    categoryContains("web dev", category)
      ? withDefaults({ rules: WEBOPS_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) => (category.includes("ai") && category.includes("business"))
      ? withDefaults({ rules: [...AI_RULES, ...BUSINESS_RULES], maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    category.includes("ai") ||
    category.includes("agentic") ||
    category.includes("gpt") ||
    category.includes("llm")
      ? withDefaults({ rules: AI_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    categoryContains("design", category) || categoryContains("product", category)
      ? withDefaults({ rules: DESIGN_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) => categoryContains("content", category) || categoryContains("content-strategy", category)
      ? withDefaults({ rules: CONTENT_RULES, maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  (category) =>
    categoryContains("motivation", category) ||
    categoryContains("entrepreneur", category) ||
    categoryContains("leadership", category)
      ? withDefaults({ rules: [...BUSINESS_RULES, ...MOTIVATION_RULES], maxLinks: 6, skipIfNotHighConfidence: false })
      : null,
  () =>
    withDefaults({
      rules: DEFAULT_RULES,
      maxLinks: 6,
      skipIfNotHighConfidence: false,
    }),
]

const SLUG_OVERRIDES: Record<string, BlogOutboundLinkProfile> = {
  "the-dark-factory-is-already-running-and-it-is-about-to-move-out-of-the-building": withDefaults({
    rules: [...DARK_FACTORY_RULES, ...AI_RULES],
    maxLinks: 6,
  }),
  "the-ai-shift-already-happened-what-it-means-for-your-business": withDefaults({
    rules: [...AI_RULES, ...SEO_RULES],
    maxLinks: 6,
  }),
  "how-to-rank-1-chatgpt": withDefaults({
    rules: [...SEO_RULES, ...AI_RULES],
    maxLinks: 6,
  }),
  "differentiation-is-survival": withDefaults({
    rules: [...BUSINESS_RULES, ...MOTIVATION_RULES],
    maxLinks: 6,
  }),
  "6m-arr-playbook": withDefaults({
    rules: [...ADS_RULES, ...AI_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "generate-thousands-leads-without-more-ads": withDefaults({
    rules: [...BUSINESS_RULES, ...ADS_RULES],
    maxLinks: 6,
  }),
  "build-ecommerce-store-20-minutes-ai": withDefaults({
    rules: [...AI_RULES, ...WEBOPS_RULES],
    maxLinks: 6,
  }),
  "create-website-more-business-replit": withDefaults({
    rules: [...WEBOPS_RULES, ...AI_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "download-website-images-httrack": withDefaults({
    rules: [...WEBOPS_RULES, ...DESIGN_RULES],
    maxLinks: 6,
  }),
  "founders-playbook-ai-era": withDefaults({
    rules: [...AI_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "dental-practice-1-3m-swamp": withDefaults({
    rules: [...DENTISTRY_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "gpt5-two-levers-growth": withDefaults({
    rules: [
      {
        phrase: "GPT-5",
        href: "https://www.ibm.com/think/topics/chatgpt",
        reason: "Overview of GPT-family capabilities and practical AI use.",
        confidence: "high",
      },
      {
        phrase: "measure",
        href: "https://support.google.com/analytics/answer/1037445",
        reason: "How teams define and track meaningful outcome metrics.",
        confidence: "medium",
      },
      {
        phrase: "metrics",
        href: "https://analytics.google.com/analytics/web/",
        reason: "Performance measurement workflows for iterative product execution.",
        confidence: "medium",
      },
      ...AI_RULES,
      ...DESIGN_RULES,
    ],
    maxLinks: 6,
  }),
  "prism-flywheel-skyrocket-brick-and-mortar-growth": withDefaults({
    rules: [
      {
        phrase: "Instagram",
        href: "https://www.instagram.com",
        reason: "Official platform where many creators and local brands publish discovery content.",
        confidence: "high",
      },
      {
        phrase: "LinkedIn",
        href: "https://www.linkedin.com",
        reason: "Professional platform commonly used for B2B lead touchpoints.",
        confidence: "high",
      },
      {
        phrase: "YouTube",
        href: "https://www.youtube.com",
        reason:
          "Video platform used for educational and trust-building brand content.",
        confidence: "high",
      },
      {
        phrase: "Google",
        href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        reason: "Reference for publishing content in a way that's discoverable.",
        confidence: "medium",
      },
      ...MOTIVATION_RULES,
      ...BUSINESS_RULES,
    ],
    maxLinks: 6,
  }),
  "how-to-choose-local-seo-agency": withDefaults({
    rules: [...SEO_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "google-ads-health-personalized-warning": withDefaults({
    rules: [...ADS_RULES, ...SEO_RULES],
    maxLinks: 6,
  }),
  "how-we-supercharged-prisms-site-with-midjourney-video": withDefaults({
    rules: [...DESIGN_RULES, ...AI_RULES, ...WEBOPS_RULES],
    maxLinks: 6,
  }),
  "breaking-free-education-psyop": withDefaults({
    rules: [...MOTIVATION_RULES, ...AI_RULES, ...BUSINESS_RULES],
    maxLinks: 6,
  }),
  "the-grind-that-builds-empires": withDefaults({
    rules: [
      {
        phrase: "Jeff Bezos",
        href: "https://en.wikipedia.org/wiki/Jeff_Bezos",
        reason: "Background on Bezos's long-horizon operating philosophy.",
        confidence: "high",
      },
      {
        phrase: "The Blind Watchmaker",
        href: "https://en.wikipedia.org/wiki/The_Blind_Watchmaker",
        reason:
          "The equilibrium metaphor used in this piece on persistence and differentiation.",
        confidence: "high",
      },
      ...MOTIVATION_RULES,
      ...DEFAULT_RULES,
    ],
    maxLinks: 6,
  }),
  "2026-belongs-to-the-founders-who-can-delegate": withDefaults({
    rules: [...BUSINESS_RULES, ...AI_RULES, ...DESIGN_RULES],
    maxLinks: 6,
  }),
  "the-founders-guide-to-shipping-apps-on-the-apple-app-store-in-2026": withDefaults({
    rules: [],
    maxLinks: 6,
    disableAiSignalRules: true,
  }),
  "dentist-website-design-checklist": withDefaults({
    rules: [...DENTISTRY_RULES, ...WEBOPS_RULES],
    maxLinks: 6,
  }),
}

export function getOutboundLinkRulesForPost({
  slug,
  category,
  title,
  content,
}: BlogOutboundLinkContext): BlogOutboundLinkProfile {
  const normalizedCategory = normalizeCategory(category)
  const normalizedSlug = slug.toLowerCase().trim()
  const titleSignal = normalizePhrase(title).includes("dark factory")
    ? withDefaults({ rules: DARK_FACTORY_RULES, maxLinks: 6 })
    : null

  const categoryProfile = getCategoryProfile(normalizedCategory)
  const selected = SLUG_OVERRIDES[normalizedSlug] ?? titleSignal ?? categoryProfile

  const hasAiSignal = isLikelyAiHeavy(content)
  const hasDentalSignal = isDental(content, category)
  const hasWebsiteSignal = isWebsiteMentioned(content)
  const hasMarketingSignal = isMarketingSignal(content)
  const hasLandingSignal = isLanding(content)

  return withDefaults({
    ...selected,
    rules: [
      ...selected.rules,
      ...(hasAiSignal && !selected.disableAiSignalRules ? AI_RULES : []),
      ...(hasDentalSignal ? DENTISTRY_RULES : []),
      ...(hasWebsiteSignal && hasMarketingSignal ? WEBOPS_RULES : []),
      ...(hasWebsiteSignal && !hasMarketingSignal ? [ ...DEFAULT_RULES ] : []),
      ...(hasLandingSignal ? ADS_RULES : []),
    ].filter(Boolean),
    skipIfNotHighConfidence: selected.skipIfNotHighConfidence ?? false,
  })
}

function getCategoryProfile(category: string) {
  const normalized = normalizeCategory(category)

  for (const profileFactory of CATEGORY_PROFILES) {
    const candidate = profileFactory(normalized)
    if (candidate) return candidate
  }

  return withDefaults({
    rules: category.includes("business")
      ? BUSINESS_RULES
      : category.includes("ai")
        ? AI_RULES
        : DEFAULT_RULES,
    maxLinks: 6,
    skipIfNotHighConfidence: false,
  })
}

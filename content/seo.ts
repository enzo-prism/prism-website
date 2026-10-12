export type SeoSectionItem = {
  title: string
  description: string
  bullets?: string[]
  note?: string
  linkText?: string
  linkHref?: string
}

export type SeoHeroContent = {
  eyebrow: string
  title: string
  subtitle: string
  kicker?: string
  secondaryCta?: { label: string; href: string }
}

export type SeoVideoContent = {
  id: string
  eyebrow: string
  title: string
  description: string
  playerTitle: string
  caption: string
  src: string
  poster: string
  schema: {
    name: string
    description: string
    uploadDate: string
    duration?: string
    creatorName?: string
  }
}

export const seoOverviewContent = {
  hero: {
    eyebrow: "seo",
    title: "Help the right customers find you",
    subtitle: "We improve your pages, listings, and site structure so people searching for your services can find clear answers and a way to contact you.",
    secondaryCta: { label: "see on-page seo", href: "/seo/on-page" },
  } satisfies SeoHeroContent,
  scoringQuestions: [
    "is this the right answer for this search?",
    "can we trust this business?",
    "do real people actually engage with it?",
  ],
  onPagePreview: {
    title: "Make every page useful",
    bullets: [
      "Each page matches real search intent",
      "Content is structured clearly for people and search engines",
      "Clear service and location information",
      "Fast, clean, mobile-friendly loading",
    ],
    linkText: "On-page SEO services",
    linkHref: "/seo/on-page",
  },
  offPagePreview: {
    title: "Build a consistent presence beyond your site",
    bullets: [
      "Who links to you (quality over quantity)",
      "Where your business is listed and how consistent it is",
      "What your reviews say across the major platforms",
      "How people interact with you on maps and listings",
    ],
    linkText: "See our off-page approach",
    linkHref: "/seo/off-page",
  },
  // Stages of the work on every build, not price tiers: Prism sells four
  // offers (lib/pricing-model.ts), each scoped when the waitlist intake opens.
  buildStages: [
    {
      title: "foundation",
      description: "Clean structure, fast performance, baseline schema, key service and location pages, and core listings.",
    },
    {
      title: "growth",
      description: "Deeper content, stronger internal linking, fuller schema, more service areas, and a review plan.",
    },
    {
      title: "ongoing improvement",
      description: "New content, local listing upkeep, review support, link opportunities, and steady iteration.",
    },
  ],
  benefits: [
    "A website built as a clear, structured answer to what your ideal customers search.",
    "Local listings and reviews that back up your website instead of contradicting it.",
    "An SEO foundation that supports your ads, content, and brand campaigns.",
  ],
}

export const seoOnPageContent = {
  hero: {
    eyebrow: "on-page seo",
    title: "Make every page useful",
    subtitle: "Everything you control on your own site, designed to match what people are actually searching for.",
    secondaryCta: { label: "see off-page seo", href: "/seo/off-page" },
  } satisfies SeoHeroContent,
  intro:
    "On-page SEO helps visitors and search engines understand your website. We organize the pages around the services you offer and the questions customers ask.",
  pillars: [
    {
      title: "content & intent match",
      description: "We design content to match real search intent, not random keywords.",
      bullets: [
        "Service pages for each major offer",
        "Location pages for every city or area you serve",
        "Blog posts and FAQs for the questions people truly ask",
        "Clear headers so people and search engines can scan",
        "Direct answers: what you do, who it’s for, and why it matters",
        "Real examples, photos, and videos for proof",
      ],
    },
    {
      title: "technical structure",
      description: "Under the hood, your site has to be clean, fast, and easy to crawl.",
      bullets: [
        "Fast load speed through optimized media and code",
        "Mobile-first layouts on every page",
        "Clean URLs that read like real words",
        "Internal linking that guides both users and crawlers",
        "No duplicate content, and correct canonicals",
        "Sitemap and robots.txt tuned to what should be crawled",
        "Structured data that accurately describes eligible page content",
        "Secure HTTPS everywhere",
      ],
    },
    {
      title: "a clear path to an inquiry",
      description: "Visitors should be able to understand your offer, find an answer, and contact you without getting lost.",
      bullets: [
        "Easy navigation with clear menus",
        "Above-the-fold clarity so people know they’re in the right place",
        "Clear calls to action to call, book, or message",
        "Readable formatting with breathable spacing",
        "Useful next steps after the information visitors came for",
      ],
    },
    {
      title: "local business essentials",
      description: "Your site needs to line up with your real-world presence.",
      bullets: [
        "Consistent NAP (name, address, phone) across the site",
        "Embedded maps that connect your site and your location",
        "Clear service areas and coverage",
        "Team bios, credentials, and trust signals",
        "Before-and-after galleries and testimonials",
        "Page-level local business schema",
      ],
    },
  ],
  closing:
    "Search is part of how we plan a website. We start with useful pages and sound technical foundations, then agree on the content and improvements your business needs next.",
  closingBullets: [
    "Start with the right architecture",
    "Expand content as services and locations grow",
    "Keep iterating so search intent and messaging stay aligned",
  ],
}

export const seoOffPageContent = {
  hero: {
    eyebrow: "off-page seo",
    title: "Make your reputation easier to find",
    subtitle: "Accurate listings, genuine reviews, and relevant mentions help people check your business before they choose it.",
    secondaryCta: { label: "review on-page seo", href: "/seo/on-page" },
  } satisfies SeoHeroContent,
  video: {
    id: "off-page-seo-video",
    eyebrow: "watch",
    title: "Enzo on your reputation beyond your website",
    description: "Enzo explains how listings, reviews, and relevant links fit into Prism’s search work.",
    playerTitle: "Enzo on tightening off-page proof",
    caption: "How accurate business information and genuine customer feedback support your online presence.",
    src: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763427804/off-page-1_s9ni7k.mp4",
    poster: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/off-page-1_s9ni7k.jpg",
    schema: {
      name: "Enzo explains Prism's off-page SEO systems",
      description:
        "Enzo Sison walks through Prism’s approach to backlinks, listings, reviews, and entity signals so local brands keep showing up.",
      uploadDate: "2025-05-28T00:00:00Z",
      creatorName: "Enzo Sison",
    },
  } satisfies SeoVideoContent,
  intro:
    "Off-page SEO is about proof: proof that other sites vouch for you, that your business exists in the real world, and that real people interact with you.",
  levers: [
    {
      title: "backlinks",
      description:
        "Links from other websites are public endorsements. We focus on quality, not spam.",
      bullets: [
        "Editorial mentions and guides",
        "Guest posts with useful insights",
        "Local news coverage",
        "Industry organizations linking back",
        "Supplier and partner references",
        "Reputable citations with accurate NAP",
      ],
    },
    {
      title: "local listings",
      description:
        "Listings verify who you are and where you operate. Consistency is everything.",
      bullets: [
        "Google Business Profile and Apple Business Connect",
        "Yelp, Bing Places, and Facebook",
        "Industry-specific directories",
        "Accurate NAP, categories, photos, and hours",
      ],
    },
    {
      title: "reviews & reputation",
      description:
        "Recent, genuine feedback helps customers understand what it is like to work with you.",
      bullets: [
        "Google reviews",
        "Yelp and Facebook",
        "Third-party aggregators like Birdeye or Podium",
        "Simple requests for honest customer feedback",
      ],
    },
    {
      title: "real-world engagement",
      description:
        "Profile interactions help you see how people use your listings and where to improve them.",
      bullets: [
        "Maps listing clicks and direction requests",
        "Calls from listings",
        "Photo views and website taps",
        "Better visuals and descriptions that invite action",
      ],
    },
    {
      title: "social signals",
      description:
        "Social isn’t a direct ranking factor, but it fuels branded searches and mentions.",
      bullets: [
        "Prompts more branded searches",
        "Creates link and mention opportunities",
        "Shows your business is active",
      ],
    },
    {
      title: "mentions & entity building",
      description:
        "Relevant mentions put your business in context, from local events to industry publications.",
      bullets: [
        "Local blogs and community shoutouts",
        "Event sponsorships and listings",
        "Forums or groups recommending you",
        "Press releases (real ones) that document what you do",
      ],
    },
  ],
  closing:
    "We review where your business appears, correct conflicting information, and agree on a practical plan for listings, reviews, and relevant mentions. The details should match what customers find on your website.",
}

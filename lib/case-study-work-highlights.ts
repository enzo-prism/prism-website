export type CaseStudyWorkProfile = {
  services: string[]
  techStack: string[]
}

const toList = (items: readonly string[]) =>
  [...new Set(items.map((item) => item.trim()).filter(Boolean))]

export const CASE_STUDY_WORK_HIGHLIGHTS: Record<string, CaseStudyWorkProfile> = {
  "belize-kids-foundation": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "canary-cove": {
    services: ["Website design", "Brand design", "CRM integration", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "canary-foundation": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "coast-periodontics-and-laser-surgery": {
    services: ["Website design", "Brand design", "SEO/AEO", "Local listing optimization", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "dr-christopher-wong": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Google Ads",
      "Enterprise analytics setup and optimization",
    ],
    techStack: [
      "Codex",
      "Claude Code",
      "Vercel",
      "Figma",
      "GPT-5.3 Codex",
      "Opus 4.6",
      "Gemini 3.1",
      "Google Analytics",
      "Google Search Console",
      "Semrush",
      "Google Business Profile",
    ],
  },
  "exquisite-dentistry": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Google Ads",
      "Enterprise analytics setup and optimization",
    ],
    techStack: [
      "Codex",
      "Claude Code",
      "Vercel",
      "Figma",
      "GPT-5.3 Codex",
      "Opus 4.6",
      "Gemini 3.1",
      "Google Analytics",
      "Hotjar analytics",
      "Google Search Console",
      "Semrush",
      "Google Business Profile",
      "Apple Business Connect",
      "Yelp for Business",
    ],
  },
  "family-first-smile-care": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Enterprise analytics setup and optimization",
    ],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Hotjar analytics"],
  },
  "grace-dental-santa-rosa": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Google Ads",
      "Enterprise analytics setup and optimization",
    ],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Google Business Profile"],
  },
  "infobell-it": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "laguna-beach-dental-arts": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Google Ads",
      "Enterprise analytics setup and optimization",
    ],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Google Business Profile"],
  },
  "leadership-retreat": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console"],
  },
  "mataria-dental-group": {
    services: [
      "Website transfer",
      "Website design",
      "Brand design",
      "Local listing optimization",
      "Meta ads",
      "Video editing",
      "Enterprise analytics setup and optimization",
    ],
    techStack: [
      "Figma",
      "Vercel",
      "Google Analytics",
      "Google Search Console",
      "Hotjar analytics",
      "Semrush",
      "Google Business Profile",
      "Apple Business Connect",
      "Yelp for Business",
      "Claude Code",
    ],
  },
  "michael-njo-dds": {
    services: ["Website design", "SEO/AEO", "Local listing optimization", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "olympic-bootworks": {
    services: [
      "Website transfer",
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Video editing",
      "Enterprise analytics setup and optimization",
    ],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Google Business Profile"],
  },
  "practice-transitions-institute": {
    services: ["Website design", "Brand design", "SEO/AEO", "Local listing optimization", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush"],
  },
  "rebellious-aging": {
    services: ["Website design", "Brand design", "SEO/AEO", "Local listing optimization", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console"],
  },
  "saorsa-growth-partners": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console"],
  },
  "sr4-partners": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console"],
  },
  "town-centre-dental": {
    services: [
      "Website design",
      "Brand design",
      "SEO/AEO",
      "Local listing optimization",
      "Enterprise analytics setup and optimization",
    ],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Google Business Profile"],
  },
  "we-are-saplings": {
    services: ["Website design", "Brand design", "SEO/AEO", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console"],
  },
  "wine-country-root-canal": {
    services: ["Website design", "Brand design", "SEO/AEO", "Local listing optimization", "Enterprise analytics setup and optimization"],
    techStack: ["Figma", "Vercel", "Google Analytics", "Google Search Console", "Semrush", "Google Business Profile"],
  },
}

const CASE_STUDY_URL_PREFIX = "/case-studies/"

const normalizeCaseStudySlug = (slug?: string | null) =>
  slug
    ? slug
        .trim()
        .replace(/^\/+|\/+$/g, "")
        .split("/")
        .pop()
        ?.toLowerCase()
    : undefined

export function getCaseStudyWorkProfile(slug: string): CaseStudyWorkProfile | undefined {
  const normalized = normalizeCaseStudySlug(slug)
  if (!normalized) return undefined

  return CASE_STUDY_WORK_HIGHLIGHTS[normalized]
}

export function getCaseStudyWorkProfileFromShareUrl(shareUrl: string): CaseStudyWorkProfile | undefined {
  const safeUrl = shareUrl?.trim()
  if (!safeUrl) return undefined

  try {
    const path = new URL(safeUrl).pathname.toLowerCase()
    const marker = path.indexOf(CASE_STUDY_URL_PREFIX)
    if (marker === -1) return undefined

    return getCaseStudyWorkProfile(path.slice(marker + CASE_STUDY_URL_PREFIX.length))
  } catch {
    const marker = safeUrl.toLowerCase().indexOf(CASE_STUDY_URL_PREFIX)
    if (marker === -1) return undefined

    const suffix = safeUrl.slice(marker + CASE_STUDY_URL_PREFIX.length)
    return getCaseStudyWorkProfile(suffix.split(/[/?#]/)[0])
  }
}

export function getCaseStudyWorkProfileForCase(slugOrUrl: string): CaseStudyWorkProfile | undefined {
  const profile = getCaseStudyWorkProfile(slugOrUrl)
  if (profile) return profile

  return getCaseStudyWorkProfileFromShareUrl(slugOrUrl)
}

export function normalizeCaseStudyWorkProfile(profile?: CaseStudyWorkProfile): CaseStudyWorkProfile {
  return {
    services: toList(profile?.services ?? []),
    techStack: toList(profile?.techStack ?? []),
  }
}

import {
  datedMetricSummary,
  type CaseStudyMeta,
} from "@/lib/case-study-data"
import {
  getCaseStudyWorkProfile,
  normalizeCaseStudyWorkProfile,
} from "@/lib/case-study-work-highlights"
import { FORMER_CLIENT_SLUGS } from "@/lib/former-clients"

/**
 * The plain facts of one case study, for the facts block on each case study
 * page, /case-studies, and /llms-full.txt. Every value comes from
 * lib/case-study-data.ts or lib/case-study-work-highlights.ts; a fact the
 * data does not hold (a launch date, say) is left out, never guessed.
 */
export type CaseStudyFact = {
  label: string
  value: string
  href?: string
}

const SITE = "https://www.design-prism.com"

export function formatFactDate(iso: string | undefined): string | undefined {
  if (!iso) return undefined
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function caseStudyUrl(study: CaseStudyMeta): string {
  return study.structured?.canonicalUrl ?? `${SITE}/case-studies/${study.slug}`
}

export function caseStudyServices(study: CaseStudyMeta): string[] {
  return normalizeCaseStudyWorkProfile(getCaseStudyWorkProfile(study.slug)).services
}

export function getCaseStudyFacts(study: CaseStudyMeta): CaseStudyFact[] {
  const facts: CaseStudyFact[] = [{ label: "Client", value: study.client }]
  if (study.websiteUrl) {
    facts.push({
      label: "Website",
      value: hostLabel(study.websiteUrl),
      href: study.websiteUrl,
    })
  }
  if ((FORMER_CLIENT_SLUGS as readonly string[]).includes(study.slug)) {
    facts.push({ label: "Status", value: "Past project (former client)" })
  }
  facts.push({ label: "Industry", value: study.industry })
  facts.push({ label: "Location", value: study.location })

  const services = caseStudyServices(study)
  if (services.length > 0) {
    facts.push({ label: "Services", value: services.join(", ") })
  }
  if (study.structured?.scope) {
    facts.push({ label: "Scope", value: study.structured.scope })
  }
  if (study.structured?.focus) {
    facts.push({ label: "Focus", value: study.structured.focus })
  }

  for (const metric of study.structured?.results ?? []) {
    facts.push({
      label: "Result",
      value: datedMetricSummary(metric),
      href: metric.sourceUrl,
    })
  }

  const published = formatFactDate(study.structured?.datePublished)
  const updated = formatFactDate(study.structured?.dateModified)
  if (published) facts.push({ label: "Case study published", value: published })
  if (updated && updated !== published) {
    facts.push({ label: "Case study updated", value: updated })
  }
  return facts
}

/** One markdown section per case study (used by /llms-full.txt). */
export function caseStudyMarkdown(study: CaseStudyMeta): string {
  const lines = [`### ${study.client}`, "", `${study.description}`, "", `URL: ${caseStudyUrl(study)}`, ""]
  for (const fact of getCaseStudyFacts(study)) {
    lines.push(`- ${fact.label}: ${fact.value}${fact.href && fact.label === "Result" ? ` (${fact.href})` : ""}`)
  }
  const story = study.structured?.story
  if (story) {
    lines.push("", `Situation: ${story.situation}`, "", `Approach: ${story.approach}`, "", `Result: ${story.result}`)
  }
  const outcomes = study.structured?.outcomes ?? []
  if (outcomes.length > 0) {
    lines.push("", "Outcomes:", ...outcomes.map((outcome) => `- ${outcome}`))
  }
  return lines.join("\n")
}

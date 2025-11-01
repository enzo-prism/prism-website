import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import Link from "next/link"
import { CASE_STUDIES } from "@/lib/case-study-data"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "case studies: dental & local business growth wins | prism",
  description:
    "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
}

export default function CaseStudies() {
  return (
    <>
      <section id="static-case-studies-hero" className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16">
          <h1 className="text-4xl font-semibold tracking-tight">case studies: dental & local business growth wins</h1>
          <p className="text-lg leading-relaxed text-white/80">
            explore how prism helps practices and local brands increase conversions, protect retention during leadership changes, and launch new offers with confidence. each engagement pairs intentional design with measurable growth experiments.
          </p>
        </div>
      </section>
      <section id="static-case-studies-preview" className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
            featured transformations
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CASE_STUDIES.slice(0, 4).map((study) => (
              <li key={study.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Link href={`/case-studies/${study.slug}`} className="space-y-2">
                  <span className="block text-xs uppercase tracking-[0.24em] text-neutral-400">{study.industry}</span>
                  <span className="block text-lg font-semibold leading-snug text-neutral-900">{study.title}</span>
                  <span className="block text-sm text-neutral-600">{study.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold tracking-tight">featured client results</h2>
            <p>
              prism helps dentists and local businesses protect retention, improve conversion, and launch new services. explore a few wins below or open the full library at <a href="https://www.design-prism.com/case-studies">design-prism.com/case-studies</a>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {CASE_STUDIES.slice(0, 4).map((study) => (
                <li key={`noscript-${study.id}`}>
                  <a href={`/case-studies/${study.slug}`} className="underline">
                    {study.title}
                  </a>{" "}
                  — {study.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </noscript>
      <CaseStudiesPage />
      <SeoTextSection title="case studies & outcomes">
        <p>
          our projects pair strategy, design, and engineering to solve specific business problems—
          retaining patients during a transition, launching a new brand, or rebuilding a site to recover
          traffic. each study highlights the decisions and systems that created lasting results.
        </p>
      </SeoTextSection>
    </>
  )
}

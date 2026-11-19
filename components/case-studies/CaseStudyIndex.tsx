import Link from 'next/link'

import {
  CURRENT_CASE_STUDIES,
  WORK_GROUPS,
  getWorkGroup,
} from '@/components/case-studies/work-index'
import { Section, SectionHeader } from '@/components/prism/section'
import { datedMetricSummary } from '@/lib/case-study-data'
import { caseStudyServices } from '@/lib/case-study-facts'

/**
 * Every current case study as a plain, server-rendered table grouped by
 * industry, with location, services, and dated results on each row. The
 * gallery's industry chips filter on the client; this index gives readers
 * without JavaScript, and AI agents, the same filter in the HTML itself
 * (each group has an anchor: #work-index-<group>).
 */
export default function CaseStudyIndex() {
  const groups = WORK_GROUPS.map((group) => ({
    ...group,
    studies: CURRENT_CASE_STUDIES.filter((study) => getWorkGroup(study) === group.key),
  })).filter((group) => group.studies.length > 0)

  return (
    <Section
      id="work-index"
      aria-labelledby="work-index-title"
      className="scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] py-12 sm:py-16"
    >
      <SectionHeader
        id="work-index-title"
        eyebrow="Index"
        title="every project, by industry."
        description="The same work as a plain list: industry, location, services, and dated results for each client."
      />

      <nav aria-label="Industries" className="mt-8 flex flex-wrap gap-2">
        {groups.map((group) => (
          <a
            key={group.key}
            href={`#work-index-${group.key}`}
            className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground"
          >
            {group.label} ({group.studies.length})
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-12">
        {groups.map((group) => (
          <div key={group.key}>
            <h3
              id={`work-index-${group.key}`}
              className="scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] text-lg font-semibold tracking-[-0.02em] text-foreground"
            >
              {group.label}
            </h3>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/[0.08]">
              <table className="w-full min-w-[44rem] text-left text-[14px] leading-6">
                <thead className="bg-white/[0.03] text-eyebrow text-subtle">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Client</th>
                    <th scope="col" className="px-4 py-3 font-medium">Industry</th>
                    <th scope="col" className="px-4 py-3 font-medium">Location</th>
                    <th scope="col" className="px-4 py-3 font-medium">Services</th>
                    <th scope="col" className="px-4 py-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {group.studies.map((study) => {
                    const results = study.structured?.results ?? []
                    return (
                      <tr
                        key={study.slug}
                        data-industry={study.industry}
                        data-location={study.location}
                        className="border-t border-white/[0.06] align-top"
                      >
                        <th scope="row" className="px-4 py-3 font-medium text-foreground">
                          <Link
                            href={`/case-studies/${study.slug}`}
                            className="underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white/60"
                          >
                            {study.client}
                          </Link>
                        </th>
                        <td className="px-4 py-3 text-muted-foreground">{study.industry}</td>
                        <td className="px-4 py-3 text-muted-foreground">{study.location}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {caseStudyServices(study).join(', ')}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {results.map(datedMetricSummary).join(' ')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

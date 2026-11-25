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
    studies: CURRENT_CASE_STUDIES.filter(
      (study) => getWorkGroup(study) === group.key,
    ),
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
            className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-[13px] text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground"
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
            {/* One table, two layouts: below md each row is a stacked card
                (no sideways scroll, nothing clipped); md+ is a plain table.
                Explicit roles keep the table semantics when the display
                changes. */}
            <div className="mt-4 rounded-2xl border border-white/[0.08] md:overflow-x-auto">
              <table
                role="table"
                className="block w-full text-left text-[14px] leading-6 md:table md:min-w-[44rem]"
              >
                <thead
                  role="rowgroup"
                  className="bg-white/[0.03] text-eyebrow text-subtle max-md:sr-only"
                >
                  <tr role="row">
                    <th
                      role="columnheader"
                      scope="col"
                      className="px-4 py-3 font-medium"
                    >
                      Client
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      className="px-4 py-3 font-medium"
                    >
                      Industry
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      className="px-4 py-3 font-medium"
                    >
                      Location
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      className="px-4 py-3 font-medium"
                    >
                      Services
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      className="px-4 py-3 font-medium"
                    >
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup" className="block md:table-row-group">
                  {group.studies.map((study, index) => {
                    const results = study.structured?.results ?? []
                    return (
                      <tr
                        key={study.slug}
                        role="row"
                        data-industry={study.industry}
                        data-location={study.location}
                        className={
                          'relative grid gap-1 px-4 py-4 align-top md:table-row md:p-0 ' +
                          (index > 0
                            ? 'border-t border-white/[0.06]'
                            : 'md:border-t md:border-white/[0.06]')
                        }
                      >
                        <th
                          role="rowheader"
                          scope="row"
                          className="block text-[16px] font-medium text-foreground md:table-cell md:px-4 md:py-3 md:text-[14px]"
                        >
                          <Link
                            href={`/case-studies/${study.slug}`}
                            className="underline decoration-white/20 underline-offset-4 transition-colors after:absolute after:inset-0 hover:decoration-white/60 md:after:hidden"
                          >
                            {study.client}
                          </Link>
                        </th>
                        <td
                          role="cell"
                          className="block text-muted-foreground md:table-cell md:px-4 md:py-3"
                        >
                          {study.industry}
                        </td>
                        <td
                          role="cell"
                          className="block text-subtle md:table-cell md:px-4 md:py-3 md:text-muted-foreground"
                        >
                          {study.location}
                        </td>
                        <td
                          role="cell"
                          className="text-muted-foreground max-md:hidden md:table-cell md:px-4 md:py-3"
                        >
                          {caseStudyServices(study).join(', ')}
                        </td>
                        <td
                          role="cell"
                          className={
                            'block md:table-cell md:px-4 md:py-3 md:text-muted-foreground ' +
                            (results.length > 0
                              ? 'mt-1 text-foreground/85 md:mt-0'
                              : 'max-md:hidden')
                          }
                        >
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

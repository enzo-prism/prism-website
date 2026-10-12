import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import Footer from '@/components/footer'
import GuideTableOfContents from '@/components/guide-table-of-contents'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Eyebrow } from '@/components/prism/section'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import ScrollToTop from '@/components/scroll-to-top'
import SiteRebuildDynamicSteps from '@/components/site-rebuild-dynamic-steps'
import { WebPageSchema } from '@/components/schema-markup'
import { Button } from '@/components/ui/button'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const guideSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'step-1', label: 'Step 1' },
  { id: 'step-2', label: 'Step 2' },
  { id: 'step-3', label: 'Step 3' },
  { id: 'step-4', label: 'Step 4' },
  { id: 'step-5', label: 'Step 5' },
  { id: 'step-6', label: 'Step 6' },
  { id: 'step-7', label: 'Step 7' },
  { id: 'folder-overview', label: 'Folder layout' },
  { id: 'wrap-up', label: 'Wrap up' },
]

const BENCHMARK_NOTES = [
  {
    label: 'Speed',
    body: '5 minutes 16 seconds from prompt to exported files, captured end-to-end.',
  },
  {
    label: 'Quality',
    body: 'Deep dive on gradients, icon styling, blog completeness, and mobile breakpoints.',
  },
  {
    label: 'Schema',
    body: 'Full structured data plus transcript so you can mirror the benchmark exactly.',
  },
] as const

const SNAPSHOT_GOALS = [
  'Create a folder that includes the full download of the current site.',
  'Extract all readable text and sitemap clues Codex needs for context.',
  'Run Codex locally so the rebuilt Next.js project is ready to preview on localhost.',
] as const

const PAGE_TITLE = 'Rebuild any site locally with Codex'
const PAGE_DESCRIPTION =
  "Follow Prism's no-fluff playbook to download a live site, extract its content, prep Codex context, and rebuild the experience on your own machine."
const CANONICAL_URL = 'https://www.design-prism.com/openai/site-rebuild'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/openai/site-rebuild',
  ogImage: '/prism-opengraph.png',
})

export default function OpenAISiteRebuildGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <ScrollProgressBar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Prism OpenAI implementation guide"
          title="mirror any website and rebuild it with Codex."
          description="No fluff. Just the commands that work on macOS to download a live site, prep Codex context, and run the rebuild locally so you can ship updates fast."
          location="openai site rebuild hero"
          secondary={{ label: 'Back to OpenAI overview', href: '/openai' }}
          showStatus={false}
          glow="green"
        />

        <section aria-label="Guide" className="pb-20 sm:pb-24">
          <div className="prism-container">
            <div className="grid gap-12 border-t border-white/[0.08] pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:gap-16">
              <div className="min-w-0 space-y-16">
                <article id="overview" className="scroll-mt-28 space-y-8">
                  <div className="space-y-4">
                    <Eyebrow>Start here</Eyebrow>
                    <h2 className="text-title text-gradient max-w-[18ch] text-balance pb-1">
                      one folder that captures the live site.
                    </h2>
                    <p className="text-lead max-w-[60ch] text-pretty text-muted-foreground">
                      Every step keeps your local rebuild simple: download the
                      current experience, extract the words that convert, and
                      hand Codex a clean brief so the regenerated build matches
                      what&apos;s live today.
                    </p>
                  </div>
                  <div className="spectrum-rule rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8">
                    <p className="text-eyebrow text-subtle">Goal</p>
                    <h3 className="text-heading mt-3 text-foreground">
                      ship a portable snapshot.
                    </h3>
                    <ol className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                      {SNAPSHOT_GOALS.map((goal, index) => (
                        <li key={goal} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-[11px] text-foreground tabular-nums">
                            {index + 1}
                          </span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>

                <article id="step-1" className="scroll-mt-28 space-y-6">
                  <div className="space-y-2">
                    <p className="text-eyebrow text-subtle">step 1</p>
                    <h3 className="text-heading text-foreground">
                      create a project folder
                    </h3>
                    <p className="text-base leading-7 text-muted-foreground">
                      Keep everything in one spot so assets, text files, and
                      Codex context stay organized.
                    </p>
                  </div>
                  <pre className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-card p-5 font-mono text-sm leading-relaxed text-foreground/90 sm:text-base">
                    <code>
                      {`cd ~/Desktop
mkdir site-rebuild && cd site-rebuild`}
                    </code>
                  </pre>
                </article>

                <SiteRebuildDynamicSteps />

                <article id="wrap-up" className="scroll-mt-28">
                  <div className="rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10">
                    <p className="text-eyebrow text-subtle">Wrap up</p>
                    <h3 className="text-heading mt-3 text-foreground">
                      seven moves, live rebuild.
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      You now have a local mirror of the live site, Codex-ready
                      context, and a running Next.js build on localhost. From
                      here, you can modernize the design, iterate on copy, or
                      push the rebuild into your repo.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg" className="group/cta">
                        <Link href="/openai">
                          Explore more OpenAI systems
                          <ArrowRight
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                          />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>

                <article aria-labelledby="benchmark-title">
                  <div className="prism-beam relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10">
                    <p className="text-eyebrow text-subtle">Next experiment</p>
                    <h3
                      id="benchmark-title"
                      className="text-heading mt-3 text-foreground"
                    >
                      watch an archived Codex benchmark.
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      In November 2025, we ran the Model Test Key from this
                      guide through GPT-5.1 Codex (High) and documented the full
                      run: generation time, UI polish, responsive behavior,
                      sitemap completeness, and the live video breakdown. This
                      is a historical test, not a current model recommendation.
                    </p>
                    <ul className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                      {BENCHMARK_NOTES.map((note) => (
                        <li
                          key={note.label}
                          className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6"
                        >
                          <span className="w-20 shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle sm:pt-1">
                            {note.label}
                          </span>
                          <span className="text-[15px] leading-7 text-muted-foreground">
                            {note.body}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button asChild size="lg" className="group/cta">
                        <Link href="/blog/gpt-5-1-codex-test-dentist-website">
                          Read the benchmark
                          <ArrowRight
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                          />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <a
                          href="https://youtu.be/PZnRkuJ9_S0"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch the run
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <a
                          href="https://developers.openai.com/api/docs/models"
                          target="_blank"
                          rel="noreferrer"
                        >
                          See current OpenAI models
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
              <div className="min-w-0">
                <GuideTableOfContents sections={guideSections} />
              </div>
            </div>
          </div>
        </section>

        <FinalCta location="openai site rebuild final cta" />
      </main>
      <ScrollToTop />
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}

import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import { proseClassName } from '@/components/landing/prose'
import Navbar from '@/components/navbar'
import { Eyebrow } from '@/components/prism/section'
import { cn } from '@/lib/utils'

export type AppPolicySection = {
  id: string
  title: string
  content: ReactNode
}

type AppPolicyPageProps = {
  /** Mono eyebrow, e.g. "Pole Vault OS for iPhone". */
  product: string
  /** Lowercase headline; renders as the page h1. */
  title: string
  lead: ReactNode
  /** Small metadata lines (provider, effective date). */
  meta?: ReactNode[]
  sections: AppPolicySection[]
}

/**
 * Readable dark layout for app support and privacy pages: header, a sticky
 * "on this page" index on desktop, and long-form sections at a 68ch measure.
 */
export function AppPolicyPage({
  product,
  title,
  lead,
  meta = [],
  sections,
}: AppPolicyPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative isolate flex-1 overflow-x-clip"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[460px] opacity-40" />
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(40%_50%_at_25%_30%,oklch(0.66_0.16_258/14%),transparent_70%)] blur-2xl" />
        </div>

        <header className="prism-container pb-12 pt-14 sm:pb-16 sm:pt-20">
          <Eyebrow>{product}</Eyebrow>
          <h1 className="text-title text-gradient mt-5 max-w-[16ch] text-balance pb-1">
            {title}
          </h1>
          <p className="text-lead mt-6 max-w-[58ch] text-pretty text-muted-foreground">
            {lead}
          </p>
          {meta.length ? (
            <ul className="mt-8 max-w-[58ch] space-y-1.5 border-l border-white/[0.1] pl-4 text-sm leading-6 text-subtle">
              {meta.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="prism-container pb-24 sm:pb-32">
          <div className="grid gap-12 border-t border-white/[0.08] pt-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-eyebrow text-subtle">On this page</p>
                <ol className="mt-4 space-y-1 border-l border-white/[0.08]">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] leading-snug text-muted-foreground transition-colors hover:border-white/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="max-w-[68ch] space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className={cn(
                    'scroll-mt-28',
                    index > 0 && 'border-t border-white/[0.08] pt-10',
                  )}
                >
                  <h2
                    id={`${section.id}-title`}
                    className="text-heading text-balance text-foreground"
                  >
                    {section.title}
                  </h2>
                  <div
                    className={cn(
                      proseClassName,
                      'mt-4 text-base sm:text-[1.0625rem]',
                    )}
                  >
                    {section.content}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AppPolicyPage

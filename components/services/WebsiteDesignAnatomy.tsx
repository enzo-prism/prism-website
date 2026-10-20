import { Phone, Star } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { cn } from '@/lib/utils'

/**
 * The four design principles on /website-design. Each number matches a pin
 * on the drawn page beside it, so the list reads as annotations on a layout.
 */
export const WEBSITE_DESIGN_PRINCIPLES = [
  {
    title: 'say it on the first screen.',
    body: 'What you do, who it is for, and how to reach you, visible before anyone scrolls.',
  },
  {
    title: 'put proof where people decide.',
    body: 'Reviews, real photos, and credentials sit beside the buttons, not on a page nobody opens.',
  },
  {
    title: 'keep it light enough to load fast.',
    body: 'Images, fonts, and motion are tuned so the design shows up quickly on any connection.',
  },
  {
    title: 'make the next step obvious.',
    body: 'Every page leads to a call, a booking, or an inquiry, kept within thumb reach on phones.',
  },
] as const

function Pin({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        'absolute z-20 grid size-6 place-items-center rounded-full bg-foreground font-mono text-[11px] font-semibold text-background shadow-[0_0_0_4px_oklch(0.66_0.16_258/22%),0_8px_24px_-8px_oklch(0_0_0/90%)]',
        className,
      )}
    >
      {n}
    </span>
  )
}

function Bar({ className }: { className?: string }) {
  return <span className={cn('block h-2 rounded-full bg-white/10', className)} />
}

/**
 * A drawn page layout (no client data): hero, proof row, service cards, and
 * a phone with a call bar, each pinned to a principle. Decorative to
 * assistive tech; the ordered list carries the content.
 */
function PageAnatomy() {
  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <div aria-hidden="true" className="relative pb-10 sm:pb-12">
        <div className="mr-[14%] overflow-hidden rounded-2xl border border-white/[0.1] bg-background shadow-[0_50px_120px_-50px_oklch(0_0_0/95%)]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
            </span>
            <span className="mx-auto rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-0.5 font-mono text-[10px] text-subtle">
              yourbusiness.com
            </span>
          </div>

          <div className="flex flex-col gap-6 p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-4 rounded-md bg-white/25" />
                <Bar className="w-12" />
              </span>
              <span className="hidden items-center gap-3 sm:flex">
                <Bar className="w-8" />
                <Bar className="w-8" />
                <Bar className="w-8" />
                <span className="h-5 w-12 rounded-full bg-white/80" />
              </span>
            </div>

            <div className="relative flex flex-col gap-3 pt-2">
              <Pin n={1} className="-left-3 top-1 sm:-left-4" />
              <Bar className="h-1.5 w-16 bg-white/15" />
              <span className="block h-4 w-[82%] rounded-md bg-white/75 sm:h-5" />
              <span className="block h-4 w-[58%] rounded-md bg-white/75 sm:h-5" />
              <Bar className="mt-1 w-[70%]" />
              <div className="mt-2 flex gap-2">
                <span className="h-7 w-24 rounded-full bg-white/85" />
                <span className="h-7 w-20 rounded-full border border-white/15" />
              </div>
            </div>

            <div className="relative flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <Pin n={2} className="-left-3 -top-3 sm:-left-4" />
              <span className="flex -space-x-1.5">
                {['bg-white/30', 'bg-white/20', 'bg-white/[0.14]'].map(
                  (tone) => (
                    <span
                      key={tone}
                      className={cn(
                        'size-5 rounded-full border border-background',
                        tone,
                      )}
                    />
                  ),
                )}
              </span>
              <span className="flex gap-0.5 text-foreground/70">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="size-3 fill-current" />
                ))}
              </span>
              <Bar className="w-16 sm:w-24" />
            </div>

            <div className="relative grid grid-cols-3 gap-2.5">
              <Pin n={3} className="-left-3 -top-3 sm:-left-4" />
              {[
                'from-[oklch(0.66_0.16_258/30%)]',
                'from-[oklch(0.76_0.17_145/22%)]',
                'from-[oklch(0.63_0.19_295/28%)]',
              ].map((tint) => (
                <div
                  key={tint}
                  className="flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2"
                >
                  <span
                    className={cn(
                      'block aspect-[4/3] rounded-md bg-gradient-to-br to-transparent',
                      tint,
                    )}
                  />
                  <Bar className="w-[80%]" />
                  <Bar className="h-1.5 w-[55%] bg-white/[0.06]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[30%] max-w-[9.5rem] rotate-[3deg]">
          <div className="overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-background p-1.5 shadow-[0_30px_80px_-30px_oklch(0_0_0/95%)]">
            <div className="flex aspect-[9/17] flex-col gap-2 rounded-[1.05rem] bg-card p-2.5">
              <span className="mx-auto mb-1 h-1 w-8 rounded-full bg-white/10" />
              <span className="block h-2.5 w-[85%] rounded-sm bg-white/70" />
              <span className="block h-2.5 w-[60%] rounded-sm bg-white/70" />
              <Bar className="h-1.5 w-[75%]" />
              <span className="mt-1 block aspect-[4/3] rounded-md bg-gradient-to-br from-[oklch(0.66_0.16_258/26%)] to-transparent" />
              <Bar className="h-1.5 w-[65%]" />
              <div className="relative mt-auto">
                <Pin n={4} className="-left-4 -top-3 size-5 text-[10px]" />
                <span className="flex h-7 items-center justify-center gap-1.5 rounded-full bg-white/90 text-[10px] font-semibold text-background">
                  <Phone className="size-3" />
                  Call
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] text-subtle">
        Illustrative page layout
      </figcaption>
    </figure>
  )
}

export function WebsiteDesignAnatomy() {
  return (
    <Section aria-labelledby="website-design-principles-title">
      <Reveal>
        <div className="relative isolate grid gap-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div
            aria-hidden="true"
            className="bg-dots absolute inset-0 -z-10 opacity-50"
          />
          <div
            aria-hidden="true"
            className="absolute -left-32 top-1/3 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent)] blur-2xl"
          />
          <div className="flex flex-col gap-8">
            <SectionHeader
              id="website-design-principles-title"
              eyebrow="Design principles"
              title="every design choice has a job."
              description="Good website design is not decoration. Each decision on the page helps a visitor understand you, trust you, and reach out."
              titleClassName="max-w-[15ch]"
            />
            <ol className="flex flex-col gap-5">
              {WEBSITE_DESIGN_PRINCIPLES.map((principle, index) => (
                <li key={principle.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[11px] font-semibold text-background"
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
                      {principle.title}
                    </h3>
                    <p className="max-w-[46ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <PageAnatomy />
        </div>
      </Reveal>
    </Section>
  )
}

export default WebsiteDesignAnatomy

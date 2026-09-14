import type { Metadata } from 'next'

import WaitlistForm from '@/components/forms/WaitlistForm'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
import CapacityNotice from '@/components/waitlist/CapacityNotice'
import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { parseWaitlistFocus, WAITLIST_PATH } from '@/lib/waitlist'

const PAGE_TITLE = 'Join the Prism waitlist'
const PAGE_DESCRIPTION =
  'Prism is at capacity. Join the waitlist and we will review your application and reach out as space frees up for websites, content, and ads.'
const CANONICAL_URL = `https://www.design-prism.com${WAITLIST_PATH}`

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: WAITLIST_PATH,
  ogImage: '/prism-opengraph.png',
})

const WAITLIST_STEPS = [
  {
    label: '01',
    title: 'Join the waitlist',
    body: 'Share your links, goals, and timing. It takes about two minutes.',
  },
  {
    label: '02',
    title: 'We review applications',
    body: 'As space frees up, the team reviews the waitlist and looks for a strong fit.',
  },
  {
    label: '03',
    title: 'We reach out',
    body: 'When we can take on your team, we email you to scope the work together.',
  },
] as const

type WaitlistPageProps = {
  searchParams?: Promise<{ focus?: string | string[] }>
}

export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = searchParams ? await searchParams : {}
  const initialFocus = parseWaitlistFocus(params.focus)

  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={coreRouteSectionClassName}>
          <div
            className={`${coreRouteContainerClassName} grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16`}
          >
            <div className="flex flex-col gap-8">
              <CoreSectionHeading
                eyebrow="Waitlist"
                title="Prism is at capacity."
                description="We are working hard to free up space so more companies can use Prism to grow, as fast as we can. Join the waitlist and we will reach out when we can take on your team."
                as="h1"
                variant="hero"
                titleClassName="max-w-[12ch]"
              />

              <CapacityNotice variant="panel" />

              <ol className="grid gap-5 border-t border-white/10 pt-6">
                {WAITLIST_STEPS.map((step) => (
                  <li key={step.label} className="flex gap-4">
                    <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d766a]">
                      {step.label}
                    </span>
                    <div>
                      <p className="font-sans text-[1.05rem] font-medium leading-7 text-[#f5f0e8]">
                        {step.title}
                      </p>
                      <p className="mt-1 text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div id="waitlist-form">
              <WaitlistForm
                key={initialFocus.join(',')}
                initialFocus={initialFocus}
              />
            </div>
          </div>
        </section>
      </main>
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

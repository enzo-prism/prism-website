import type { Metadata } from 'next'

import WaitlistForm from '@/components/forms/WaitlistForm'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
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

type WaitlistPageProps = {
  searchParams?: Promise<{ focus?: string | string[] }>
}

/**
 * Minimal, single-column stepped flow. The page says one thing, then hands
 * over to the form; the longer "what happens next" copy lives on the
 * thank-you route so this screen carries as little as possible.
 */
export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = searchParams ? await searchParams : {}
  const initialFocus = parseWaitlistFocus(params.focus)

  return (
    <div className="flex min-h-dvh flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main
        className="container-px-safe flex flex-1 flex-col pb-[max(4rem,env(safe-area-inset-bottom))] pt-10 sm:pt-16"
        id="main-content"
        tabIndex={-1}
      >
        <div className="mx-auto w-full max-w-xl">
          <header className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
              Waitlist
            </p>
            <h1 className="text-balance font-sans text-[clamp(2.05rem,7vw,3rem)] font-medium leading-[1] tracking-[-0.045em] text-[#f5f0e8]">
              Join the waitlist
            </h1>
            <p className="text-pretty font-sans text-[1rem] leading-7 text-[#b8afa2]">
              Prism is at capacity. We review applications as space opens.
            </p>
          </header>

          <div className="mt-10 sm:mt-12">
            <WaitlistForm
              key={initialFocus.join(',')}
              initialFocus={initialFocus}
            />
          </div>
        </div>
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

import type { Metadata } from 'next'

import GetStartedForm from '@/components/forms/GetStartedForm'
import { WebPageSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Create your free Growth Dashboard | Prism'
const PAGE_DESCRIPTION =
  'Complete the Prism Growth Dashboard intake for your website, search visibility, proof, offer clarity, tracking, and growth opportunities.'
const CANONICAL_URL = 'https://www.design-prism.com/apply'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/apply',
  ogImage: '/prism-opengraph.png',
})

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#040404] font-sans text-[#F5F5F2]">
      <header className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <TrackedLink
          href="/"
          label="prism home"
          location="apply page minimal header"
          className="font-mono text-[0.78rem] uppercase tracking-[0.32em] text-[#F5F5F2] transition-colors hover:text-[#9EFF2E] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
        >
          Prism
        </TrackedLink>
        <TrackedLink
          href="/get-started"
          label="exit growth dashboard"
          location="apply page minimal header"
          className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7C7C75] transition-colors hover:text-[#F5F5F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
        >
          Exit
        </TrackedLink>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="px-4 pb-10 pt-2 sm:px-6 sm:pb-16 sm:pt-6"
      >
        <GetStartedForm />
      </main>

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

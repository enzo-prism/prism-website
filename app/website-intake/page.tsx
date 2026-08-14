import type { Metadata } from 'next'

import WebsiteIntakeForm from '@/components/forms/WebsiteIntakeForm'
import { WebPageSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Start your new website'
const PAGE_DESCRIPTION =
  'Answer four short questions and Prism will reach out within 24 hours to scope your PRO website.'
const CANONICAL_URL = 'https://www.design-prism.com/website-intake'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/website-intake',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function WebsiteIntakePage() {
  return (
    <div className="min-h-screen bg-black font-sans text-[#F5F0E8]">
      <header className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <TrackedLink
          href="/"
          label="prism home"
          location="website intake minimal header"
          className="font-mono text-[0.78rem] uppercase tracking-[0.32em] text-[#F5F0E8] transition-colors hover:text-[#D8BC79] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
        >
          Prism
        </TrackedLink>
        <TrackedLink
          href="/websites"
          label="exit website intake"
          location="website intake minimal header"
          className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#8F877B] transition-colors hover:text-[#F5F0E8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
        >
          Exit
        </TrackedLink>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="px-4 pb-10 pt-2 sm:px-6 sm:pb-16 sm:pt-6"
      >
        <WebsiteIntakeForm />
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

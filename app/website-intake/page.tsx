import type { Metadata } from 'next'

import WebsiteIntakeForm from '@/components/forms/WebsiteIntakeForm'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { WebPageSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Start your new website'
const PAGE_DESCRIPTION =
  'Tell us what you need and Prism will reach out within 24 hours to scope your new website.'
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
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#D8BC79]">
                PRO website
              </p>
              <h1 className="mt-4 text-balance text-[clamp(2rem,6vw,3.4rem)] font-medium leading-[1.0] tracking-[-0.05em] text-[#f5f0e8]">
                Your new website starts here.
              </h1>
              <p className="mt-4 text-pretty text-[1.02rem] leading-7 text-[#b8afa2]">
                Four quick questions. We&apos;ll reach out within 24 hours to
                scope a website built to rank on Google and get cited by AI.
              </p>
            </div>
            <WebsiteIntakeForm />
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

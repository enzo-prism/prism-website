import type { Metadata } from 'next'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import Footer from '@/components/footer'
import GrowthProcessSection from '@/components/get-started/GrowthProcessSection'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
import styles from '@/components/get-started/get-started-page.module.css'
import { cn } from '@/lib/utils'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Free dental practice audit | Prism'
const PAGE_DESCRIPTION =
  'Submit your dental practice for a focused review of the website, Google presence, reviews, booking path, tracking, and clearest growth opportunities.'
const CANONICAL_URL = 'https://www.design-prism.com/get-started'

const APPLICATION_NOTES = [
  'Free. Reviewed by a real person.',
  'Built for dental practices that want clearer patient growth.',
] as const

const APPLICATION_PREVIEW = [
  'Website',
  'Google Maps',
  'Reviews',
  'Booking path',
  'Tracking',
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/get-started',
  ogImage: '/prism-opengraph.png',
})

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#F5F5F2]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <GrowthProcessSection />

        <section
          id="book-call"
          className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div
            className={cn(
              coreRouteContainerClassName,
              'grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10',
            )}
          >
            <div className="space-y-8">
              <CoreSectionHeading
                title="One short audit request."
                description="About a minute. Just the essentials we need to review your practice."
                titleClassName="max-w-[13ch]"
              />

              <div className="space-y-4 border-t border-white/10 pt-6">
                {APPLICATION_NOTES.map((note) => (
                  <p
                    key={note}
                    className="font-sans text-[0.98rem] leading-7 text-[#C6C6C0]"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>

            <div
              className={cn(
                styles.sectionFrame,
                styles.scanlines,
                'relative overflow-hidden border border-white/10 bg-[#070707] px-6 py-6 sm:px-8 sm:py-8',
              )}
            >
              <div className={styles.noiseField} aria-hidden="true" />
              <span
                className={styles.corner}
                data-corner="tl"
                aria-hidden="true"
              />
              <span
                className={styles.corner}
                data-corner="tr"
                aria-hidden="true"
              />
              <span
                className={styles.corner}
                data-corner="bl"
                aria-hidden="true"
              />
              <span
                className={styles.corner}
                data-corner="br"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <p className="max-w-[34rem] font-mono text-[0.98rem] leading-8 text-[#D0D0C8]">
                    No sales maze. No calendar wall. No long brief.
                  </p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  {APPLICATION_PREVIEW.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="font-mono text-[0.78rem] uppercase tracking-[0.2em] text-[#767670]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-mono text-[0.92rem] leading-7 text-[#D6D6CF]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <CoreActionLink
                    href="/apply"
                    label="start free audit"
                    location="get started entry cta"
                  >
                    Start free audit
                  </CoreActionLink>
                  <p className="font-mono text-[0.78rem] leading-6 text-[#8C8C85]">
                    We review every real practice submission.
                  </p>
                </div>
              </div>
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

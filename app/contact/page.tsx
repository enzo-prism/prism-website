import type { Metadata } from 'next'

import ContactForm from '@/components/forms/ContactForm'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TrackedAnchor from '@/components/tracked-anchor'
import { ContactPageSchema } from '@/components/schema-markup'
import {
  CoreSectionHeading,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Contact',
  description: 'Send Prism a note. We reply within 24 hours.',
  path: '/contact',
  ogImage: '/prism-opengraph.png',
})

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={coreRouteSectionClassName}>
          <div className="mx-auto max-w-xl">
            <CoreSectionHeading
              eyebrow="Contact"
              title="Talk to Prism."
              description="Send a note. We reply within 24 hours."
              as="h1"
              variant="hero"
            />

            <div className="mt-10">
              <ContactForm />
            </div>

            <p className="mt-8 text-center text-[0.95rem] leading-7 text-[#8f877b]">
              Prefer email?{' '}
              <TrackedAnchor
                href="mailto:support@design-prism.com"
                label="Email Prism support"
                location="contact_page"
                className="text-[#f5f0e8] underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-[#d8bc79]"
              >
                support@design-prism.com
              </TrackedAnchor>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <ContactPageSchema />
    </div>
  )
}

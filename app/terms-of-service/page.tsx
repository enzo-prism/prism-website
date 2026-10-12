import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import { proseClassName } from '@/components/landing/prose'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'Terms'
const PAGE_DESCRIPTION =
  'Read the terms for using Prism website, app, design, SEO, advertising, and digital marketing services.'
const CANONICAL_URL = 'https://www.design-prism.com/terms-of-service'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/terms-of-service',
  ogImage: '/prism-opengraph.png',
})

const SECTIONS = [
  { id: 'acceptance-of-terms', label: '1. acceptance of terms' },
  { id: 'services-description', label: '2. services description' },
  { id: 'client-responsibilities', label: '3. client responsibilities' },
  { id: 'payment-terms', label: '4. payment terms' },
  { id: 'intellectual-property', label: '5. intellectual property' },
  { id: 'confidentiality', label: '6. confidentiality' },
  { id: 'warranties-and-disclaimers', label: '7. warranties and disclaimers' },
  { id: 'limitation-of-liability', label: '8. limitation of liability' },
  { id: 'indemnification', label: '9. indemnification' },
  { id: 'termination', label: '10. termination' },
  { id: 'force-majeure', label: '11. force majeure' },
  { id: 'dispute-resolution', label: '12. dispute resolution' },
  { id: 'governing-law', label: '13. governing law' },
  { id: 'entire-agreement', label: '14. entire agreement' },
  { id: 'severability', label: '15. severability' },
  { id: 'contact-information', label: '16. contact information' },
] as const

export default function TermsOfServicePage() {
  const lastUpdated = 'October 9, 2026'

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow={<>Last updated {lastUpdated}</>}
          title="terms of service."
          description={PAGE_DESCRIPTION}
          location="terms of service hero"
          hideCta
          showStatus={false}
          glow="none"
          align="left"
          className="pb-10 sm:pb-14"
          titleClassName="text-title max-w-[18ch]"
          id="legal-title"
        />

        <section aria-labelledby="legal-title" className="pb-20 sm:pb-28">
          <div className="prism-container">
            <div className="grid gap-10 border-t border-white/[0.08] pt-10 sm:pt-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
              <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
                <details className="group/toc rounded-2xl border border-white/[0.08] bg-card lg:hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    On this page
                    <span aria-hidden="true" className="text-subtle transition-transform duration-200 group-open/toc:rotate-45">+</span>
                  </summary>
                  <ol className="space-y-1 border-t border-white/[0.08] px-5 py-4">
                    {SECTIONS.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
                <div className="hidden lg:block">
                  <p className="text-eyebrow text-subtle">On this page</p>
                  <ol className="mt-4 space-y-0.5 border-l border-white/[0.08]">
                    {SECTIONS.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] leading-5 text-muted-foreground transition-colors hover:border-white/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <article className={cn(proseClassName, 'max-w-[68ch] [&>section:first-child>h2]:mt-0')}>
              <section>
                <h2 id="acceptance-of-terms">
                  1. acceptance of terms
                </h2>
                <p>
                  By accessing and using the services provided by prism agency
                  ("we," "our," or "us") through our website design-prism.com,
                  you accept and agree to be bound by these Terms of Service
                  ("Terms"). If you do not agree to these Terms, please do not
                  use our services.
                </p>
                <p>
                  We reserve the right to update or modify these Terms at any
                  time without prior notice. Your continued use of our services
                  following any changes constitutes your acceptance of the new
                  Terms.
                </p>
              </section>

              <section>
                <h2 id="services-description">
                  2. services description
                </h2>
                <p>
                  prism agency provides various digital services including but
                  not limited to:
                </p>
                <ul>
                  <li>Website design and development</li>
                  <li>Mobile application development</li>
                  <li>Digital marketing and SEO services</li>
                  <li>Graphic design and branding</li>
                  <li>AI-powered digital solutions</li>
                  <li>Ongoing maintenance and support</li>
                </ul>
                <p>
                  The specific scope of services will be outlined in individual
                  project agreements or statements of work.
                </p>
              </section>

              <section>
                <h2 id="client-responsibilities">
                  3. client responsibilities
                </h2>
                <p>As a client, you agree to:</p>
                <ul>
                  <li>
                    Provide accurate and complete information necessary for
                    project completion
                  </li>
                  <li>
                    Respond to requests for feedback or approval in a timely
                    manner
                  </li>
                  <li>
                    Ensure all content provided does not infringe on third-party
                    rights
                  </li>
                  <li>Make payments according to the agreed schedule</li>
                  <li>
                    Maintain confidentiality of any login credentials provided
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="payment-terms">
                  4. payment terms
                </h2>

                <h3>
                  payment structure
                </h3>
                <p>
                  Payment terms will be specified in individual project
                  agreements. Standard terms include:
                </p>
                <ul>
                  <li>50% deposit upon project commencement</li>
                  <li>50% balance upon project completion</li>
                  <li>Monthly billing for ongoing services</li>
                  <li>Net 30 payment terms unless otherwise specified</li>
                </ul>

                <h3>
                  late payments
                </h3>
                <p>
                  Late payments may incur a fee of 1.5% per month or the maximum
                  allowed by law. We reserve the right to suspend services for
                  accounts that are more than 30 days overdue.
                </p>

                <h3>
                  refund policy
                </h3>
                <p>
                  Refunds are evaluated on a case-by-case basis. Work already
                  completed is non-refundable. Deposits may be refundable if the
                  project has not commenced, subject to a processing fee.
                </p>
              </section>

              <section>
                <h2 id="intellectual-property">
                  5. intellectual property
                </h2>

                <h3>
                  ownership
                </h3>
                <p>
                  Upon full payment, you will own the final deliverables created
                  specifically for your project. We retain the right to use
                  general methodologies, concepts, and know-how developed during
                  the project.
                </p>

                <h3>
                  portfolio rights
                </h3>
                <p>
                  We reserve the right to display completed work in our
                  portfolio and marketing materials unless specifically agreed
                  otherwise in writing.
                </p>

                <h3>
                  third-party materials
                </h3>
                <p>
                  Any third-party materials (stock photos, fonts, plugins, etc.)
                  are subject to their respective licenses. You are responsible
                  for ongoing licensing fees for such materials.
                </p>
              </section>

              <section>
                <h2 id="confidentiality">
                  6. confidentiality
                </h2>
                <p>
                  Both parties agree to maintain the confidentiality of any
                  proprietary information received during the course of the
                  business relationship. This obligation survives the
                  termination of these Terms.
                </p>
              </section>

              <section>
                <h2 id="warranties-and-disclaimers">
                  7. warranties and disclaimers
                </h2>

                <h3>
                  service warranty
                </h3>
                <p>
                  We warrant that our services will be performed in a
                  professional and workmanlike manner. We will correct any
                  defects in our work at no additional charge for a period of 30
                  days after delivery.
                </p>

                <h3>
                  disclaimer
                </h3>
                <p>
                  EXCEPT AS EXPRESSLY PROVIDED HEREIN, OUR SERVICES ARE PROVIDED
                  "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL
                  WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
                  PARTICULAR PURPOSE.
                </p>
              </section>

              <section>
                <h2 id="limitation-of-liability">
                  8. limitation of liability
                </h2>
                <p>
                  IN NO EVENT SHALL PRISM AGENCY BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
                  ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
                  INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
                  INTANGIBLE LOSSES.
                </p>
                <p>
                  Our total liability for any claim arising out of or relating
                  to these Terms or our services shall not exceed the amount
                  paid by you for the specific service giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 id="indemnification">
                  9. indemnification
                </h2>
                <p>
                  You agree to indemnify, defend, and hold harmless prism
                  agency, its officers, directors, employees, and agents from
                  any claims, damages, losses, or expenses (including reasonable
                  attorneys' fees) arising from:
                </p>
                <ul>
                  <li>Your breach of these Terms</li>
                  <li>Your use of our services</li>
                  <li>Content you provide that infringes third-party rights</li>
                  <li>Your violation of applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 id="termination">
                  10. termination
                </h2>
                <p>
                  Either party may terminate the service relationship with 30
                  days written notice. Upon termination:
                </p>
                <ul>
                  <li>
                    You must pay for all work completed up to the termination
                    date
                  </li>
                  <li>
                    We will deliver all completed work and work in progress
                  </li>
                  <li>
                    All licenses for third-party materials must be transferred
                    or terminated
                  </li>
                  <li>Confidentiality obligations remain in effect</li>
                </ul>
              </section>

              <section>
                <h2 id="force-majeure">
                  11. force majeure
                </h2>
                <p>
                  Neither party shall be liable for any delay or failure to
                  perform due to causes beyond their reasonable control,
                  including but not limited to acts of God, natural disasters,
                  war, terrorism, labor disputes, or internet service
                  interruptions.
                </p>
              </section>

              <section>
                <h2 id="dispute-resolution">
                  12. dispute resolution
                </h2>
                <p>
                  Any disputes arising from these Terms shall first be addressed
                  through good faith negotiations. If negotiations fail,
                  disputes shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association.
                </p>
              </section>

              <section>
                <h2 id="governing-law">
                  13. governing law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the United States and the state in which
                  prism agency is registered, without regard to conflict of law
                  principles.
                </p>
              </section>

              <section>
                <h2 id="entire-agreement">
                  14. entire agreement
                </h2>
                <p>
                  These Terms, together with any project agreements or
                  statements of work, constitute the entire agreement between
                  you and prism agency. Any modifications must be made in
                  writing and signed by both parties.
                </p>
              </section>

              <section>
                <h2 id="severability">
                  15. severability
                </h2>
                <p>
                  If any provision of these Terms is found to be unenforceable
                  or invalid, that provision shall be limited or eliminated to
                  the minimum extent necessary so that these Terms shall
                  otherwise remain in full force and effect.
                </p>
              </section>


              <section>
                <h2 id="contact-information">
                  16. contact information
                </h2>
                <p>
                  For questions about these Terms of Service, please contact us
                  at:
                </p>
                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-card p-6 [&_p]:my-1">
                  <p className="font-semibold text-foreground">
                    prism agency
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:support@design-prism.com"
                    >
                      support@design-prism.com
                    </a>
                  </p>
                  <p>
                    Website:{' '}
                    <Link href="/">
                      design-prism.com
                    </Link>
                  </p>
                </div>
              </section>

              <section className="mt-14 rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-7 [&_p]:my-0">
                <p className="text-[15px] leading-7 text-muted-foreground">
                  <strong>Note:</strong> By using our services, you acknowledge
                  that you have read, understood, and agree to be bound by these
                  Terms of Service. If you are entering into these Terms on
                  behalf of a company or other legal entity, you represent that
                  you have the authority to bind such entity to these Terms.
                </p>
              </section>
</article>
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

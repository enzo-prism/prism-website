import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import { proseClassName } from '@/components/landing/prose'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'Privacy'
const PAGE_DESCRIPTION =
  'Learn how Prism collects, uses, and protects personal information across our website and services.'
const CANONICAL_URL = 'https://www.design-prism.com/privacy-policy'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/privacy-policy',
  ogImage: '/prism-opengraph.png',
})

const SECTIONS = [
  { id: 'introduction', label: 'introduction' },
  { id: 'information-we-collect', label: 'information we collect' },
  { id: 'how-we-use-your-information', label: 'how we use your information' },
  { id: 'cookies-and-tracking-technologies', label: 'cookies and tracking technologies' },
  { id: 'sharing-your-information', label: 'sharing your information' },
  { id: 'data-security', label: 'data security' },
  { id: 'your-rights-and-choices', label: 'your rights and choices' },
  { id: 'childrens-privacy', label: "children's privacy" },
  { id: 'international-data-transfers', label: 'international data transfers' },
  { id: 'third-party-links', label: 'third-party links' },
  { id: 'changes-to-this-privacy-policy', label: 'changes to this privacy policy' },
  { id: 'contact-us', label: 'contact us' },
] as const

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 9, 2026'

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow={<>Last updated {lastUpdated}</>}
          title="privacy policy."
          description={PAGE_DESCRIPTION}
          location="privacy policy hero"
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
                <h2 id="introduction">
                  introduction
                </h2>
                <p>
                  prism agency ("we," "our," or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit
                  our website design-prism.com, use our services, or engage with
                  us in any way.
                </p>
                <p>
                  Please read this privacy policy carefully. By using our
                  services, you agree to the collection and use of information
                  in accordance with this policy.
                </p>
              </section>
              <section>
                <h2 id="information-we-collect">
                  information we collect
                </h2>

                <h3>
                  personal information
                </h3>
                <p>
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul>
                  <li>Fill out contact forms on our website</li>
                  <li>Subscribe to our newsletter or blog</li>
                  <li>Request a quote or consultation</li>
                  <li>Create an account or profile</li>
                  <li>
                    Communicate with us via email, phone, or other channels
                  </li>
                </ul>
                <p>
                  This information may include:
                </p>
                <ul>
                  <li>
                    Name and contact information (email address, phone number,
                    mailing address)
                  </li>
                  <li>
                    Business information (company name, industry, website)
                  </li>
                  <li>Project requirements and preferences</li>
                  <li>Payment and billing information</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3>
                  automatically collected information
                </h3>
                <p>
                  When you visit our website, we automatically collect certain
                  information about your device and usage, including:
                </p>
                <ul>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Device information</li>
                </ul>
              </section>

              <section>
                <h2 id="how-we-use-your-information">
                  how we use your information
                </h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              <section>
                <h2 id="cookies-and-tracking-technologies">
                  cookies and tracking technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track
                  activity on our website and store certain information. These
                  technologies may include:
                </p>
                <ul>
                  <li>
                    <strong>Cookies:</strong> Small data files stored on your
                    device
                  </li>
                  <li>
                    <strong>Web Beacons:</strong> Electronic images used to
                    count users who have visited certain pages
                  </li>
                  <li>
                    <strong>Analytics Tools:</strong> Google Analytics, Hotjar,
                    and similar services to understand how visitors use our site
                  </li>
                </ul>
                <p>
                  You can instruct your browser to refuse all cookies or to
                  indicate when a cookie is being sent. However, if you do not
                  accept cookies, you may not be able to use some portions of
                  our website.
                </p>
              </section>
              <section>
                <h2 id="sharing-your-information">
                  sharing your information
                </h2>
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  situations:
                </p>
                <ul>
                  <li>
                    <strong>Service Providers:</strong> With third-party vendors
                    who perform services on our behalf
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> If required by law or
                    to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a
                    merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong>Consent:</strong> With your explicit consent for any
                    other purpose
                  </li>
                </ul>
              </section>
              <section>
                <h2 id="data-security">
                  data security
                </h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </section>
              <section>
                <h2 id="your-rights-and-choices">
                  your rights and choices
                </h2>
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal information:
                </p>
                <ul>
                  <li>
                    <strong>Access:</strong> Request a copy of the personal
                    information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Opt-out of marketing
                    communications
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request your data in a
                    portable format
                  </li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </section>
              <section>
                <h2 id="childrens-privacy">
                  children's privacy
                </h2>
                <p>
                  Our services are not directed to individuals under the age of
                  13. We do not knowingly collect personal information from
                  children under 13. If you become aware that a child has
                  provided us with personal information, please contact us, and
                  we will take steps to delete such information.
                </p>
              </section>
              <section>
                <h2 id="international-data-transfers">
                  international data transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have data protection laws that are different
                  from the laws of your country. By using our services, you
                  consent to the transfer of information to countries outside of
                  your country of residence.
                </p>
              </section>
              <section>
                <h2 id="third-party-links">
                  third-party links
                </h2>
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  third-party sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </section>
              <section>
                <h2 id="changes-to-this-privacy-policy">
                  changes to this privacy policy
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </section>
              <section>
                <h2 id="contact-us">
                  contact us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us at:
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

import PricingHero from '@/components/pricing/PricingHero'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import {
  CANONICAL_PRICING_OFFERS,
  GROWTH_SPRINT_COMMON_RANGE_LABEL,
  PRICING_PRIMARY_CTA,
  PRICING_SECONDARY_CTA,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

const growthPathSteps = [
  {
    stage: '01',
    title: 'Create your Growth Dashboard',
    price: CANONICAL_PRICING_OFFERS.growth_dashboard.priceLabel,
    description:
      'Share the basic context Prism needs to understand the practice, market, website, Google presence, reviews, tracking, and goals.',
  },
  {
    stage: '02',
    title: 'Complete the intake',
    price: 'About a minute',
    description:
      'The intake keeps the first step focused. No calendar wall, no pressure loop, and no long brief before Prism can see the business clearly.',
  },
  {
    stage: '03',
    title: 'Receive the Light Audit',
    price: CANONICAL_PRICING_OFFERS.light_audit.priceLabel,
    description:
      'A focused snapshot of visible growth opportunities, including website clarity, Google presence, local visibility, reviews, tracking basics, and the top three opportunities.',
  },
  {
    stage: '04',
    title: 'Decide on the Deep Growth Audit',
    price: CANONICAL_PRICING_OFFERS.deep_growth_audit.priceLabel,
    description:
      'A deeper diagnostic product when there is enough signal to study the growth system, find leverage, and shape a clear next step.',
  },
  {
    stage: '05',
    title: 'Scope the focused sprint',
    price: CANONICAL_PRICING_OFFERS.growth_sprint.priceLabel,
    description:
      'If the fit is strong, Prism recommends a 60-day sprint scoped from your audit around the highest-leverage opportunities.',
  },
] as const

const pricingSnapshot = [
  {
    item: CANONICAL_PRICING_OFFERS.growth_dashboard.name,
    price: CANONICAL_PRICING_OFFERS.growth_dashboard.priceLabel,
    role: 'Free to start. Creates the context Prism needs before making a recommendation.',
  },
  {
    item: CANONICAL_PRICING_OFFERS.light_audit.name,
    price: CANONICAL_PRICING_OFFERS.light_audit.priceLabel,
    role: 'A first-pass diagnosis of visible opportunities and the clearest next moves.',
  },
  {
    item: CANONICAL_PRICING_OFFERS.deep_growth_audit.name,
    price: CANONICAL_PRICING_OFFERS.deep_growth_audit.priceLabel,
    role: 'A real diagnostic product for practices ready to understand the growth system in more depth.',
  },
  {
    item: CANONICAL_PRICING_OFFERS.growth_sprint.name,
    price: `${CANONICAL_PRICING_OFFERS.growth_sprint.priceLabel}; most ${GROWTH_SPRINT_COMMON_RANGE_LABEL}`,
    role: 'A focused 60-day execution sprint scoped from your audit.',
  },
  {
    item: CANONICAL_PRICING_OFFERS.ongoing_growth_partner.name,
    price: CANONICAL_PRICING_OFFERS.ongoing_growth_partner.priceLabel,
    role: 'Optional ongoing growth execution after a sprint creates enough signal.',
  },
] as const

const sprintExamples = [
  {
    title: 'Website clarity sprint',
    price: 'From $3,500',
    description:
      'Sharpen the website, treatment pages, conversion path, tracking, and launch foundation when the site is blocking patient trust.',
    includes: ['Message hierarchy', 'Conversion path', 'Tracking basics'],
  },
  {
    title: 'Local visibility sprint',
    price: 'Commonly $3,500-$7,500+',
    description:
      'Improve the practice signals patients see before they choose: Google presence, reviews, local pages, listings, and proof.',
    includes: ['Google presence', 'Review system', 'Local trust signals'],
  },
  {
    title: 'Acquisition system sprint',
    price: 'Scoped from your audit',
    description:
      'Connect ads, landing pages, creative direction, analytics, and follow-up so the highest-leverage opportunities are tested quickly.',
    includes: ['Landing path', 'Creative testing', 'Lead tracking'],
  },
] as const

const partnerLevels = [
  {
    title: 'Growth Support Partner',
    price: 'From $1,500+/month',
    description:
      'Light ongoing support, measurement, prioritization, and iterative improvement once the core system is in place.',
  },
  {
    title: 'Growth Execution Partner',
    price: 'Commonly $2,000-$3,500+/month',
    description:
      'Ongoing execution across website, SEO, reviews, local visibility, ads support, reporting, and growth testing.',
  },
  {
    title: 'Premium Growth Partner',
    price: 'From $3,500+/month',
    description:
      'Higher-touch growth execution, strategy, testing, creative direction, and multi-channel support.',
  },
] as const

const faqs = [
  {
    question: 'Is the Growth Dashboard really free?',
    answer:
      'Yes. It gives Prism the context to review your business and prepare your Light Audit.',
  },
  {
    question: 'What is included in the free Light Audit?',
    answer:
      'A focused snapshot of visible growth opportunities, usually covering website clarity, Google presence, local visibility, reviews, tracking basics, and the top three opportunities.',
  },
  {
    question: 'Why is the Deep Growth Audit $500?',
    answer:
      'Because it is a real diagnostic product. It goes deeper than a surface review and gives Prism enough clarity to recommend a focused sprint.',
  },
  {
    question: 'Do I have to buy a sprint after the audit?',
    answer:
      'No. The audit is valuable on its own. If there is a strong fit, Prism will recommend a custom 60-day sprint.',
  },
  {
    question: 'How much does a sprint cost?',
    answer:
      'Sprints start at $3,500. Most range from $3,500-$7,500+ depending on scope.',
  },
  {
    question: 'Do you offer monthly retainers?',
    answer:
      'Yes, usually after a sprint. Ongoing partnerships start at $1,500/month and commonly range from $2,000-$3,500+/month.',
  },
  {
    question: 'Can referral partners waive the audit fee?',
    answer:
      'Some trusted referral partners can unlock a complimentary Deep Growth Audit. The standard value remains $500.',
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-transparent font-sans text-[#f5f0e8]">
      <PricingHero />

      <section id="growth-path" className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div className={coreRouteIntroBandClassName}>
            <CoreSectionHeading
              eyebrow="Growth path"
              title="Start with diagnosis. Move only when the next step is clear."
              description="Pricing follows the growth system. Prism learns the context first, shows the clearest opportunities, then scopes the work around leverage."
              titleClassName="max-w-[13ch]"
            />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {growthPathSteps.map((step) => (
              <article
                key={step.stage}
                className={cn(
                  coreRoutePanelClassName,
                  'flex min-h-[22rem] flex-col p-6',
                )}
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#797165]">
                  {step.stage}
                </p>
                <h2 className="mt-5 text-[1.35rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#f5f0e8]">
                  {step.title}
                </h2>
                <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                  {step.price}
                </p>
                <p className="mt-auto pt-8 text-[0.95rem] leading-7 text-[#b8afa2]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing-snapshot" className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]',
          )}
        >
          <CoreSectionHeading
            eyebrow="Snapshot"
            title="The numbers are simple. The scope comes from the audit."
            description="Prism does not force a practice into preset plans before diagnosis. This is the common path from free to start through focused execution."
          />

          <div className="overflow-hidden border-y border-white/12">
            {pricingSnapshot.map((row) => (
              <div
                key={row.item}
                className="grid gap-4 border-b border-white/12 py-5 last:border-b-0 md:grid-cols-[minmax(0,0.86fr)_minmax(12rem,0.62fr)_minmax(0,1.12fr)] md:items-start"
              >
                <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-[#f5f0e8]">
                  {row.item}
                </p>
                <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                  {row.price}
                </p>
                <p className="text-[0.95rem] leading-7 text-[#b8afa2]">
                  {row.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
          )}
        >
          <div className={cn(coreRoutePanelClassName, 'p-8 sm:p-10')}>
            <CoreSectionHeading
              eyebrow="Why this path"
              title="Fixed plans create false confidence before diagnosis."
              description="Two practices can need the same outcome and completely different work. Prism starts with the Growth Dashboard and Light Audit so the highest-leverage opportunities shape the investment."
              titleClassName="max-w-[12ch]"
            />
          </div>

          <div className={cn(coreRoutePanelClassName, 'p-8 sm:p-10')}>
            <CoreSectionHeading
              eyebrow="Deep Growth Audit"
              title="A real diagnostic product, not a surface review."
              description="The Deep Growth Audit is normally $500 because it studies the growth system deeply enough to make a focused sprint useful. It is the bridge between a free snapshot and paid execution."
              titleClassName="max-w-[12ch]"
            />
            <div className="mt-8 grid gap-3 border-t border-white/12 pt-6">
              {[
                'Website clarity and booking path',
                'Google presence, reviews, and local visibility',
                'Tracking basics and highest-leverage opportunities',
              ].map((item) => (
                <p
                  key={item}
                  className="border-b border-white/10 pb-3 text-[0.98rem] leading-7 text-[#d4cdc3] last:border-b-0 last:pb-0"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sprint-examples" className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div className={coreRouteIntroBandClassName}>
            <CoreSectionHeading
              eyebrow="60-day sprints"
              title="Examples of focused sprint work."
              description="Sprints start at $3,500. Most range from $3,500-$7,500+ depending on the leverage, urgency, creative needs, and channel mix found in the audit."
              titleClassName="max-w-[10ch]"
            />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {sprintExamples.map((sprint) => (
              <article
                key={sprint.title}
                className={cn(coreRoutePanelClassName, 'p-7 sm:p-8')}
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#d8bc79]">
                  {sprint.price}
                </p>
                <h2 className="mt-4 text-[1.55rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#f5f0e8]">
                  {sprint.title}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-7 text-[#b8afa2]">
                  {sprint.description}
                </p>
                <ul className="mt-7 space-y-3 border-t border-white/12 pt-5">
                  {sprint.includes.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#8f877b]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]',
          )}
        >
          <CoreSectionHeading
            eyebrow="Ongoing partner"
            title="Common partnership levels after a sprint."
            description="Prism usually moves into ongoing support after a sprint creates signal. These are common levels, not hard plans."
          />

          <div className="grid gap-4">
            {partnerLevels.map((level) => (
              <article
                key={level.title}
                className="grid gap-4 border-b border-white/12 pb-5 last:border-b-0 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]"
              >
                <div>
                  <h2 className="text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {level.title}
                  </h2>
                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                    {level.price}
                  </p>
                </div>
                <p className="text-[0.98rem] leading-7 text-[#b8afa2]">
                  {level.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div
            className={cn(
              coreRoutePanelClassName,
              'grid gap-8 bg-black/30 p-8 sm:p-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center',
            )}
          >
            <CoreSectionHeading
              eyebrow="Preferred referrals"
              title="Preferred referrals may receive a complimentary Deep Growth Audit."
              description="For select referrals from trusted Prism partners, the $500 Deep Growth Audit may be waived. The process is the same: create your Growth Dashboard, complete the intake, receive your Light Audit, then claim the complimentary Deep Growth Audit if eligible."
              titleClassName="max-w-[13ch]"
            />
            <div className="lg:justify-self-end">
              <CoreActionLink href={PRICING_PRIMARY_CTA.href} variant="heroPrimary">
                {PRICING_PRIMARY_CTA.label}
              </CoreActionLink>
            </div>
          </div>
        </div>
      </section>

      <section className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]',
          )}
        >
          <CoreSectionHeading
            eyebrow="FAQ"
            title="Common pricing questions."
            description="Clear answers on the dashboard, audits, sprint pricing, ongoing partner levels, and referral eligibility."
          />

          <div className="border-t border-white/12 lg:border-t-0">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-b border-white/12 py-6 first:pt-0"
              >
                <h2 className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {faq.question}
                </h2>
                <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-[#b8afa2]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 pb-28 sm:px-6 sm:py-24">
        <div
          className={cn(
            coreRouteContainerClassName,
            'border-t border-white/12 pt-8 sm:pt-10',
          )}
        >
          <CoreSectionHeading
            title="Start with clarity. Then invest where growth is most likely to move."
            description="Create your free Prism Growth Dashboard and get a focused view of your biggest visible opportunities."
            titleClassName="max-w-[13ch]"
          />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
            <CoreActionLink href={PRICING_PRIMARY_CTA.href} variant="heroPrimary">
              {PRICING_PRIMARY_CTA.label}
            </CoreActionLink>
            <CoreActionLink
              href={PRICING_SECONDARY_CTA.href}
              variant="heroSecondary"
            >
              {PRICING_SECONDARY_CTA.label}
            </CoreActionLink>
          </div>
        </div>
      </section>

      <PricingStructuredData />
    </div>
  )
}

function PricingStructuredData() {
  const deepAudit = CANONICAL_PRICING_OFFERS.deep_growth_audit
  const growthSprint = CANONICAL_PRICING_OFFERS.growth_sprint

  return (
    <>
      <ServiceSchema
        serviceId="pricing-deep-growth-audit"
        name={deepAudit.name}
        description={deepAudit.description}
        serviceType="Growth diagnostic"
        areaServed="United States"
        offerDetails={{
          name: deepAudit.name,
          description: deepAudit.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(deepAudit.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <ServiceSchema
        serviceId="pricing-growth-sprint"
        name={growthSprint.name}
        description={growthSprint.description}
        serviceType="Growth marketing"
        areaServed="United States"
        offerDetails={{
          name: growthSprint.name,
          description: growthSprint.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(growthSprint.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema
        questions={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </>
  )
}

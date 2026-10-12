import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import { BulletList } from '@/components/landing/seo/bullet-list'
import { TextLink } from '@/components/landing/seo/text-link'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import {
  FAQSchema,
  ServiceSchema,
  WebPageSchema,
} from '@/components/schema-markup'
import { SeoSection } from '@/components/seo/seo-section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  BarChart3,
  ChevronDown,
  Clapperboard,
  Code2,
  FileText,
  Layers,
  MapPin,
  MessageSquareQuote,
  Repeat,
  ShieldCheck,
  Video,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

const PAGE_TITLE = 'Patient testimonial system'
const PAGE_DESCRIPTION =
  'Turn patient stories into case studies, social clips, structured data, and Google Business Profile posts.'
const CANONICAL_URL = 'https://www.design-prism.com/proof'

const proofFaqItems = [
  {
    question: 'How much time does my team spend?',
    answer:
      'Prism keeps the workflow light for your team: we install the capture flow, package the assets, and publish only the stories you approve.',
  },
  {
    question: 'Do patients actually submit?',
    answer:
      'Completion depends on timing, audience, and the questions asked. Prism keeps the approved flow mobile-first and short, then reports the measured completion rate.',
  },
  {
    question: 'What if a patient shares PHI?',
    answer:
      'Prism reviews every submission and only publishes what is authorized for use.',
  },
  {
    question: 'Can Prism Proof run in multiple locations?',
    answer:
      'Yes. The capture, approval, publishing, and reporting system can scale across multi-location practices.',
  },
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/proof',
  ogImage: '/prism-opengraph.png',
})

const OUTPUT_ASSETS = [
  { icon: FileText, label: 'Website case study' },
  { icon: MessageSquareQuote, label: 'Quotable snippets' },
  { icon: Clapperboard, label: 'Vertical clips' },
  { icon: MapPin, label: 'GBP post drafts' },
  { icon: Code2, label: 'Structured data' },
] as const

const WHY_IT_WORKS = [
  {
    icon: Video,
    title: 'Video adds context.',
    body: 'A 30-60s face-to-camera story can carry emotion, detail, and credibility that a short quote cannot.',
  },
  {
    icon: Layers,
    title: 'One input, many assets.',
    body: 'Each story becomes a website case study, quotable snippets, vertical clips, GBP post drafts, and structured data for richer search results.',
  },
  {
    icon: Repeat,
    title: 'Compounding proof.',
    body: 'Every approved story adds another real customer perspective that can support the site, search, and social.',
  },
] as const

const HOW_IT_WORKS = [
  {
    step: 'Invite',
    body: 'We trigger a friendly post-appointment message with a link to your private Prism Proof page.',
  },
  {
    step: 'Capture',
    body: 'Patients record a short video or answer a few prompts. We include a clear consent step, so publishing scope is documented for review.',
  },
  {
    step: 'Transform',
    body: 'We edit, transcribe, and structure the story into assets that actually sell.',
  },
  {
    step: 'Distribute',
    body: 'We publish to your site, prep social/search drafts, add schema, and slot the story into high-intent pages.',
  },
  {
    step: 'Measure',
    body: 'We track engagement and conversion lift where Proof is present, and double down where it works best.',
  },
] as const

const DIFFERENT = [
  {
    title: 'Engineered for conversion, not vanity.',
    body: 'Stories get placed on pages that matter (service pages, pricing, location pages), not buried on a testimonials island.',
  },
  {
    title: 'Built for repeatability.',
    body: 'One link, one consistent flow, and a lightweight approval step for your team.',
  },
  {
    title: 'Consent-aware by design.',
    body: 'Clear authorization, sensible disclosures, and no incentives for public platform reviews.',
  },
  {
    title: 'Category-agnostic.',
    body: 'Designed for dentists. Effective for any local service with a waiting room and a happy customer.',
  },
] as const

const DEPLOY_FIRST = [
  {
    title: 'Hero/Home “Trust Strip”',
    body: 'reel + headline quote above the fold.',
  },
  {
    title: 'Top Service Pages',
    body: 'one 60s clip + 2-3 high-credibility quotes per page.',
  },
  {
    title: 'Location Pages',
    body: 'neighborhood-specific stories to win local intent.',
  },
  {
    title: 'Booking Funnel',
    body: '“Still deciding?” modal with a 30s patient clip to nudge the conversion.',
  },
] as const

const PROMPTS = [
  'What brought you in?',
  'What were you worried about before?',
  'How did the team make it easy?',
  'What’s better now?',
  'Would you recommend us? Why?',
] as const

const FLYWHEEL = [
  {
    title: 'Research & Ideation',
    body: 'Identify post-appointment timing and prompts that pull authentic stories.',
  },
  {
    title: 'Creation & Remixing',
    body: 'Capture a 60s video or quick form, then edit, transcribe, and package into multi-format assets.',
  },
  {
    title: 'Optimization & Analysis',
    body: 'Place Proof on high-intent pages, track engagement and conversion lift, refine monthly.',
  },
  {
    title: 'Monetization & Scaling',
    body: 'Distribute to site, search, and social; stack new stories each month to compound results.',
  },
] as const

export default function ProofPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Prism Proof"
          title="more trust. more patients. less friction."
          description="Real patient stories are the strongest growth lever you’re not pulling. Prism Proof turns quick, authentic testimonials into a compounding engine of social proof across your site, search, and social, without adding work to your day."
          location="proof hero"
          ctaHref={WAITLIST_CTA.href}
          secondary={{ label: 'See sample assets', href: '/case-studies', trackingLabel: 'see sample assets' }}
          glow="warm"
        >
          <div className="mx-auto max-w-5xl">
            <Card className="relative overflow-hidden p-5 text-left sm:p-8">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
              <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.6fr)] lg:gap-8">
                <div>
                  <Badge variant="outline">TL;DR</Badge>
                  <p className="mt-4 text-lg leading-8 tracking-[-0.015em] text-foreground">
                    We capture patient stories, turn them into high-converting assets, and distribute them
                    everywhere your next patient decides.
                  </p>
                </div>
                <div aria-hidden="true" className="hidden h-px w-16 bg-gradient-to-r from-white/5 via-white/30 to-white/5 lg:block" />
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="One story becomes">
                  {OUTPUT_ASSETS.map((asset) => {
                    const Icon = asset.icon
                    return (
                      <li
                        key={asset.label}
                        className="flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-background/60 p-3.5"
                      >
                        <Icon aria-hidden="true" className="size-4 text-foreground" />
                        <span className="text-[13px] leading-5 text-muted-foreground">{asset.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Card>
          </div>
        </LandingHero>

        <Section aria-labelledby="proof-why-title">
          <Reveal>
            <SectionHeader
              id="proof-why-title"
              eyebrow="why it works"
              title="why prism proof works."
              description="Patients trust patients. Proof gives them a real person to listen to before they choose you."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
            {WHY_IT_WORKS.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <SpotlightCard beam={index === 1} className="h-full p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                    </span>
                    <h3 className="text-heading mt-6 text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.body}</p>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section aria-labelledby="proof-included-title">
          <Reveal>
            <SectionHeader
              id="proof-included-title"
              eyebrow="what you get (standard)"
              title="everything from invite to publish."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-6">
            <Reveal className="lg:col-span-3">
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">capture</p>
                <h3 className="text-heading mt-4 text-foreground">Done-for-you Patient Story Flow</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                  Post-visit text/email with a link to your private testimonial page. No apps to download, no
                  logins.
                </p>
                <p className="mt-6 text-sm font-medium text-foreground">
                  Two capture paths (your page, not Google/Yelp)
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-medium text-foreground">Quick Video (60s)</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">guided prompts, retakes allowed.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-medium text-foreground">Quick Form (90s)</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      punchy Q&amp;A for quotes and highlights.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-3">
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">distribution kit</p>
                <h3 className="text-heading mt-4 text-foreground">Editing &amp; Packaging</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                  We clean the clip, add captions and branding, pull the transcript, and extract 3-5 quotable
                  lines.
                </p>
                <BulletList
                  className="mt-6"
                  marker="dot"
                  items={[
                    'On-site Case Study block or page (with CTA)',
                    'Review/Video schema markup for SEO',
                    'Google Business Profile post draft',
                    'Instagram reel + caption draft',
                    'Email snippet for campaigns or autoresponders',
                  ]}
                />
              </Card>
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <BarChart3 aria-hidden="true" className="size-[18px] text-foreground" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Reporting</h3>
                  <p className="mt-1 text-[15px] leading-7 text-muted-foreground">
                    Dashboard tiles for capture rates, assets produced, pages upgraded, and measured engagement
                    where tracking is available.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="proof-how-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
            <Reveal>
              <SectionHeader id="proof-how-title" eyebrow="end to end" title="how it works." />
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
              {HOW_IT_WORKS.map((item, index) => (
                <li key={item.step} className="flex flex-col gap-3 bg-card p-6">
                  <span className="font-mono text-xs tabular-nums text-subtle">step 0{index + 1}</span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.step}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <SeoSection eyebrow="the difference" title="what makes it different.">
          <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {DIFFERENT.map((item) => (
              <div key={item.title} className="py-6">
                <dt className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.title}</dt>
                <dd className="mt-1.5 text-[15px] leading-7 text-muted-foreground">{item.body}</dd>
              </div>
            ))}
          </dl>
        </SeoSection>

        <Section aria-labelledby="proof-measure-title">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">measurement</p>
                <h2 id="proof-measure-title" className="text-heading mt-4 text-foreground">
                  what Prism measures.
                </h2>
                <BulletList
                  className="mt-6"
                  items={[
                    'Capture completion from invitation through approved submission.',
                    'Asset delivery across case studies, clips, quotes, and approved distribution drafts.',
                    'Page engagement where testimonial assets are placed and a reliable baseline exists.',
                  ]}
                />
                <blockquote className="mt-6 border-l-2 border-white/20 pl-5 text-[15px] leading-7 text-foreground">
                  Prism reports the outcomes the installed tracking can support. We do not publish a universal
                  conversion promise.
                </blockquote>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">placement</p>
                <h2 className="text-heading mt-4 text-foreground">where we deploy Proof first.</h2>
                <ul className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {DEPLOY_FIRST.map((item) => (
                    <li key={item.title} className="py-4">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="proof-prompts-title">
          <Reveal>
            <SectionHeader
              id="proof-prompts-title"
              eyebrow="prompts"
              title="patient prompts that pull real stories."
              description="(Short, natural, zero scripts, so it sounds like a human, not a commercial.)"
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 sm:mt-14">
              {PROMPTS.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-2xl rounded-bl-md border border-white/10 bg-card px-5 py-3.5 text-[17px] tracking-[-0.015em] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <SeoSection
          eyebrow="compliance"
          title="the boring, important part."
          description="We configure the workflow once, then keep the approval and disclosure steps visible to your team."
        >
          <Card className="p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em] text-foreground">
              <ShieldCheck aria-hidden="true" className="size-5 text-foreground" />
              Compliance notes
            </h3>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="font-medium text-foreground">We do not incentivize Google/Yelp reviews.</dt>
                <dd className="mt-1 text-[15px] leading-7 text-muted-foreground">
                  Rewards, if used, apply only to your private submission page.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Clear consent.</dt>
                <dd className="mt-1 text-[15px] leading-7 text-muted-foreground">
                  Every testimonial includes written authorization before publishing.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Transparent disclosure.</dt>
                <dd className="mt-1 text-[15px] leading-7 text-muted-foreground">
                  If a thank-you is provided, we disclose it wherever the story appears.
                </dd>
              </div>
            </dl>
          </Card>
        </SeoSection>

        <Section aria-labelledby="proof-scope-title">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <SpotlightCard beam className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">scope</p>
                <h2 id="proof-scope-title" className="text-heading mt-4 text-foreground">
                  how Prism Proof is scoped.
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  Prism scopes the capture flow, approval process, publishing cadence, and reporting around your
                  locations and goals once we can take on your team. Join the waitlist to be considered for the
                  next monthly intake. There are no public Proof tiers or one-size-fits-all promises.
                </p>
                <p className="mt-6 border-l-2 border-white/20 pl-5 text-[15px] leading-7 text-foreground">
                  <strong className="font-semibold">Proof</strong> can support a Prism website, Content OS, Dental
                  OS, or Prism Infinity engagement.
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={80}>
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">the flywheel</p>
                <h2 className="text-heading mt-4 text-foreground">how Proof fits the Prism Flywheel.</h2>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FLYWHEEL.map((item, index) => (
                    <li key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                      <p className="mt-2 font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    </li>
                  ))}
                </ol>
                <TextLink href="/prism-flywheel" className="mt-6">
                  Explore the Prism Flywheel
                </TextLink>
              </Card>
            </Reveal>
          </div>
        </Section>

        <SeoSection id="proof-faq" eyebrow="FAQ" title="questions, answered.">
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {proofFaqItems.map((item) => (
              <details key={item.question} className="group/faq py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-4 text-[17px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-subtle transition-transform duration-200 group-open/faq:rotate-180"
                  />
                </summary>
                <p className="max-w-[64ch] pb-6 text-pretty text-[15px] leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </SeoSection>

        <FinalCta
          location="proof final cta"
          title="turn patient moments into momentum."
          secondary={{ label: 'See sample assets', href: '/case-studies' }}
        />
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <ServiceSchema
        serviceId="prism-proof"
        name="Prism Proof"
        description={PAGE_DESCRIPTION}
        serviceType="Patient testimonial capture and reputation content system"
        areaServed="US"
        offerDetails={{
          name: 'Prism Proof',
          description:
            'A testimonial capture and distribution system that turns patient stories into website proof, video clips, schema, social drafts, and reporting.',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={proofFaqItems} />
    </div>
  )
}

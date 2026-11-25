import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenCheck, MapPin, ShieldCheck, Star } from 'lucide-react'

import DentalClientsSection from '@/components/dental-clients-section'
import Footer from '@/components/footer'
import HeroLoopingVideo from '@/components/HeroLoopingVideo'
import {
  ArrowLink,
  CheckList,
  DentalFaq,
  DentalProofStat,
  DentalWorkMarquee,
  StepRail,
  TextLink,
} from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { DisclosurePanel } from '@/components/prism/disclosure-panel'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Card } from '@/components/ui/card'
import { WEBSITE_WAITLIST_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'

import {
  DENTAL_INTERVIEWS,
  InterviewGrid,
} from '@/components/landing/dental/interview-grid'

const lovePoints = [
  {
    title: 'clear answers in seconds',
    description:
      'Treatment pages, insurance info, and provider bios are organized so patients can quickly confirm they’re in the right place.',
  },
  {
    title: 'trust before the first call',
    description:
      'Real photos, reviews, and what-to-expect details ease anxiety and make it easy to choose your practice.',
  },
  {
    title: 'booking that works on a phone',
    description:
      'Tap-to-call, request forms, and online booking sit where patients look for them, so the next step takes a few taps.',
  },
]

const patientSetup = [
  'Treatment pages for implant, ortho, and cosmetic consultations, each with its own booking path.',
  'Short request forms plus call and form tracking, so you can see which pages bring in inquiries.',
  'A review request step after each visit, connected to the new site.',
]

const designEssentials = [
  {
    title: 'clear treatment pages',
    description:
      'Service pages (implants, Invisalign, emergency, whitening) written for patient intent, with FAQs, next steps, and financing context.',
  },
  {
    title: 'trust signals that ease anxiety',
    description:
      'Provider bios, reviews, real photos and video, and what-to-expect sections so patients feel confident choosing you.',
  },
  {
    title: 'a fast path to booking',
    description:
      'Call, form, and online booking designed for mobile, routed to the right person, and measured with conversion tracking.',
  },
  {
    title: 'accessible by design',
    description:
      'Accessible patterns (semantic headings, readable type, keyboard support, alt text) so more patients can use your site.',
  },
  {
    title: 'seo-ready foundations',
    description:
      'Clean information architecture, internal links, and schema so Google, and AI assistants like ChatGPT, can understand your services.',
  },
  {
    title: 'migration and ownership',
    description:
      'A clean cutover with redirects and analytics, with your domain and accounts in your name, so you’re not locked in again.',
  },
]

const designExamples = [
  {
    label: 'Dr. Christopher Wong',
    description: 'Practice transition and a modern rebuild',
    href: '/case-studies/dr-christopher-wong',
  },
  {
    label: 'Mataria Dental Group',
    description: 'Multi-location clarity and a growth foundation',
    href: '/case-studies/mataria-dental-group',
  },
  {
    label: 'Family First Smile Care',
    description: 'A patient-first experience and clearer booking',
    href: '/case-studies/family-first-smile-care',
  },
  {
    label: 'Wine Country Root Canal',
    description: 'Specialty positioning and a calm patient journey',
    href: '/case-studies/wine-country-root-canal',
  },
]

const treatmentHighlights = [
  {
    icon: <BookOpenCheck className="size-5" aria-hidden />,
    title: 'treatment explainers',
    description:
      'Plain-language treatment pages and before-and-after galleries that help patients understand premium procedures before they call.',
  },
  {
    icon: <MapPin className="size-5" aria-hidden />,
    title: 'local seo coverage',
    description:
      'Schema, review profiles, and local landing pages built for high-intent searches like “implants near me”.',
  },
  {
    icon: <Star className="size-5" aria-hidden />,
    title: 'follow-up after the visit',
    description:
      'Review requests and patient follow-up set up with your team, so happy patients have an easy way to say so.',
  },
]

const transferSteps = [
  {
    step: '01',
    title: 'we coordinate the handoff',
    description:
      'We contact your old provider and secure your domain, hosting, and access, without adding to your plate.',
  },
  {
    step: '02',
    title: 'content and forms audit',
    description:
      'We move your content and patient forms, set up redirects, and test every form before launch.',
  },
  {
    step: '03',
    title: 'a planned launch',
    description:
      'We schedule the cutover for a quiet window, then watch the site, forms, and analytics closely after launch.',
  },
]

const integrationPoints = [
  'Booking links, request forms, and tap-to-call built around the scheduling your practice already uses.',
  'Patient intake forms planned around HIPAA requirements.',
  'Custom email, so hello@yourpractice.com reaches the right people on your team.',
  'See your phone calls, leads from website forms, and the service pages patients visit.',
]

const faqs = [
  {
    question: 'will search rankings drop when we migrate?',
    answer:
      'We map every old URL, keep your page details, and resubmit the new structure so search engines can follow the move.',
  },
  {
    question: 'what should a dental practice website include?',
    answer:
      'Clear treatment pages, provider bios, reviews, and a simple booking path, plus fast performance, accessibility, and an SEO-ready structure so patients (and Google) understand you quickly.',
  },
  {
    question: 'how much does a dental practice website cost?',
    answer:
      'It depends on scope: number of locations, services, integrations, content needs, and whether you’re migrating from an old provider. A dental website is scoped as a Prism website, and content or ads can be added when the practice is ready. Prism is fully booked, so we agree on scope when we reach out from the waitlist.',
  },
  {
    question: 'can you integrate specialty services like ortho or implants?',
    answer:
      'Yes. We build a dedicated page for each specialty with financing details, before-and-after galleries, and patient reviews.',
  },
  {
    question: 'how quickly can we switch?',
    answer:
      'We agree on the launch date after reviewing your current website, access, and content. Urgent transitions are possible when an old provider is unresponsive or access is expiring.',
  },
]

const buildSteps = [
  {
    step: '01',
    title: 'intent + site map',
    description:
      'We map treatments, locations, and common questions into a structure patients and search engines can follow.',
  },
  {
    step: '02',
    title: 'copy + conversion plan',
    description:
      'We clarify your offer, write patient-first pages, and define the booking paths (call, form, online scheduling).',
  },
  {
    step: '03',
    title: 'design + build',
    description:
      'Mobile-first design, fast pages, and technical SEO foundations (headings, internal links, schema).',
  },
  {
    step: '04',
    title: 'launch + redirects',
    description:
      'We migrate content, set up redirects, and verify analytics and forms during the switch.',
  },
  {
    step: '05',
    title: 'measure + iterate',
    description:
      'We track calls and leads from your website forms, improve the site, and expand its content over time.',
  },
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental website design for practices',
  description:
    'Fast, mobile-first dental websites that earn patient trust and make booking an appointment easy.',
  path: '/dental-website',
  ogImage: '/prism-opengraph.png',
})

export default function DentalWebsitePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Dental practice websites"
          title="dental practice websites that get found, trusted, and chosen."
          description="Fast dental sites built for local search, clear booking, and a managed handoff."
          location="dental website hero"
          ctaHref={WEBSITE_WAITLIST_CTA.href}
          secondary={{
            label: 'Why dentists pick Prism',
            href: '/why-dental-practices-love-prism',
          }}
          glow="blue"
          titleClassName="max-w-[17ch]"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-end">
            <BrowserFrame
              src="/case-studies/dr-christopher-wong-home-desktop.jpg"
              alt="Dr. Christopher B. Wong dental practice homepage built by Prism"
              url="chriswongdds.com"
              priority
              sizes="(min-width: 1024px) 760px, 92vw"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <DentalProofStat />
              <BrowserFrame
                src="/case-studies/exquisite-dentistry-home-desktop.jpg"
                alt="Exquisite Dentistry homepage built by Prism"
                url="exquisitedentistryla.com"
                sizes="(min-width: 1024px) 440px, 46vw"
                className="hidden sm:block"
              />
            </div>
          </div>
        </LandingHero>

        <Section
          aria-labelledby="dw-proof-title"
          bleed
          className="overflow-hidden"
        >
          <div className="prism-container">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="dw-proof-title"
                eyebrow="Proof"
                title="dental website examples and case studies."
                description="Live dental launches across California."
              />
              <ArrowLink href="/case-studies" className="shrink-0">
                See every case study
              </ArrowLink>
            </Reveal>
          </div>
          <div className="mt-10">
            <DentalWorkMarquee />
          </div>
          <div className="prism-container mt-10">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {designExamples.map((example) => (
                <Link
                  key={example.href}
                  href={example.href}
                  className="group/example flex flex-col gap-2 bg-card p-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-6"
                >
                  <span className="text-eyebrow text-subtle">Case study</span>
                  <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                    {example.label}
                  </span>
                  <span className="text-[14px] leading-6 text-muted-foreground">
                    {example.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        <Section aria-labelledby="dw-scheduling-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-popover shadow-[0_30px_80px_-30px_oklch(0_0_0/90%)]">
                <HeroLoopingVideo
                  videoSrc="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1762028676/scheduling-dental-website_nehxuw.mp4"
                  posterSrc="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762028718/scheduling-dental-website_dnebtj.webp"
                  alt="Preview of a dental practice website scheduling flow"
                  className="rounded-none border-none shadow-none"
                  aspectClassName="aspect-[16/9]"
                  videoClassName="object-cover"
                  priority={false}
                />
              </div>
            </Reveal>
            <Reveal delay={100} className="flex flex-col gap-6">
              <SectionHeader
                id="dw-scheduling-title"
                eyebrow="Simple scheduling"
                title="booking that feels easy for every patient."
                description="Online booking, short request forms, and tap-to-call on every treatment page."
              />
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="text-heading text-foreground">
                  what we set up for patients.
                </h3>
                <CheckList className="mt-4" items={patientSetup} />
              </SpotlightCard>
              <div>
                <WaitlistButton
                  location="dental website scheduling"
                  href={WEBSITE_WAITLIST_CTA.href}
                />
              </div>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="dw-interviews-title">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="dw-interviews-title"
              eyebrow="In their own words"
              title="conversations with dentists and their teams."
              description="Real dentists and office managers on what changed."
            />
            <ArrowLink
              href="/why-dental-practices-love-prism"
              className="shrink-0"
            >
              Why dentists pick Prism
            </ArrowLink>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <InterviewGrid
              interviews={DENTAL_INTERVIEWS}
              location="dental website interviews"
            />
          </Reveal>
        </Section>

        <DentalClientsSection />

        <Section aria-labelledby="dw-build-title" className="py-10 sm:py-12">
          <DisclosurePanel
            id="dw-full-blueprint"
            eyebrow="Full dental blueprint"
            title="what we build, 5-step process, migration, and connected systems."
            summary="6 site essentials, treatment SEO, provider migration, HIPAA-aware forms, and checklists."
            openLabel="View blueprint"
            closeLabel="Hide blueprint"
          >
            <div className="space-y-12">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 id="dw-expect-title" className="text-heading text-foreground">
                    what patients expect.
                  </h3>
                  <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
                    {lovePoints.map((item) => (
                      <li key={item.title} className="bg-card p-5">
                        <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <Card className="p-6">
                  <p className="text-eyebrow text-subtle">Further reading</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>
                      <TextLink href="/blog/ai-search-for-dental-practice">
                        AI search for dental practices
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/blog/dental-practice-rank-higher-google-search">
                        How a dental practice can rank higher in Google Search
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/blog/dentist-website-design-checklist">
                        The dentist website design checklist
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/blog/from-broken-to-beautiful-dental-website-transformation">
                        From broken to beautiful: a dental website transformation
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/dental-practice-seo-expert">
                        Dentist SEO playbook
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/facebook-ads-for-dentists">
                        Facebook ads for dentists
                      </TextLink>
                    </li>
                    <li>
                      <TextLink href="/custom-email-for-dental-practices">
                        Custom email for dental teams
                      </TextLink>
                    </li>
                  </ul>
                  <p className="mt-6 text-xs leading-5 text-subtle">
                    Built by the Prism design and engineering team with patient-first structure, fast performance, and call/form measurement.
                  </p>
                </Card>
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <h3 id="dw-build-title" className="text-heading text-foreground">
                  what we build, and why it works.
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {designEssentials.map((item, index) => (
                    <Card key={item.title} className="h-full p-5">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="mt-3 text-base font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <h3 id="dw-process-title" className="text-heading text-foreground">
                  our build process.
                </h3>
                <div className="mt-6">
                  <StepRail steps={buildSteps} columns={5} />
                </div>
              </div>

              <div className="grid gap-6 border-t border-white/[0.08] pt-10 lg:grid-cols-2">
                <div>
                  <h3 id="dw-treatments-title" className="text-heading text-foreground">
                    treatments, search, and migration.
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {treatmentHighlights.map((item) => (
                      <li key={item.title} className="flex gap-4 rounded-xl border border-white/[0.08] bg-background/60 p-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground">
                          {item.icon}
                        </span>
                        <div>
                          <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 id="dw-migration-title" className="text-heading text-foreground">
                    stress-free provider handoff.
                  </h3>
                  <ol className="mt-5 flex flex-col gap-3">
                    {transferSteps.map((item) => (
                      <li key={item.step} className="flex gap-4 rounded-xl border border-white/[0.08] bg-background/60 p-4">
                        <span className="font-mono text-xs text-subtle">{item.step}</span>
                        <div>
                          <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-foreground" aria-hidden />
                  <h3 id="dw-systems-title" className="text-heading text-foreground">
                    every patient touchpoint, connected.
                  </h3>
                </div>
                <CheckList
                  className="mt-5 grid gap-x-10 gap-y-3 space-y-0 sm:grid-cols-2"
                  items={integrationPoints}
                />
              </div>
            </div>
          </DisclosurePanel>
        </Section>

        <DentalFaq
          idPrefix="dental-website"
          title="switching providers, answered."
          description="The questions we hear from practice owners preparing to switch providers."
          items={faqs}
        />

        <FinalCta
          location="dental website final cta"
          title="your practice, next."
          href={WEBSITE_WAITLIST_CTA.href}
          secondary={{ label: 'See how pricing works', href: '/pricing' }}
        />
      </main>
      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="dental-practice-website-design"
        name="Dental practice website design"
        description="Dental practice website design, copy, and development built to earn trust, load fast, and support long-term local visibility."
        serviceType="Website design"
        areaServed="United States"
        offerDetails={{
          name: 'Dental practice website design',
          description:
            'Dental practice website design, copy, and development built to earn trust, load fast, and support long-term local visibility. Prism is fully booked; scope is agreed when we reach out from the waitlist.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema questions={faqs} />
    </div>
  )
}

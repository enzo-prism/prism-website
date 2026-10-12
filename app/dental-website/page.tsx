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
  'Analytics that show calls, form requests, and which service pages patients visit.',
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
      'It depends on scope: number of locations, services, integrations, content needs, and whether you’re migrating from an old provider. A dental website is scoped as a PRO Website or as part of Dental OS. Prism is fully booked, so we agree on scope when we reach out from the waitlist.',
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
      'We track calls and forms, ship improvements, and expand content over time.',
  },
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental websites',
  description:
    'Fast, mobile-first dental websites that earn patient trust and make booking an appointment easy.',
  path: '/dental-website',
  ogImage: '/prism-opengraph.png',
})

export default function DentalWebsitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Dental practice websites"
          title="dental practice websites that get found, trusted, and chosen."
          description="Prism builds dental practice websites that answer patient questions, are structured for local search, and make booking the obvious next step. Every launch includes a managed handoff from your previous provider."
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

        <Section aria-labelledby="dw-expect-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal className="flex flex-col gap-8">
              <SectionHeader
                id="dw-expect-title"
                eyebrow="Built for dental practices"
                title="what patients expect from a dental practice website."
                description="Before patients choose a dentist, they want clarity, proof, and an easy next step. A great website removes friction and answers questions the way people actually search."
              />
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
                {lovePoints.map((item) => (
                  <li key={item.title} className="bg-card p-5 sm:p-6">
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-[14px] leading-6 text-subtle">
                Who wrote this: the Prism design and engineering team. How we
                build: patient-first structure, fast performance, and
                measurement tied to calls and forms. Why: so your website earns
                patient trust from the first visit.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-5 lg:pt-24">
              <SpotlightCard className="p-6 sm:p-8">
                <h3 className="text-heading text-foreground">
                  what we set up for patients.
                </h3>
                <CheckList className="mt-6" items={patientSetup} />
                <ArrowLink
                  href="/why-dental-practices-love-prism"
                  className="mt-6"
                >
                  See why dentists pick Prism
                </ArrowLink>
              </SpotlightCard>
              <Card className="p-6">
                <p className="text-eyebrow text-subtle">Further reading</p>
                <ul className="mt-4 space-y-3 text-[15px] leading-6 text-muted-foreground">
                  <li>
                    Want the dentist-specific AI Overviews checklist? Read{' '}
                    <TextLink href="/blog/ai-search-for-dental-practice">
                      AI search for dental practices
                    </TextLink>
                    .
                  </li>
                  <li>
                    Want the step-by-step Google checklist? Read{' '}
                    <TextLink href="/blog/dental-practice-rank-higher-google-search">
                      how a dental practice can rank higher in Google Search
                    </TextLink>
                    .
                  </li>
                  <li>
                    Want the website checklist? Read{' '}
                    <TextLink href="/blog/dentist-website-design-checklist">
                      the dentist website design checklist
                    </TextLink>
                    .
                  </li>
                </ul>
              </Card>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="dw-build-title" className="pt-0 sm:pt-0">
          <Reveal>
            <SectionHeader
              id="dw-build-title"
              eyebrow="What we build"
              title="what we build, and why it works."
              description="The goal isn’t “a prettier site.” It’s a calmer, clearer experience patients trust, and a structure Google can understand."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designEssentials.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <Card className="h-full p-6 transition-colors hover:border-white/[0.16]">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

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
                description="Explore real dental launches: how we structure pages, clarify services, and simplify booking paths."
              />
              <ArrowLink href="/case-studies" className="shrink-0">
                See every case study
              </ArrowLink>
            </Reveal>
          </div>
          <div className="mt-12">
            <DentalWorkMarquee />
          </div>
          <div className="prism-container mt-12">
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
            <p className="mt-6 text-[15px] text-muted-foreground">
              Want the full transformation story? Read{' '}
              <TextLink href="/blog/from-broken-to-beautiful-dental-website-transformation">
                From broken to beautiful: a dental website transformation
              </TextLink>
              .
            </p>
          </div>
        </Section>

        <Section aria-labelledby="dw-process-title">
          <Reveal>
            <SectionHeader
              id="dw-process-title"
              eyebrow="Our process"
              title="our build process."
              description="A clear plan, a careful build, and a launch that protects what already works."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <StepRail steps={buildSteps} columns={5} />
          </Reveal>
        </Section>

        <Section aria-labelledby="dw-treatments-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="bg-grid absolute inset-0 -z-10 opacity-40"
            />
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <Reveal>
                <SectionHeader
                  id="dw-treatments-title"
                  eyebrow="Treatments and search"
                  title="pages built around the care you provide."
                  description="From emergency dentistry to full-smile makeovers, every page walks patients from first impression to a scheduled visit. Here’s what we add on top of the core site."
                >
                  <ArrowLink href="/dental-practice-seo-expert">
                    See our dentist SEO playbook
                  </ArrowLink>
                </SectionHeader>
              </Reveal>
              <ul className="grid gap-4">
                {treatmentHighlights.map((item, index) => (
                  <Reveal key={item.title} as="li" delay={index * 80}>
                    <div className="flex gap-5 rounded-2xl border border-white/[0.08] bg-background/60 p-5 sm:p-6">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="dw-scheduling-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
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
            <Reveal delay={100} className="flex flex-col gap-7">
              <SectionHeader
                id="dw-scheduling-title"
                eyebrow="Simple scheduling"
                title="booking that feels easy for every patient."
                description="We design the booking path around how your practice schedules today: online booking where you have it, short request forms where you don’t, and tap-to-call everywhere."
              />
              <CheckList
                items={[
                  'The booking step sits on every treatment page, not just the contact page.',
                  'Form requests go to the right inbox, with call and form tracking.',
                  'The same path carries through to specialty landing pages and ad landing pages.',
                ]}
              />
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
              description="Dentists and front office teams sit down with Enzo to talk about patients, operations, and the work of running a practice."
            />
            <ArrowLink
              href="/why-dental-practices-love-prism"
              className="shrink-0"
            >
              Why dentists pick Prism
            </ArrowLink>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <InterviewGrid
              interviews={DENTAL_INTERVIEWS}
              location="dental website interviews"
            />
          </Reveal>
        </Section>

        <Section aria-labelledby="dw-beyond-title">
          <div className="grid gap-8 rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-14 lg:p-14">
            <div className="flex flex-col gap-6">
              <Eyebrow>Beyond the website</Eyebrow>
              <h2
                id="dw-beyond-title"
                className="text-title text-gradient max-w-[16ch] text-balance pb-1"
              >
                one team for every channel your practice uses.
              </h2>
              <p className="max-w-[56ch] text-[15px] leading-7 text-muted-foreground">
                Prism does more than dental websites. We also run the ads, local
                listings, and review workflows that sit on top of the site.
                Curious how the full system fits together?
              </p>
              <CheckList
                items={[
                  <>
                    Local Google Ads and Meta campaigns, measured against calls
                    and booked appointments. See{' '}
                    <TextLink href="/facebook-ads-for-dentists">
                      Facebook ads for dentists
                    </TextLink>
                    .
                  </>,
                  'Google, Apple, Yelp, and other listings kept accurate for hours, services, and reviews.',
                  'Monthly reporting and updates as search and AI results change.',
                ]}
              />
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-background/60 p-6">
              <p className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                see the whole system.
              </p>
              <p className="text-[15px] leading-7 text-muted-foreground">
                Explore how Prism supports dentists with ads, listings, and
                follow-up built on top of the website.
              </p>
              <ArrowLink href="/why-dental-practices-love-prism">
                See why dental practices love Prism
              </ArrowLink>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="dw-migration-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Reveal>
              <SectionHeader
                id="dw-migration-title"
                eyebrow="Stress-free migration"
                title="we do the heavy lifting when you leave your old provider."
                description="Dentists often feel trapped by agencies that own their domain or hosting. Prism handles the details so the switch is smooth for your patients and your team."
              >
                <ArrowLink href="/custom-email-for-dental-practices">
                  Set up custom email for your practice
                </ArrowLink>
              </SectionHeader>
            </Reveal>
            <Reveal delay={100}>
              <ol className="relative flex flex-col gap-4 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-white/10">
                {transferSteps.map((item) => (
                  <li key={item.step} className="relative flex gap-5">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-card font-mono text-[12px] text-foreground">
                      {item.step}
                    </span>
                    <div className="flex-1 rounded-2xl border border-white/[0.08] bg-card p-5">
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Section>

        <DentalClientsSection />

        <Section aria-labelledby="dw-systems-title">
          <Card className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
            <span className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-6">
              <Eyebrow>Connected systems</Eyebrow>
              <h2
                id="dw-systems-title"
                className="text-heading max-w-[24ch] text-foreground sm:text-[2rem]"
              >
                every patient touchpoint, connected.
              </h2>
              <CheckList
                className="grid gap-x-10 gap-y-3 space-y-0 sm:grid-cols-2"
                items={integrationPoints}
              />
              <ArrowLink href="/custom-email-for-dental-practices">
                Learn about custom email for dental teams
              </ArrowLink>
            </div>
          </Card>
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
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema questions={faqs} />
    </div>
  )
}

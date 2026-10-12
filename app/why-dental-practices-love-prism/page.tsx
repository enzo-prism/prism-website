import type { Metadata } from 'next'
import {
  BarChart3,
  CalendarCheck2,
  Camera,
  Compass,
  Cpu,
  Globe2,
  Layers,
  LineChart,
  Mail,
  MapPin,
  MessageSquare,
  MessagesSquare,
  Palette,
  PenSquare,
  Radar,
  RefreshCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'

import FAQSection from '@/components/faq-section'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import {
  CheckList,
  InlineLink,
  WhyActions,
  WhyCaseStudies,
  WhyFeatureGrid,
  WhyHeroVisual,
  WhyHighlightList,
  WhyIconList,
  WhyPanel,
  WhyPlaybook,
  WhySplit,
  WhyStatement,
} from '@/components/landing/why/why-kit'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import ScrollToTop from '@/components/scroll-to-top'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  DENTAL_INTERVIEWS,
  InterviewGrid,
} from '@/components/landing/dental/interview-grid'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA, WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'

const LOCATION = 'why dental'

const heroWhatYouGet = [
  'Dental practice website that explains services and drives calls.',
  'Google Business Profile cleanup + local SEO built for map results.',
  'Review system that keeps feedback coming in.',
  'Tracking for calls, forms, and booked consults.',
  'ADA-aware and HIPAA-aware foundation.',
] as const

const modernPracticePromises = [
  { icon: Globe2, text: 'Show up in the map pack when patients search.' },
  { icon: ShieldCheck, text: 'Look trusted before the first call.' },
  {
    icon: Workflow,
    text: 'Keep reviews and referrals moving without extra work.',
  },
  {
    icon: Cpu,
    text: 'See clear tracking for calls, forms, and booked visits.',
  },
] as const

const prismMethodPillars = [
  {
    title: 'Visibility & Growth',
    headline: 'If you have ever searched your practice and felt invisible.',
    description:
      'When your Google Business Profile is wrong, patients skip you. We fix listings and build local SEO + AEO so you show up when people ask.',
    includes: [
      {
        icon: Radar,
        label: 'Local SEO + AEO for the treatments you want to book',
      },
      {
        icon: MapPin,
        label: 'Google Business Profile cleanup and weekly updates',
      },
      {
        icon: MessageSquare,
        label: 'Reviews workflow with asks, follow-ups, and replies',
      },
      {
        icon: BarChart3,
        label: 'Tracking for calls, forms, and booked consults',
      },
    ],
  },
  {
    title: 'Trust & Storytelling',
    headline: 'If your website feels dated or unclear.',
    description:
      'When service pages are thin, patients bounce. We build a dental practice website with clear service pages, photos, and proof that feel like your chairside care.',
    includes: [
      { icon: Palette, label: 'Design that matches how your office feels' },
      { icon: Camera, label: 'Team + office photography and short videos' },
      { icon: Users, label: 'Team bios, reviews, and patient stories' },
      { icon: PenSquare, label: 'Clear copy for every service page' },
    ],
  },
  {
    title: 'Automation & Operations',
    headline: 'If the front desk is buried in follow-ups.',
    description:
      'When intake is manual, the team loses time. We automate forms, referrals, and follow-ups so patients get fast answers.',
    includes: [
      {
        icon: CalendarCheck2,
        label: 'Online forms for new patients and referrals',
      },
      { icon: Mail, label: 'Patient-ready email templates and routing' },
      { icon: Workflow, label: 'Follow-up workflows for recalls and no-shows' },
      { icon: RefreshCcw, label: 'Clean handoff from old vendors and tools' },
    ],
  },
  {
    title: 'Technology & Leverage',
    headline: 'If your tech stack feels fragile.',
    description:
      'Slow sites and broken tracking waste budget. We build a HIPAA-aware, ADA-aware foundation so the system keeps working when you are busy.',
    includes: [
      { icon: Layers, label: 'Fast website architecture that loads on phones' },
      { icon: Sparkles, label: 'AEO-ready pages and structured answers' },
      { icon: Shield, label: 'HIPAA-aware and ADA-aware setup' },
      { icon: LineChart, label: 'Performance checks and tracking cleanup' },
    ],
  },
] as const

const connectedPresenceHighlights = [
  {
    icon: Compass,
    title: 'Be found where patients look',
    bullets: [
      'Local SEO + AEO for the treatments you want to book.',
      'Google Business Profile that stays accurate and active.',
      'Listings consistency across the directories patients use.',
    ],
  },
  {
    icon: Palette,
    title: 'Look clear and trustworthy',
    bullets: [
      'Dental practice website that feels calm and modern.',
      'Service pages that explain treatments in plain language.',
      'Real team photos and before-and-after proof.',
    ],
  },
  {
    icon: MessagesSquare,
    title: 'Turn visits into calls',
    bullets: [
      'Reviews workflow that keeps feedback steady.',
      'Fast forms and easy scheduling.',
      'Ads with call and form tracking.',
    ],
  },
] as const

const dentalPhotographyHighlights = [
  {
    title: 'One-day capture',
    description:
      'We shoot team portraits, chairside moments, and lobby details in one day.',
  },
  {
    title: 'Sized for every channel',
    description:
      'You get crops for your website hero, ads, local listings, and hiring.',
  },
  {
    title: 'Handled end to end',
    description:
      'We manage the shot list, staff reminders, and delivery so you can focus on patients.',
  },
] as const

const beforeAfterGuideHighlights = [
  {
    title: 'Step-by-step guide',
    description:
      'Camera settings, lighting, and positioning so every shot looks consistent.',
  },
  {
    title: 'Gear list with links',
    description: 'Use the exact flashes, reflectors, and mirrors we recommend.',
  },
  {
    title: 'Patient-ready handoff',
    description:
      'Embed-ready galleries and templates keep clinical and marketing in sync.',
  },
] as const

const featuredCaseStudyDetails = [
  {
    slug: 'dr-christopher-wong',
    highlight: 'Patient trust preserved during transition',
  },
  {
    slug: 'exquisite-dentistry',
    highlight: 'Sophisticated digital experience',
  },
  {
    slug: 'family-first-smile-care',
    highlight: 'Family-focused design and conversion clarity',
  },
  {
    slug: 'grace-dental-santa-rosa',
    highlight: 'Brand refresh and multi-channel visibility',
  },
  { slug: 'town-centre-dental', highlight: 'Analytics-driven site relaunch' },
] as const

const segmentWhoItsFor = [
  'Owner dentists who want a calmer new patient flow and less marketing stress.',
  'Multi-location groups that need one standard across offices.',
  'Practices adding a new provider, service, or transition story.',
]

const segmentProblemsWeSolve = [
  "Service pages that don't answer patient questions.",
  'Map pack visibility lost to messy listings and NAP data.',
  'Reviews that only show up when someone remembers to ask.',
  'Ads that drive the wrong calls or lack tracking.',
  'Front desk buried in manual intake and follow-ups.',
]

const segmentDeliverables = [
  'Dental practice website with clear service pages and ADA-aware UX.',
  'Local SEO + AEO for treatments, providers, and locations.',
  'Google Business Profile + directory management with reviews workflow.',
  'Call, form, and booking tracking tied to each channel.',
  'HIPAA-aware hosting setup with forms and email routing.',
  'Photos and video that show real care and real people.',
]

const segmentProcess = [
  {
    step: 'Audit and map the patient journey',
    detail:
      'We review your site, listings, and intake to find the fastest wins.',
  },
  {
    step: 'Build the foundation',
    detail: 'We launch a clean site and local presence patients trust.',
  },
  {
    step: 'Add growth steps',
    detail: 'We add ads, content, and reviews once the core is solid.',
  },
  {
    step: 'Track and improve',
    detail: 'We report in plain language and adjust each month.',
  },
]

const segmentFaqItems = [
  {
    question: 'How long does a dental website rebuild take?',
    answer:
      'Most practices launch in 6-10 weeks. Timing depends on content, approvals, and locations.',
  },
  {
    question: 'Do you handle HIPAA and ADA considerations?',
    answer:
      'Yes. We build with HIPAA-aware and ADA-aware practices in mind and coordinate on any requirements.',
  },
  {
    question: 'Can you work with our existing brand and photos?',
    answer:
      'Yes. We can work inside your current brand and reuse strong assets. We only recommend a new shoot when needed.',
  },
  {
    question: 'Will you improve our Google Business Profile and reviews?',
    answer:
      'Yes. Listings cleanup and a reviews workflow are core parts of the Prism dental playbook.',
  },
  {
    question: 'How do you measure results for dental practices?',
    answer:
      'We track calls, forms, referrals, and booked visits against search and ads. We report in plain language.',
  },
  {
    question: 'What if we have multiple locations?',
    answer:
      'We standardize the system across offices and tailor pages and listings to each market.',
  },
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental marketing',
  description:
    'Websites, local SEO, Google Business Profile, reviews, and tracking that help dental practices attract new patients.',
  path: '/why-dental-practices-love-prism',
  ogImage: '/prism-opengraph.png',
})

export default function DentalPracticesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="For dentist owners"
          title="grow your practice. worry less about marketing + tech."
          titleClassName="max-w-[16ch]"
          description="Prism helps dentists get more new-patient calls, modernize their online presence, and switch off outdated providers, without stress or downtime."
          location={`${LOCATION} hero`}
          ctaHref={WAITLIST_CTA.href}
          secondary={{
            label: 'See case studies',
            href: '/case-studies',
            trackingLabel: 'see case studies',
          }}
          glow="blue"
        >
          <WhyHeroVisual
            shots={[
              {
                slug: 'family-first-smile-care',
                url: 'famfirstsmile.com',
                alt: 'Family First Smile Care website by Prism',
              },
              {
                slug: 'dr-christopher-wong',
                url: 'chriswongdds.com',
                alt: 'Dr. Christopher Wong dental practice website by Prism',
              },
              {
                slug: 'exquisite-dentistry',
                url: 'exquisitedentistryla.com',
                alt: 'Exquisite Dentistry website by Prism',
              },
            ]}
          />
        </LandingHero>

        <Section className="py-10 sm:py-12" aria-label="What you get">
          <Reveal>
            <Card className="spectrum-rule grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <p className="text-eyebrow text-subtle">What you get</p>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  Need a{' '}
                  <InlineLink href="/dental-practice-seo-expert">
                    seo for dentists playbook
                  </InlineLink>
                  ? See how Prism maps treatments to intent, tightens listings +
                  reviews, and ships steady improvements. Need{' '}
                  <InlineLink href="/dental-website">
                    a dental practice website
                  </InlineLink>
                  ? Start with the dental practice website blueprint.
                </p>
              </div>
              <CheckList items={heroWhatYouGet} />
            </Card>
          </Reveal>
        </Section>

        <Section aria-labelledby="dental-founder-note">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Founder note</Eyebrow>
              <h2
                id="dental-founder-note"
                className="text-gradient mt-5 max-w-[14ch] text-balance pb-1 text-[clamp(2rem,1.45rem+2.2vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
              >
                a note to one dentist owner.
              </h2>
              <p className="mt-6 text-sm text-subtle">
                Enzo Sison, founder of Prism
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="max-w-[62ch] space-y-5 text-pretty text-[17px] leading-[1.75] text-foreground/[0.82]">
                <p>
                  I built Prism for dentist owners who feel stuck with marketing
                  that creates more work. When phones go quiet, your team
                  scrambles. Missed calls pile up. Listings show the wrong
                  hours.
                </p>
                <p>
                  Service pages read like a brochure and don&apos;t answer
                  patient questions. Reviews come in when someone remembers to
                  ask. Staff jumps between tools and still can&apos;t see which
                  channel brought the new patient. You don&apos;t have to chase
                  vendors or decode reports.
                </p>
                <p>
                  Prism exists to fix that. We run the dental practice website,
                  dental practice SEO, Google Business Profile, local SEO, and
                  AEO as one clean system. We set up tracking for calls, forms,
                  and booked consults so you can see what is working. We keep
                  the foundation HIPAA-aware and ADA-aware. Your team stays
                  focused on care while we handle the mess of dental marketing
                  and your online presence.
                </p>
                <p className="font-medium text-foreground">
                  If you want a calmer week and a clearer patient flow, start
                  below.
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        <WhySplit
          id="dental-why-prism"
          eyebrow="Why Prism"
          title="why dentist owners choose Prism."
          description="Most dentists aren't losing patients because they're bad at dentistry. They're losing visibility, consistency, and control online."
          panel={
            <WhyPanel
              eyebrow="The Prism Method"
              title="We run the website, local SEO, and dental marketing as one system so you can:"
              beam
            >
              <WhyIconList items={modernPracticePromises} />
              <div className="mt-8 flex flex-wrap gap-2">
                {['Visibility', 'Trust', 'Automation', 'Leverage'].map(
                  (value) => (
                    <Badge
                      key={value}
                      variant="outline"
                      className="px-3 py-1 text-[13px]"
                    >
                      {value}
                    </Badge>
                  ),
                )}
              </div>
              <p className="mt-6 text-pretty text-sm leading-relaxed text-subtle">
                That is the Prism Method: visibility, trust, automation, and
                leverage. Leverage means the system keeps working even when you
                are in the operatory.
              </p>
            </WhyPanel>
          }
        >
          <div className="space-y-5">
            <p className="border-l-2 border-white/20 pl-5 text-xl font-medium tracking-[-0.02em] text-foreground">
              Prism was built to fix that.
            </p>
            <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
              We pair Silicon Valley engineering, brand design, and AI-driven
              marketing to build systems your team can rely on every day.
            </p>
          </div>
        </WhySplit>

        <Section aria-labelledby="dental-method">
          <Reveal>
            <SectionHeader
              id="dental-method"
              eyebrow="The Prism Method"
              title="visibility. trust. automation. leverage."
              titleClassName="max-w-[16ch]"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2">
            {prismMethodPillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={(index % 2) * 80}
                className="h-full"
              >
                <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full border border-white/15 font-mono text-xs tabular-nums text-muted-foreground">
                      {index + 1}
                    </span>
                    <p className="text-eyebrow text-subtle">{pillar.title}</p>
                  </div>
                  <h3 className="mt-6 text-balance text-xl font-semibold leading-snug tracking-[-0.025em] text-foreground sm:text-2xl">
                    {pillar.headline}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <p className="text-eyebrow text-subtle">Includes</p>
                      <ul className="mt-4 grid gap-3">
                        {pillar.includes.map(({ icon: Icon, label }) => (
                          <li
                            key={label}
                            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                          >
                            <Icon
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                              strokeWidth={1.75}
                            />
                            <span>{label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Want the dentist-specific AI overviews checklist? Read{' '}
            <InlineLink href="/blog/ai-search-for-dental-practice">
              ai search for dental practice
            </InlineLink>
            . Want the step-by-step checklist to rank higher in Google? Read{' '}
            <InlineLink href="/blog/dental-practice-rank-higher-google-search">
              dental practice rank higher in google search
            </InlineLink>
            .
          </p>
        </Section>

        <Section aria-labelledby="dental-voices">
          <Reveal>
            <SectionHeader
              id="dental-voices"
              eyebrow="Real results, real voices"
              title="hear from real dental teams."
              description="These interviews exist so you can hear what changed inside a real practice. You will learn what they fixed first, how they track new patients, and what made the biggest difference."
            />
          </Reveal>
          <Reveal delay={80} className="mt-12 sm:mt-14">
            <InterviewGrid
              interviews={DENTAL_INTERVIEWS}
              location="why dental interviews"
            />
            <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-subtle">
              Each conversation shows the real wins and real bottlenecks, from
              listings and reviews to front-desk follow-up and tracking.
            </p>
          </Reveal>
        </Section>

        <WhyFeatureGrid
          id="dental-one-system"
          eyebrow="Connected presence"
          title="your online presence should feel like one system."
          description="When every channel shares the same standard, patients feel trust and your team feels calm."
          items={connectedPresenceHighlights}
          footer={
            <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Running paid social for your practice? Start with{' '}
              <InlineLink href="/tiktok-ads-for-dentists">
                tiktok ads for dentists
              </InlineLink>
              .
            </p>
          }
        />

        <WhyStatement
          id="dental-inbox"
          eyebrow="Custom email"
          title="own the inbox, not just the website."
        >
          <p>
            Prism sets up{' '}
            <InlineLink href="/custom-email-for-dental-practices">
              custom email
            </InlineLink>{' '}
            so patients, hiring platforms, and partners trust every message. We
            keep it HIPAA-aware and easy for your team to manage.
          </p>
          <p className="mt-4 text-base text-subtle">
            If you want email that builds trust and doesn&apos;t break, start
            here.
          </p>
          <WhyActions
            location={`${LOCATION} inbox`}
            waitlistHref={WAITLIST_CTA.href}
            links={[{ label: 'See case studies', href: '/case-studies' }]}
            className="justify-center"
          />
        </WhyStatement>

        <WhySplit
          id="dental-photography"
          eyebrow="On-site storytelling"
          title="show the photos patients want to see."
          panel={
            <WhyPanel eyebrow="What you get">
              <WhyHighlightList items={dentalPhotographyHighlights} />
            </WhyPanel>
          }
        >
          <div className="space-y-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Our office and team photography day captures real operatories,
              care moments, and lobby details so your funnel feels consistent.
              The full breakdown lives on our{' '}
              <InlineLink href="/dental-photography/office-team">
                office &amp; team photography page
              </InlineLink>
              , where you can tour recent shoots and see how the Apple Maps
              proof works.
            </p>
            <p>
              Use those assets across your website, ads, local listings, and
              hiring without juggling vendors. Prism plans the shot list,
              handles scheduling, and delivers files sized for each channel.
            </p>
            <p className="text-foreground">
              If you want photos that match the care you give, start here.
            </p>
          </div>
          <WhyActions
            location={`${LOCATION} photography`}
            waitlistHref={WAITLIST_FOCUS_HREFS.content}
            links={[
              {
                label: 'Explore office & team photography',
                href: '/dental-photography/office-team',
                trackingLabel: 'explore office and team photography',
              },
            ]}
          />
        </WhySplit>

        <WhySplit
          id="dental-before-after"
          eyebrow="Before & after mastery"
          title="a simple before-and-after system your team can follow."
          reverse
          panel={
            <WhyPanel eyebrow="What the guide covers">
              <WhyHighlightList items={beforeAfterGuideHighlights} />
            </WhyPanel>
          }
        >
          <div className="space-y-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            <p>
              If you are not ready for an on-site production day, Prism still
              gives you a repeatable system. The{' '}
              <InlineLink href="/dental-photography/before-after">
                before + after photography guide
              </InlineLink>{' '}
              shows your team how to stage, light, and document cases without
              slowing the schedule.
            </p>
            <p>
              Follow the tabs for gear, lighting, and workflow tips, then drop
              the assets into your website, social, and consult decks. If you
              need Prism on-site later, you can move into the office and team
              service without learning a new system.
            </p>
            <p className="text-foreground">
              If you want a clear way to capture cases, start with the guide.
            </p>
          </div>
          <WhyActions
            location={`${LOCATION} before after`}
            links={[
              {
                label: 'Explore the guide',
                href: '/dental-photography/before-after',
                trackingLabel: 'explore the guide',
              },
              {
                label: 'See on-site photography',
                href: '/dental-photography/office-team',
                trackingLabel: 'see on-site photography',
              },
            ]}
          />
        </WhySplit>

        <WhyPlaybook
          id="dental-playbook"
          eyebrow="Dental playbook"
          title="what you get with Prism."
          whoItsFor={segmentWhoItsFor}
          problems={segmentProblemsWeSolve}
          deliverables={segmentDeliverables}
          process={segmentProcess}
        />

        <WhyCaseStudies
          id="dental-case-studies"
          title="trusted by dental practices across California and beyond."
          description="Each practice is different, but they all wanted the same thing: steady new patient flow and clear tracking."
          studies={featuredCaseStudyDetails}
          location={LOCATION}
        />

        <FAQSection
          title="dental marketing faq."
          subtitle="Straight answers about scope, timeline, and results."
          items={segmentFaqItems}
        />

        <FinalCta
          location={`${LOCATION} final cta`}
          secondary={{ label: 'See case studies', href: '/case-studies' }}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MailCheck, ShieldCheck, Users2 } from 'lucide-react'

import Footer from '@/components/footer'
import {
  Callout,
  CheckList,
  DentalFaq,
  TextLink,
} from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { FAQSchema, WebPageSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const GOOGLE_WORKSPACE_PARTNER_LINK =
  'https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO'

const tldrPoints = [
  'Looks professional and trustworthy to patients and partners.',
  'Works better with hiring sites like Handshake (they prefer company-domain emails).',
  "Keeps your brand and data under your control (not an employee's personal inbox).",
  'Delivers more reliably when set up with email-security basics (SPF, DKIM, DMARC).',
  'Plays nice with healthcare rules when configured properly (HIPAA plus BAA options).',
]

const benefits = [
  {
    title: 'look legit. build trust.',
    description:
      'emails from hello@yourpractice.com match your website and signage. it is a small signal that patients and partners notice, and hiring portals recognize it too.',
  },
  {
    title: 'better hiring and vendor verification.',
    description:
      'platforms like handshake prefer company-domain emails for faster employer validation. generic mailboxes often face limited functionality or extra steps.',
  },
  {
    title: 'own the inbox, not the employee.',
    description:
      'create or remove accounts in minutes. forward or archive safely when staff changes so resumes and treatment history never live in a personal gmail.',
  },
  {
    title: 'fewer deliverability headaches.',
    description:
      'with spf, dkim, and dmarc in place, receiving servers can verify that your messages are real. that reduces spam flags and blocks spoofers that target clinics.',
  },
  {
    title: 'security foundation for healthcare.',
    description:
      'google workspace or microsoft 365 can be configured with baas and policies that support hipaa compliance when used correctly. hhs allows email with reasonable safeguards.',
  },
  {
    title: 'shared and role addresses that just work.',
    description:
      'use addresses like frontdesk@, billing@, care@, and jobs@ that route to the right people and can be reassigned as your team changes.',
  },
  {
    title: 'simple to use with the same apps.',
    description:
      'prefer gmail or outlook? keep the same interface, just with your own domain and the protections prism configures behind the scenes.',
  },
]

const setupChecklist = [
  'Professional mailboxes on Google Workspace or Microsoft 365.',
  'Aliases and groups (info@, billing@, jobs@, care@).',
  'Deliverability and anti-spoofing: SPF, DKIM, DMARC records configured.',
  'Admin control with easy onboarding, offboarding, password policies, and 2FA.',
  'HIPAA-aware configuration, BAAs, and guidance on safe patient email habits.',
  'Migration from old inboxes with labels, folders, and contacts where possible.',
  'One-page cheat sheet so the team knows how to use the new addresses safely.',
]

const pricingOptions = [
  {
    name: 'Starter',
    description:
      '1-3 mailboxes plus 3 role aliases, flat setup, and per-user licensing.',
  },
  {
    name: 'Growth',
    description:
      '4-10 mailboxes with full migration and a baked-in security policy baseline.',
  },
  {
    name: 'Multi-location',
    description:
      'everything above plus org-wide policies and location-specific routing.',
  },
]

const faqs = [
  {
    question: 'Do we have to change our website?',
    answer:
      'No. We add a few DNS records behind the scenes so your current site stays untouched.',
  },
  {
    question: 'Can we keep using Gmail or Outlook?',
    answer:
      'Yes. You keep the same apps on desktop and mobile, just with your own domain name.',
  },
  {
    question: 'Is this HIPAA compliant?',
    answer:
      'Email can be used with patients when safeguards are in place. With Workspace or 365 plus a signed BAA and the right settings, Prism helps you support HIPAA requirements.',
  },
  {
    question: 'Will our emails land in spam less?',
    answer:
      'Setting SPF, DKIM, and DMARC gives receiving servers a way to trust your messages, which improves deliverability and blocks spoofing attempts.',
  },
  {
    question: 'Why not just keep yourpractice@gmail.com?',
    answer:
      'You do not control it, it looks less professional, staff changes get messy, hiring platforms may slow you down, and it is harder to secure long term.',
  },
]

const microChecklist = [
  'Verify your domain and provision accounts.',
  'Add SPF, DKIM, and DMARC records and confirm alignment.',
  'Create role addresses and routing rules that match your workflow.',
  'Turn on two-step verification and basic data-loss protections.',
  'Sign BAAs (when needed) and apply HIPAA-aware policies.',
  'Migrate legacy mail and contacts.',
  'Deliver the one-page team guide.',
]

const sources = [
  'Handshake prefers company-domain email; generic emails face limits and extra steps.',
  'SPF, DKIM, and DMARC basics and their impact on spoofing and deliverability.',
  'HIPAA and email: HHS allows email with safeguards; Google Workspace offers BAAs on paid tiers.',
]

const PAGE_TITLE = 'Dental practice email'
const PAGE_DESCRIPTION =
  'Set up secure, professional email for your dental practice with a custom domain and a cleaner team workflow.'
const CANONICAL_URL =
  'https://www.design-prism.com/custom-email-for-dental-practices'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/custom-email-for-dental-practices',
  ogImage: '/prism-opengraph.png',
})

export default function CustomEmailDentalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Email foundations for dental teams"
          title="custom email for dental practices."
          description="name@yourpractice.com beats @gmail.com every time. Earn trust, open hiring portals like Handshake, and control every inbox without losing the tools you already love."
          location="custom email hero"
          ctaHref="/waitlist"
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: "See case studies", href: "/case-studies" }}
          glow="violet"
        >
          <div className="mx-auto grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <Card className="p-5 opacity-70">
              <p className="text-eyebrow text-subtle">Before</p>
              <p className="mt-3 flex items-center gap-2.5 font-mono text-[14px] text-muted-foreground">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-subtle" />
                <span className="truncate">yourpractice@gmail.com</span>
              </p>
              <p className="mt-3 text-[13px] leading-5 text-subtle">Personal inbox, no admin control, easy to spoof.</p>
            </Card>
            <SpotlightCard beam className="p-5">
              <p className="text-eyebrow text-subtle">After</p>
              <p className="mt-3 flex items-center gap-2.5 font-mono text-[14px] text-foreground">
                <MailCheck aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">hello@yourpractice.com</span>
              </p>
              <p className="mt-3 text-[13px] leading-5 text-muted-foreground">Your domain, role addresses, SPF, DKIM, and DMARC.</p>
            </SpotlightCard>
          </div>
        </LandingHero>

        <Section aria-labelledby="ce-tldr-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="ce-tldr-title"
                eyebrow="TL;DR"
                title="tl;dr for the no-nonsense crowd."
                description="Five reasons your dental practice needs a custom domain email yesterday."
              />
            </Reveal>
            <Reveal delay={100}>
              <ol className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                {tldrPoints.map((point, index) => (
                  <li key={point} className="flex gap-5 p-5 sm:p-6">
                    <span className="font-mono text-[11px] leading-7 tracking-[0.18em] text-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[15px] leading-7 text-foreground/90">{point}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="ce-problem-title" className="pt-0 sm:pt-0">
          <Reveal className="mx-auto max-w-3xl">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="ce-problem-title" className="text-title text-gradient mt-5 max-w-[16ch] text-balance pb-1">
              the problem we keep seeing.
            </h2>
            <div className="mt-8 space-y-5 text-lead text-muted-foreground">
              <p>
                Practices try to post jobs or verify their business with
                third-party platforms and get stuck because they are using
                yourpractice@gmail.com. Handshake, for instance, expects
                employer accounts to use a company email so they can validate
                faster. Generic emails face limits and manual review.
              </p>
              <p>
                Patients feel the same. Medical information sent from a free
                mailbox looks less trustworthy, and when a staff member leaves
                you lose conversations, candidate threads, and patient context
                tied to their personal inbox. It is preventable.
              </p>
            </div>
          </Reveal>
        </Section>

        <Section aria-labelledby="ce-benefits-title">
          <Reveal>
            <SectionHeader
              id="ce-benefits-title"
              eyebrow="Benefits"
              title="the benefits, explained in plain english."
              description="Seven wins you feel the first week you switch from generic inboxes."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <Reveal
                key={benefit.title}
                delay={(idx % 3) * 70}
                className={cn(
                  idx === 0 && 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
                  idx === benefits.length - 1 && 'lg:col-span-2',
                )}
              >
                <Card
                  className={cn(
                    'flex h-full flex-col p-6 transition-colors hover:border-white/[0.16]',
                    idx === 0 && 'lg:justify-between lg:p-8',
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <MailCheck aria-hidden="true" className="size-4 text-subtle" />
                  </span>
                  <div className={idx === 0 ? 'mt-6 lg:mt-auto' : 'mt-6'}>
                    <h3 className={cn('font-semibold tracking-[-0.02em] text-foreground', idx === 0 ? 'text-heading' : 'text-[17px]')}>
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="ce-setup-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <SectionHeader
                id="ce-setup-title"
                eyebrow="Done for you"
                title="what Prism sets up for you."
                description="Done-for-you implementation so your practice can focus on patients, not MX records."
              />
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {setupChecklist.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/[0.07] bg-background/50 p-4">
                    <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <p className="text-[14px] leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="ce-pricing-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <Reveal className="flex flex-col gap-6">
              <SectionHeader
                id="ce-pricing-title"
                eyebrow="Scope"
                title="pricing that stays simple."
                description="Whether you are modernizing one practice or coordinating multiple locations, Prism scopes everything up front."
              />
              <p className="max-w-[56ch] text-[15px] leading-7 text-muted-foreground">
                Already on Google Workspace or Microsoft 365? We will harden
                deliverability, clean up DNS, and lock in best practices
                without rebuilding from scratch.
              </p>
              <p className="max-w-[56ch] text-[15px] leading-7 text-muted-foreground">
                Need a HIPAA-aware intake workflow too? Read our{' '}
                <TextLink href="/google/dental-patient-forms">Google Workspace patient forms guide</TextLink>.
              </p>
            </Reveal>
            <Reveal delay={100} className="grid gap-3">
              {pricingOptions.map((option) => (
                <Card key={option.name} className="flex gap-4 p-5 sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Users2 aria-hidden="true" className="size-4 text-foreground" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{option.name}</h3>
                    <p className="mt-1 text-[15px] leading-6 text-muted-foreground">{option.description}</p>
                  </div>
                </Card>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="ce-perk-title">
          <SpotlightCard className="relative isolate px-5 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(45%_60%_at_50%_0%,oklch(0.66_0.16_258/18%),transparent_70%)]"
            />
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <Eyebrow>Google Workspace partner perk</Eyebrow>
              <h2 id="ce-perk-title" className="text-title text-gradient mt-5 max-w-[16ch] text-balance pb-1">
                10% off your first year of Google Workspace.
              </h2>
              <p className="text-lead mt-5 text-pretty text-muted-foreground">
                Prism is set up with Google to pass preferred pricing to our
                clients. When we launch your custom domain email, you can enroll
                through our partner link and keep an extra 10% in your pocket
                while we handle the setup, security hardening, and training.
              </p>
              <Button asChild size="lg" variant="outline" className="mt-8">
                <a href={GOOGLE_WORKSPACE_PARTNER_LINK} target="_blank" rel="noopener noreferrer">
                  Activate 10% off Google Workspace
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <p className="mt-4 font-mono text-[11px] text-subtle">
                Link opens in a new tab · available for new workspace orgs only
              </p>
            </div>
          </SpotlightCard>
        </Section>

        <DentalFaq idPrefix="custom-email" title="frequently asked questions." items={faqs} />

        <Section aria-labelledby="ce-checklist-title">
          <Reveal>
            <SectionHeader
              id="ce-checklist-title"
              eyebrow="Every practice"
              title="micro-checklist we execute for every dental practice."
              titleClassName="max-w-[20ch]"
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ol className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card sm:grid-cols-2 lg:grid-cols-4">
              {microChecklist.map((item, index) => (
                <li
                  key={item}
                  className="-mb-px -mr-px flex flex-col gap-3 border-b border-r border-white/[0.07] p-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] leading-6 text-foreground/90">{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Callout className="mt-6" title="Sources for your ops notes">
            <CheckList marker="dot" items={sources} />
          </Callout>
        </Section>

        <FinalCta
          location="custom email final cta"
          secondary={{ label: 'See case studies', href: '/case-studies' }}
        />
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <FAQSchema questions={faqs} />
    </div>
  )
}

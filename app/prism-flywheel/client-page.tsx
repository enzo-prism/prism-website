import {
  ArrowRight,
  ArrowUpRight,
  Gauge,
  Infinity as InfinityIcon,
  TrendingUp,
} from 'lucide-react'

import { LandingHero } from '@/components/landing/landing-hero'
import FlywheelPhaseSelector from '@/components/prism-flywheel/FlywheelPhaseSelector'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import { Card } from '@/components/ui/card'
import { SOCIAL_PROOF_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'

// Tech stack items with their categories
const techStackItems = [
  {
    category: 'AI Development',
    title: 'claude code + cursor',
    description: 'AI-assisted coding for rapid, error-free automation',
  },
  {
    category: 'AI Content',
    title: 'chatgpt + grok + google gemini',
    description: 'Frontier LLMs for content ideation and semantic search',
  },
  {
    category: 'Design & Visual',
    title: 'midjourney + figma + loveable',
    description: 'Visual AI and design tools for sleek, engaging assets',
  },
  {
    category: 'Development',
    title: 'notion + replit + vercel',
    description: 'Collaborative workspaces and deployment for scalable code',
  },
  {
    category: 'Research',
    title: 'perplexity',
    description: 'Real-time AI research to fuel data-driven insights',
  },
  {
    category: 'Local Presence',
    title: 'google business + apple + yelp + zocdoc',
    description:
      'Local SEO and booking integrations for healthcare/brand visibility',
  },
]

// Flywheel phases
const flywheelPhases = [
  {
    number: 1,
    title: 'research & ideation',
    description: 'Watch trends, clip insights, and remix with AI',
    details:
      'Using Perplexity for real-time data and Grok for semantic analysis',
  },
  {
    number: 2,
    title: 'creation & remixing',
    description: 'Build content and code with frontier tools',
    details:
      'Claude Code and Cursor for rapid development, Midjourney for visuals',
  },
  {
    number: 3,
    title: 'optimization & analysis',
    description: 'Refine with data',
    details: 'GA4 for traffic, Hotjar for user heatmaps, GSC for SEO insights',
  },
  {
    number: 4,
    title: 'monetization & scaling',
    description: 'Bundle value into products and scale',
    details:
      'Deploy via Vercel/Replit, connect locally with Google Business Profile',
  },
]

const PRINCIPLES = [
  {
    title: 'maximum leverage',
    desc: 'AI amplifies effort, not replaces it',
    quote: 'Leverage is a force multiplier for your judgment.',
    author: 'Naval Ravikant',
  },
  {
    title: 'compound growth',
    desc: 'Each cycle builds on the last',
  },
  {
    title: 'custom solutions',
    desc: 'Tailored to your unique needs',
  },
] as const

const DATA_SIGNALS = [
  {
    label: 'Analytics',
    title: 'User journey tracking',
    desc: 'GA4 insights for conversion optimization',
  },
  {
    label: 'Visibility',
    title: 'Search optimization',
    desc: 'Google Search Console for search reach',
  },
  {
    label: 'Behavior',
    title: 'User understanding',
    desc: 'Hotjar heatmaps reveal engagement patterns',
  },
] as const

const OUTCOMES = [
  { icon: Gauge, title: 'Faster scaling', desc: 'Accelerate with automation' },
  { icon: TrendingUp, title: 'Lead growth', desc: 'Code meets content' },
  {
    icon: InfinityIcon,
    title: 'Compound returns',
    desc: 'Value that multiplies',
  },
] as const

const RESOURCES = [
  {
    title: 'Written guides',
    desc: 'In-depth articles on flywheel mechanics and implementation strategies',
    cta: 'Read articles',
    href: '/blog',
    external: false,
    label: 'read guides minimal',
  },
  {
    title: 'Video tutorials',
    desc: 'Watch practical demonstrations and real-world flywheel examples',
    cta: 'Watch videos',
    href: 'https://www.youtube.com/@the_design_prism',
    external: true,
    label: 'watch youtube minimal',
  },
  {
    title: 'Daily insights',
    desc: 'Quick tips and behind-the-scenes content on flywheel implementation',
    cta: 'Follow daily',
    href: 'https://www.instagram.com/the_design_prism/',
    external: true,
    label: 'follow instagram minimal',
  },
] as const

function PullQuote({ quote, author }: { quote: string; author: string }) {
  return (
    <figure className="border-l-2 border-white/20 pl-5">
      <blockquote className="text-pretty text-lg leading-relaxed tracking-[-0.01em] text-foreground">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-eyebrow text-subtle">
        {author}
      </figcaption>
    </figure>
  )
}

export default function PrismFlywheelClient() {
  return (
    <>
      <LandingHero
        eyebrow="Compounding growth system"
        title="the Prism flywheel."
        description="Transform code and content into revenue through our AI-powered growth system. Research, create, optimize, and scale. Each cycle compounds your success."
        location="hero-flywheel-minimal"
        secondary={{ label: 'See how it works', href: '#how-it-works' }}
        glow="violet"
      >
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset,0_40px_120px_-60px_oklch(0_0_0/90%)]">
            <iframe
              src="https://player.vimeo.com/video/1104840957?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1&title=0&byline=0&portrait=0"
              title="Prism Flywheel Visualization"
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          <FlywheelPhaseSelector phases={flywheelPhases} />
        </div>
      </LandingHero>

      <Section aria-labelledby="flywheel-philosophy-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                id="flywheel-philosophy-title"
                eyebrow="Philosophy"
                title="our philosophy."
                description="Growth isn't about endless hustle. It's about building intelligent systems. Our flywheel methodology creates a virtuous cycle where every input compounds, transforming your business into a sustainable revenue engine."
              />
            </Reveal>
            <Reveal delay={60} className="space-y-8">
              <p className="max-w-[58ch] text-pretty text-base leading-7 text-muted-foreground">
                We orchestrate frontier AI with thoughtful automation, ensuring
                every decision is data-driven and every action creates lasting
                value.
              </p>
              <PullQuote
                quote="You do not rise to the level of your goals. You fall to the level of your systems."
                author="James Clear, Atomic Habits"
              />
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {PRINCIPLES.map((item) => (
                  <li key={item.title} className="py-5">
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-muted-foreground">
                      {item.desc}
                    </p>
                    {'quote' in item ? (
                      <p className="mt-3 text-sm text-subtle">
                        &ldquo;{item.quote}&rdquo; {item.author}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <SpotlightCard
              beam
              className="flex aspect-square flex-col items-center justify-center gap-5 p-8 text-center"
            >
              <p className="text-eyebrow text-subtle">The equation</p>
              <p className="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
                Code <span className="text-subtle">×</span> Content{' '}
                <span className="text-subtle">×</span> AI
              </p>
              <p aria-hidden="true" className="text-2xl text-subtle">
                =
              </p>
              <p className="text-spectrum text-[clamp(2.4rem,1.8rem+2.6vw,4rem)] font-semibold leading-none tracking-[-0.05em]">
                Leverage
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </Section>

      <Section id="how-it-works" aria-labelledby="flywheel-how-title">
        <Reveal>
          <SectionHeader
            id="flywheel-how-title"
            eyebrow="How it works"
            title="four phases, infinite cycles of growth."
            description="Goals are good for setting a direction, but systems are best for making progress."
            align="center"
          />
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-white/[0.1] md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-10 sm:space-y-12">
            {flywheelPhases.map((phase, index) => (
              <Reveal
                as="li"
                key={phase.number}
                delay={index * 80}
                className="relative"
              >
                <span className="absolute left-5 top-5 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-background font-mono text-[12px] text-foreground tabular-nums md:left-1/2">
                  {String(phase.number).padStart(2, '0')}
                </span>
                <Card
                  className={`ml-14 p-6 md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? 'md:ml-0 md:text-right' : 'md:ml-auto'
                  }`}
                >
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {phase.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-muted-foreground">
                    {phase.description}
                  </p>
                  <p className="mt-3 text-sm text-subtle">{phase.details}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Want a concrete module?{' '}
          <TrackedLink
            href="/proof"
            className="group/proof inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            label="view proof"
            location="how it works crosslink"
          >
            See Prism Proof
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover/proof:translate-x-0.5"
            />
          </TrackedLink>
        </p>
      </Section>

      <Section aria-labelledby="flywheel-stack-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="flywheel-stack-title"
              eyebrow="Technology stack"
              title="frontier ai meets practical implementation."
            />
            <PullQuote
              quote="Design is not just what it looks like and feels like. Design is how it works."
              author="Steve Jobs"
            />
          </Reveal>
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {techStackItems.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 60}
                  className="h-full"
                >
                  <Card className="flex h-full flex-col gap-2 p-6">
                    <p className="text-eyebrow text-subtle">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-sm text-subtle">
              Custom-tailored for your unique growth trajectory.
            </p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="flywheel-data-title">
        <Reveal>
          <SectionHeader
            id="flywheel-data-title"
            eyebrow="Data-driven decisions"
            title="facts drive decisions. decisions drive growth."
            description="Transform insights into growth with intelligent analytics."
          />
        </Reveal>
        <Reveal delay={100}>
          <ul className="spectrum-rule mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.07] md:grid-cols-3">
            {DATA_SIGNALS.map((signal) => (
              <li
                key={signal.label}
                className="flex flex-col gap-2 bg-card p-6 sm:p-8"
              >
                <p className="text-eyebrow text-subtle">{signal.label}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {signal.title}
                </h3>
                <p className="text-[15px] leading-7 text-muted-foreground">
                  {signal.desc}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section aria-labelledby="flywheel-transform-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="space-y-8">
            <SectionHeader
              id="flywheel-transform-title"
              eyebrow="Transform your business"
              title="from endless grind to sustainable growth."
              description="Automate workflows, optimize presence, and create content that converts, all through one intelligent system."
            />
            <PullQuote
              quote="The first rule of compounding: Never interrupt it unnecessarily."
              author="Charlie Munger"
            />
          </Reveal>
          <ul className="grid gap-4 self-end">
            {OUTCOMES.map(({ icon: Icon, title, desc }, index) => (
              <Reveal as="li" key={title} delay={index * 80}>
                <Card className="flex items-center gap-5 p-5 sm:p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-foreground"
                    />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {title}
                    </span>
                    <span className="block text-[15px] text-muted-foreground">
                      {desc}
                    </span>
                  </span>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="flywheel-learn-title">
        <Reveal>
          <SectionHeader
            id="flywheel-learn-title"
            eyebrow="Learn the system"
            title="master the flywheel methodology."
            description="Curated resources on how the flywheel works in practice."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {RESOURCES.map((resource, index) => {
            const linkClassName =
              'group/resource mt-auto inline-flex items-center gap-1.5 rounded-sm pt-6 text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
            return (
              <Reveal
                as="li"
                key={resource.title}
                delay={index * 80}
                className="h-full"
              >
                <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
                  <h3 className="text-heading text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {resource.desc}
                  </p>
                  {resource.external ? (
                    <TrackedAnchor
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                      label={resource.label}
                      location="flywheel-learn"
                    >
                      {resource.cta}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover/resource:-translate-y-0.5 group-hover/resource:translate-x-0.5"
                      />
                    </TrackedAnchor>
                  ) : (
                    <TrackedLink
                      href={resource.href}
                      className={linkClassName}
                      label={resource.label}
                      location="flywheel-learn"
                    >
                      {resource.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover/resource:translate-x-0.5"
                      />
                    </TrackedLink>
                  )}
                </SpotlightCard>
              </Reveal>
            )
          })}
        </ul>
        <p className="mt-8 text-center text-[13px] text-subtle">
          Join {SOCIAL_PROOF.youtube.audience}{' '}
          {SOCIAL_PROOF.youtube.audienceLabel} on YouTube and{' '}
          {SOCIAL_PROOF.instagram.audience}{' '}
          {SOCIAL_PROOF.instagram.audienceLabel} on Instagram. Audience as of{' '}
          {SOCIAL_PROOF_VERIFIED_AT}.
        </p>
      </Section>
    </>
  )
}

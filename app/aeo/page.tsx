import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Ban,
  BarChart3,
  Check,
  FileCode,
  Newspaper,
  Radar,
  RefreshCw,
  TextQuote,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { AeoHeroVisual } from '@/components/services/AeoHeroVisual'
import {
  ServiceBento,
  type ServiceBentoItem,
} from '@/components/services/ServiceBento'
import { ServiceFaq } from '@/components/services/ServiceFaq'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
import {
  ServiceSteps,
  type ServiceStep,
} from '@/components/services/ServiceSteps'
import { AEO_WAITLIST_CTA, CANONICAL_PRICING_OFFERS } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/aeo'
const AEO_OFFER = CANONICAL_PRICING_OFFERS.aeo

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'AEO (answer engine optimization)',
  description:
    'AEO for ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity: crawler access, answer-first pages, consistent listings, and monthly checks.',
  path: '/aeo',
  ogImage: '/prism-opengraph.png',
})

/* ---- The shift ----------------------------------------------------------- */

// Third-party figures only, each printed with its publisher and date and
// checked against the primary source on 2026-10-18. They describe the
// market, never a Prism result.
const SHIFT_STATS = [
  {
    value: '2.5B+',
    label: 'monthly active users of AI Overviews in Google Search',
    source: 'Google I/O keynote',
    date: 'May 2026',
  },
  {
    value: '45%',
    label:
      'of US consumers used AI tools for local business recommendations, up from 6% a year earlier',
    source: 'BrightLocal Local Consumer Review Survey',
    date: 'March 2026',
  },
  {
    value: '8% vs 15%',
    label:
      'of Google visits included a click on a regular result when an AI summary appeared, versus when none did',
    source: 'Pew Research Center',
    date: 'July 2025',
  },
] as const

function SearchVersusAnswer() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-4 border-b border-white/[0.06] p-6 sm:p-8 md:border-b-0 md:border-r">
          <p className="text-eyebrow text-subtle">Then · a page of links</p>
          <ol aria-hidden="true" className="flex flex-col gap-3.5">
            {[72, 58, 84, 64, 76, 52].map((width, index) => (
              <li key={width} className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    'block h-2 rounded-full',
                    index === 3 ? 'bg-foreground/45' : 'bg-white/[0.12]',
                  )}
                  style={{ width: `${width}%` }}
                />
                <span
                  className={cn(
                    'font-mono text-[10px] leading-none',
                    index === 3 ? 'text-muted-foreground' : 'text-subtle/70',
                  )}
                >
                  {index === 3 ? 'yourbusiness.com' : 'example.com'}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-auto text-pretty text-[14px] leading-6 text-muted-foreground">
            A page of results. People scan, compare, and click a few. Being
            fourth still gets you seen.
          </p>
        </div>
        <div className="relative isolate flex flex-col gap-4 p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-spectrum-violet/15 blur-3xl"
          />
          <p className="text-eyebrow text-subtle">Now · one answer</p>
          <div className="rounded-2xl border border-white/[0.08] bg-background/60 p-4 sm:p-5">
            <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
              For a gentle family dentist nearby, three practices stand out.{' '}
              <span className="font-medium text-foreground">Practice One</span>{' '}
              is known for same-week visits and patience with nervous kids.
            </p>
            <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-1.5">
              {['1 · practice-one.com', '2 · practice-two.com', '3 · Yelp'].map(
                (source) => (
                  <li
                    key={source}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {source}
                  </li>
                ),
              )}
            </ul>
          </div>
          <p className="mt-auto text-pretty text-[14px] leading-6 text-muted-foreground">
            One reply and a few sources. If you are not one of them, the
            customer may never see your name.
          </p>
        </div>
      </div>
      <figcaption className="border-t border-white/[0.06] px-6 py-3 font-mono text-[11px] text-subtle sm:px-8">
        Illustration
      </figcaption>
    </figure>
  )
}

/* ---- What you get -------------------------------------------------------- */

const QUESTION_STAGES = [
  {
    stage: 'Discover',
    questions: ['family dentist near me', 'dentist for nervous kids'],
  },
  {
    stage: 'Compare',
    questions: ['invisalign vs braces', 'crown or filling cost'],
  },
  {
    stage: 'Decide',
    questions: ['reviews for your practice', 'your practice open today'],
  },
] as const

const ASKED_ON: readonly {
  label: string
  brand: BrandLogoKey
  theme?: 'dark'
}[] = [
  { label: 'ChatGPT', brand: 'openai', theme: 'dark' },
  { label: 'AI Overviews', brand: 'google' },
  { label: 'Gemini', brand: 'gemini' },
  { label: 'Claude', brand: 'claude' },
  { label: 'Perplexity', brand: 'perplexity' },
  { label: 'Copilot', brand: 'bing' },
]

function QuestionStages() {
  return (
    <div className="border-t border-white/[0.06] px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[11px] text-subtle">Asked on</span>
        {ASKED_ON.map((engine) => (
          <span
            key={engine.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] py-0.5 pl-1 pr-2.5 text-[12px] text-muted-foreground"
          >
            <span className="grid size-5 place-items-center rounded-full bg-white/[0.06]">
              <BrandLogo
                brand={engine.brand}
                theme={engine.theme ?? 'dark'}
                decorative
                className="size-3"
              />
            </span>
            {engine.label}
          </span>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {QUESTION_STAGES.map((group, groupIndex) => (
          <div
            key={group.stage}
            className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-background/50 p-3"
          >
            <p className="flex items-center justify-between font-mono text-[11px] text-subtle">
              {group.stage}
              <span>{String(groupIndex + 1).padStart(2, '0')}</span>
            </p>
            {group.questions.map((question) => (
              <p
                key={question}
                className="w-fit rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] leading-5 text-muted-foreground"
              >
                {question}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function AnswerFirstPage() {
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="rounded-xl border border-white/[0.08] bg-background/60 p-4">
        <p className="font-mono text-[10px] text-subtle">
          yourbusiness.com/invisalign
        </p>
        <p className="mt-2 text-[14px] font-medium leading-snug text-foreground">
          How much does Invisalign cost?
        </p>
        <p className="mt-2 rounded-md bg-white/[0.06] px-2 py-1.5 text-[13px] leading-5 text-foreground/90">
          It depends on three things: the case, the length of treatment, and
          your insurance.
        </p>
        <span className="mt-3 block h-1.5 w-[86%] rounded-full bg-white/[0.08]" />
        <span className="mt-2 block h-1.5 w-[58%] rounded-full bg-white/[0.08]" />
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
        <Check className="size-3" strokeWidth={2.2} />
        Answer in the first sentence
      </p>
    </div>
  )
}

const CRAWLER_RULES = ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot']

function CrawlerRules() {
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <pre className="overflow-hidden rounded-xl border border-white/[0.08] bg-background/70 p-4 font-mono text-[12px] leading-6">
        <span className="text-subtle"># robots.txt</span>
        {CRAWLER_RULES.map((bot) => (
          <span key={bot} className="block">
            <span className="text-subtle">User-agent: </span>
            <span className="text-foreground">{bot}</span>
            {'\n'}
            <span className="text-subtle">Allow: </span>
            <span className="text-muted-foreground">/</span>
          </span>
        ))}
      </pre>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Server-rendered', 'Schema', 'Sitemaps'].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

const LISTINGS = [
  'Google Business Profile',
  'Bing Places',
  'Apple Business',
  'Yelp',
] as const

function ListingsMatch() {
  return (
    <ul className="flex flex-col gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {LISTINGS.map((listing) => (
        <li
          key={listing}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground"
        >
          {listing}
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
            <Check className="size-3" strokeWidth={2.2} />
            Matches
          </span>
        </li>
      ))}
    </ul>
  )
}

const AI_REFERRERS = [
  'chatgpt.com',
  'perplexity.ai',
  'gemini.google.com',
  'copilot.microsoft.com',
] as const

function AiReferrals() {
  return (
    <ul className="flex flex-col gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {AI_REFERRERS.map((referrer) => (
        <li
          key={referrer}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground"
        >
          <span className="font-mono text-[12px]">{referrer}</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            AI visit
          </span>
        </li>
      ))}
    </ul>
  )
}

const WHAT_YOU_GET: readonly ServiceBentoItem[] = [
  {
    icon: Radar,
    title: 'know where you stand',
    body: 'We ask the engines the questions your customers ask, from first search to final decision, several times each, and record where you are cited, mentioned, or missing.',
    className: 'md:col-span-4',
    visual: <QuestionStages />,
    beam: true,
  },
  {
    icon: TextQuote,
    title: 'pages that answer first',
    body: 'Clear pages that answer real customer questions directly, with the specific facts an assistant can quote.',
    visual: <AnswerFirstPage />,
  },
  {
    icon: FileCode,
    title: 'open to every crawler',
    body: 'Server-rendered pages, schema, sitemaps, and crawler rules, with no firewall setting quietly blocking AI search bots.',
    visual: <CrawlerRules />,
  },
  {
    icon: BadgeCheck,
    title: 'one story everywhere',
    body: 'Your name, services, hours, and reviews line up on the profiles and directories assistants check.',
    visual: <ListingsMatch />,
  },
  {
    icon: BarChart3,
    title: 'reports in plain English',
    body: 'Each month: how often you appear, what changed, and the AI visits and citations that Google Analytics, Search Console, and Bing report.',
    visual: <AiReferrals />,
  },
]

/* ---- Engines ------------------------------------------------------------- */

type Engine = {
  name: string
  reads: string
  body: string
  brand?: BrandLogoKey
  theme?: 'light' | 'dark'
  icon?: LucideIcon
}

const ENGINES: readonly Engine[] = [
  {
    name: 'ChatGPT',
    brand: 'openai',
    theme: 'dark',
    reads: 'OAI-SearchBot',
    body: 'Searches the web with its own crawler and search partners, then links the pages it used.',
  },
  {
    name: 'AI Overviews and AI Mode',
    brand: 'google',
    reads: 'Googlebot',
    body: 'Built on Google Search. A page has to be indexed and eligible for a snippet to appear as a source.',
  },
  {
    name: 'Gemini',
    brand: 'gemini',
    reads: 'Google-Extended',
    body: 'Draws on the Google Search index. The Google-Extended rule controls whether your pages can ground its answers.',
  },
  {
    name: 'Claude',
    brand: 'claude',
    reads: 'Claude-SearchBot',
    body: 'Searches the web when a question needs current facts, and cites what it read.',
  },
  {
    name: 'Perplexity',
    brand: 'perplexity',
    reads: 'PerplexityBot',
    body: 'Answers every question with numbered sources from its own index of the web.',
  },
  {
    name: 'Copilot',
    brand: 'bing',
    reads: 'Bingbot',
    body: 'Microsoft’s assistant draws on Bing, and Bing Webmaster Tools now counts its citations.',
  },
  {
    name: 'Siri and Spotlight',
    brand: 'apple',
    theme: 'dark',
    reads: 'Applebot',
    body: 'Apple’s crawler feeds Siri and Spotlight, and Apple Business holds your place card.',
  },
  {
    name: 'What others say',
    icon: Newspaper,
    reads: 'Off-site',
    body: 'Reviews, directories, local press, and forums. Assistants weigh what others say about you.',
  },
]

/* ---- How it works -------------------------------------------------------- */

const STEPS: readonly ServiceStep[] = [
  {
    icon: Radar,
    title: 'map the questions',
    detail: 'First',
    body: 'We list the questions customers ask before choosing a business like yours, ask each engine several times, and record where you stand today.',
  },
  {
    icon: Wrench,
    title: 'fix what they read',
    detail: 'Build',
    body: 'Crawler access, schema, answer-first pages, and consistent listings, in the order that opens up the most questions.',
  },
  {
    icon: RefreshCw,
    title: 'ask again',
    detail: 'Monthly',
    body: 'Every month we re-run the same questions, show you what moved, and choose the next fixes together.',
  },
]

/* ---- Our own site -------------------------------------------------------- */

// Real files on design-prism.com. Each link opens the live file.
const OWN_SITE = [
  {
    path: '/robots.txt',
    href: '/robots.txt',
    title: 'AI crawlers welcome',
    body: 'Search and assistant crawlers from OpenAI, Anthropic, Perplexity, Google, and Apple can read every public page.',
  },
  {
    path: '/llms.txt',
    href: '/llms.txt',
    title: 'a reading guide for models',
    body: 'A plain-text map of the pages that best answer “what is Prism?”',
  },
  {
    path: '/ai-data.json',
    href: '/ai-data.json',
    title: 'company facts as data',
    body: 'Services, availability, and dated proof in one machine-readable file.',
  },
  {
    path: '/api/blog/<slug>/markdown',
    href: '/api/blog/how-to-rank-1-chatgpt/markdown',
    title: 'every article in plain text',
    body: 'Each blog post has a markdown version, so a model can read it without running scripts.',
  },
] as const

/* ---- Honesty ------------------------------------------------------------- */

const WE_DO = [
  'Fix what the engines can read, starting with crawler access',
  'Write answers from facts you can verify',
  'Report dated, repeatable checks, not one-off screenshots',
  'Keep your listings and reviews accurate and consistent',
] as const

const WE_NEVER = [
  'Promise you will be cited, ranked, or recommended',
  'Buy reviews, mentions, or links',
  'Show bots different text than people see',
  'Publish thin pages for every city and keyword',
] as const

/* ---- Playbooks ----------------------------------------------------------- */

// Indexable posts in the "appear in ai search" category (guarded in
// __tests__/app/aeo.test.tsx), newest first.
const PLAYBOOKS = [
  {
    slug: 'google-io-2026-ai-search-small-business-playbook',
    title: 'small business SEO in the AI search era',
    body: 'What Google’s AI Mode, agents, and booking features change for local businesses.',
    date: 'May 2026',
  },
  {
    slug: 'ai-search-for-dental-practice',
    title: 'how a dental practice gets cited',
    body: 'The pages, listings, and proof that help patients find a practice in AI answers.',
    date: 'December 2025',
  },
  {
    slug: 'how-to-rank-1-chatgpt',
    title: 'showing up in ChatGPT',
    body: 'Answer-first pages, open crawler rules, and third-party proof, step by step.',
    date: 'September 2025',
  },
] as const

/* ---- FAQ ----------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    question: 'What is AEO?',
    answer:
      'AEO, or answer engine optimization, is the work of making your business easy for AI assistants and AI search to find, understand, and cite. It covers ChatGPT, Google AI Overviews and AI Mode, Gemini, Claude, Perplexity, and Copilot: what they can read on your site, what other sources say about you, and how clearly your pages answer the questions customers ask.',
  },
  {
    question: 'How is AEO different from SEO?',
    answer:
      'SEO earns a place in a list of search results. AEO aims for a place inside the answer itself. They share one foundation, and Google’s own guidance says optimizing for its AI features is still SEO, so that is where we start: a crawlable site, useful pages, and accurate business information. AEO adds access for AI crawlers, consistent facts across the web, and tracking of AI answers.',
  },
  {
    question: 'Is AEO the same as GEO or AI SEO?',
    answer:
      'They overlap. AEO often means direct answers in search, like Google AI Overviews. GEO, generative engine optimization, usually means citations in assistants like ChatGPT and Perplexity. AI SEO is used for both. The work is the same, so Prism AEO covers all of them.',
  },
  {
    question: 'Can you guarantee ChatGPT will recommend my business?',
    answer:
      'No, and no one can. Assistants decide what to say, and answers change with the wording, the person, and the day. We improve what they can read and verify about you, then report what we see in dated, repeatable checks.',
  },
  {
    question: 'How do you measure AEO?',
    answer:
      'Every month we ask the same customer questions across the engines, several times each because answers vary from one ask to the next, and record how often you are cited, mentioned, or missing. We pair that with the platforms’ own data: the AI Assistant channel in Google Analytics, the generative AI report in Search Console for AI Overviews and AI Mode, and Bing Webmaster Tools, which counts citations in Copilot.',
  },
  {
    question: 'Can I stay out of AI training and still show up in AI search?',
    answer:
      'Yes. Search crawlers and training crawlers are separate. You can allow OAI-SearchBot and Claude-SearchBot, which find pages for search answers, while blocking GPTBot and ClaudeBot, which collect training data. We set these rules with you.',
  },
  {
    question: 'How long does AEO take?',
    answer:
      'We ship crawler, schema, and listing fixes first, because they unblock everything else. Each engine re-crawls and refreshes on its own schedule, so changes in answers can take weeks or months and vary by engine. The monthly check shows you what moved.',
  },
  {
    question: 'Do I need a new website for AEO?',
    answer:
      'Not necessarily. We start by checking whether AI crawlers can read your current site. Many of them do not run JavaScript, so pages that depend on scripts to show their content, block crawlers, or leave out key facts need fixes, and we scope them. Prism websites are built for answer engines from day one.',
  },
  {
    question: 'Does llms.txt matter?',
    answer:
      'It is a proposed format for giving language models a reading guide to your site. Google says Search ignores it, and the other major engines have not said they use it. We publish one because it is quick and harmless, but we never rely on it. Crawlable pages, clear answers, and consistent facts do the real work.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Prism is fully booked right now, so AEO starts on the waitlist. When we reach out, we scope the questions, engines, and fixes you need and agree on the scope and price before work begins.',
  },
] as const

export default function AeoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <ServiceHero
          layout="split"
          title={
            <>
              <span className="block">they ask AI. </span>
              <span className="block">
                be the{' '}
                <span className="text-spectrum prism-spectrum-pan">
                  answer.
                </span>
              </span>
            </>
          }
          description={
            <>
              <span className="text-foreground">Prism AEO</span> (answer engine
              optimization) makes your business easy for ChatGPT, Google AI
              Overviews, Gemini, Claude, and Perplexity to find, understand, and
              cite, then tracks the questions where you show up.
            </>
          }
          ctaHref={AEO_WAITLIST_CTA.href}
          location="aeo hero"
          secondary={{
            label: 'See the engines',
            href: '#engines',
            trackingLabel: 'see answer engines',
          }}
          visual={<AeoHeroVisual />}
          glow="violet"
        />

        <Section aria-labelledby="aeo-shift-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeader
                id="aeo-shift-title"
                eyebrow="The shift"
                title="search is turning into answers."
                description="More customers ask an assistant and get one reply with a few sources. AEO is the work of becoming one of them."
                titleClassName="max-w-[13ch]"
              />
            </Reveal>
            <Reveal delay={80}>
              <SearchVersusAnswer />
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:mt-16 md:grid-cols-3">
            {SHIFT_STATS.map((stat, index) => (
              <Reveal
                as="li"
                key={stat.value}
                delay={index * 70}
                className="flex flex-col bg-background p-6 sm:p-7"
              >
                <p className="text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] font-semibold leading-none tracking-[-0.05em] text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="mb-6 mt-4 max-w-[34ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-auto border-t border-white/[0.08] pt-4 font-mono text-[11px] leading-5 text-subtle">
                  Source: {stat.source}
                  <br />
                  {stat.date}
                </p>
              </Reveal>
            ))}
          </ul>
        </Section>

        <ServiceBento
          idPrefix="aeo"
          title="what it takes to be the answer."
          description="Research, technical fixes, writing, and listings, done together, so assistants can find you, trust what they read, and cite it."
          items={WHAT_YOU_GET}
        />

        <Section
          id="engines"
          aria-labelledby="aeo-engines-title"
          className="scroll-mt-20"
        >
          <Reveal>
            <SectionHeader
              id="aeo-engines-title"
              eyebrow="Engines"
              title="where the answers come from."
              description="Each assistant reads the web its own way. We make sure each one can reach you, then check the answers it gives."
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
              {ENGINES.map((engine) => {
                const Icon = engine.icon
                return (
                  // Phones: icon and name share a row, the crawler chip
                  // closes the tile. Wider: icon and chip on top, then the
                  // name and the body.
                  <li
                    key={engine.name}
                    className="grid grid-cols-[auto_minmax(0,1fr)] content-start items-center gap-x-4 gap-y-3 bg-card p-5 transition-colors hover:bg-popover sm:gap-y-4 sm:p-7"
                  >
                    <span className="col-start-1 row-start-1 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground sm:size-11">
                      {engine.brand ? (
                        <BrandLogo
                          brand={engine.brand}
                          theme={engine.theme ?? 'dark'}
                          decorative
                          className="size-5"
                        />
                      ) : Icon ? (
                        <Icon
                          aria-hidden="true"
                          className="size-5"
                          strokeWidth={1.6}
                        />
                      ) : null}
                    </span>
                    <h3 className="col-start-2 row-start-1 text-lg font-semibold tracking-[-0.02em] text-foreground sm:col-span-2 sm:col-start-1 sm:row-start-2 sm:mt-2">
                      {engine.name}
                    </h3>
                    <span className="col-span-2 col-start-1 row-start-3 justify-self-start rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-self-end">
                      {engine.reads}
                    </span>
                    <p className="col-span-2 col-start-1 row-start-2 text-pretty text-[15px] leading-7 text-muted-foreground sm:row-start-3">
                      {engine.body}
                    </p>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </Section>

        <ServiceSteps
          idPrefix="aeo"
          title="ask, fix, ask again."
          description="A simple monthly loop. The same questions every time, so you can see what changed and why."
          steps={STEPS}
        />

        <Section aria-labelledby="aeo-own-site-title">
          <Reveal>
            <div className="relative isolate grid gap-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
              <div
                aria-hidden="true"
                className="bg-grid absolute inset-0 -z-10 opacity-60"
              />
              <div
                aria-hidden="true"
                className="absolute -left-24 top-1/2 -z-10 size-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.63_0.19_295/20%),transparent)] blur-2xl"
              />
              <SectionHeader
                id="aeo-own-site-title"
                eyebrow="Proof"
                title="our own site goes first."
                description="design-prism.com is built for answer engines. Every file below is live, so you can check the work yourself."
                titleClassName="max-w-[12ch]"
              />
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-background/70 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-3">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-white/15" />
                    <span className="size-2 rounded-full bg-white/15" />
                    <span className="size-2 rounded-full bg-white/15" />
                  </span>
                  <span className="ml-1 font-mono text-[12px] text-muted-foreground">
                    design-prism.com
                  </span>
                </div>
                <ul className="divide-y divide-white/[0.06]">
                  {OWN_SITE.map((file) => (
                    <li key={file.path} className="group/file relative">
                      <a
                        href={file.href}
                        className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:px-5"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[12px] text-subtle">
                            {file.path}
                          </span>
                          <span className="mt-1 block text-[15px] font-medium text-foreground">
                            {file.title}
                          </span>
                          <span className="mt-1 block text-pretty text-[14px] leading-6 text-muted-foreground">
                            {file.body}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/file:-translate-y-0.5 group-hover/file:translate-x-0.5 group-hover/file:text-foreground"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section aria-labelledby="aeo-honesty-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="aeo-honesty-title"
                eyebrow="How we work"
                title="no one owns the answer."
                description="Assistants decide what to say, and the answer can change from one ask to the next. Here is what that means for how we work."
                titleClassName="max-w-[11ch]"
              />
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {[
                { heading: 'We always', items: WE_DO, icon: Check },
                { heading: 'We never', items: WE_NEVER, icon: Ban },
              ].map((column, columnIndex) => {
                const Icon = column.icon
                return (
                  <Reveal
                    key={column.heading}
                    delay={columnIndex * 80}
                    className="flex flex-col gap-5 bg-card p-6 sm:p-7"
                  >
                    <h3 className="text-eyebrow text-subtle">
                      {column.heading}
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-pretty text-[15px] leading-6 text-foreground/90"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                          >
                            <Icon
                              className={cn(
                                'size-3',
                                columnIndex === 0
                                  ? 'text-foreground/80'
                                  : 'text-subtle',
                              )}
                              strokeWidth={2}
                            />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )
              })}
            </div>
          </div>
          <Reveal>
            <InlineWaitlistCta
              location="aeo inline cta"
              href={AEO_WAITLIST_CTA.href}
              title="your customers are already asking."
              className="mt-20 sm:mt-24"
            />
          </Reveal>
        </Section>

        <Section aria-labelledby="aeo-playbooks-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
            <Reveal>
              <SectionHeader
                id="aeo-playbooks-title"
                eyebrow="Playbooks"
                title="the playbooks, free."
                description="How AI search works for local businesses, written up on the Prism blog."
                titleClassName="max-w-[12ch]"
              />
            </Reveal>
            <Reveal delay={80}>
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {PLAYBOOKS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/post flex items-start gap-5 py-6 transition-colors focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] text-subtle">
                          {post.date}
                        </span>
                        <span className="mt-2 block text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover/post:text-foreground/80">
                          {post.title}
                        </span>
                        <span className="mt-1.5 block text-pretty text-[15px] leading-7 text-muted-foreground">
                          {post.body}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-7 size-5 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/post:translate-x-0.5 group-hover/post:text-foreground"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <ServiceFaq idPrefix="aeo" items={FAQ_ITEMS} title="ask us first." />

        <ServiceSiblings current="aeo" />

        <FinalCta
          location="aeo final cta"
          title="the next answer could be you."
          href={AEO_WAITLIST_CTA.href}
          headingId="aeo-final-cta-title"
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="aeo"
        name="Prism AEO"
        description="Answer engine optimization: AI crawler access, structured data, answer-first pages, consistent business listings, and monthly answer checks across ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity."
        serviceType="Answer engine optimization"
        areaServed="United States"
        offerDetails={{
          name: AEO_OFFER.name,
          description: `${AEO_OFFER.description} Prism is fully booked; scope and price are agreed when we reach out from the waitlist.`,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

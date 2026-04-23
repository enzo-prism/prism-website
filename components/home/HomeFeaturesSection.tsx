import HomeFeatureIllustration, {
  type HomeFeatureIllustrationVariant,
} from '@/components/home/HomeFeatureIllustration'
import HomeSectionHeading from '@/components/home/HomeSectionHeading'
import { cn } from '@/lib/utils'

type HomeFeature = {
  title: string
  description: string
  variant: HomeFeatureIllustrationVariant
  featured?: boolean
}

const HOME_FEATURES: HomeFeature[] = [
  {
    title: 'High-converting websites',
    description:
      'We build and optimize pages that turn attention into qualified leads, with clean UX, fast load speed, and conversion-focused structure.',
    variant: 'websites',
    featured: true,
  },
  {
    title: 'Search + AI visibility',
    description:
      'Show up in Google and AI-driven discovery with a system that compounds every month.',
    variant: 'visibility',
  },
  {
    title: 'Paid ads that scale',
    description:
      'Launch and optimize campaigns across channels with clear attribution and ROI tracking.',
    variant: 'ads',
  },
  {
    title: 'Analytics that drive decisions',
    description:
      'We connect tracking, attribution, and reporting so you can make decisions from real data instead of guesswork.',
    variant: 'analytics',
  },
  {
    title: 'AI agents that answer + book',
    description:
      'Deploy human-sounding voice agents that answer calls, qualify leads, and schedule appointments 24/7.',
    variant: 'ai-agents',
  },
]

const FEATURED_CARD = HOME_FEATURES.find((feature) => feature.featured)
const SUPPORTING_CARDS = HOME_FEATURES.filter((feature) => !feature.featured)
const LIGHT_CARD_LAYOUT: Record<HomeFeatureIllustrationVariant, string> = {
  websites: 'lg:col-span-5 lg:row-span-2',
  visibility: 'lg:col-span-4',
  ads: 'lg:col-span-3',
  analytics: 'lg:col-span-3',
  'ai-agents': 'lg:col-span-4',
}

type FeatureCardProps = {
  feature: HomeFeature
}

function FeatureCard({ feature }: FeatureCardProps) {
  const isFeatured = Boolean(feature.featured)

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#ffffff] shadow-[0_18px_48px_rgba(15,23,42,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-black/12 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
        'min-h-[19rem]',
        isFeatured && 'min-h-[28rem] lg:min-h-[36rem]',
        LIGHT_CARD_LAYOUT[feature.variant],
      )}
      data-home-feature-card={feature.variant}
      data-feature-variant={feature.variant}
    >
      <div
        className={cn(
          'relative overflow-hidden border-b border-black/6 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_45%),linear-gradient(180deg,#f8f8f5,rgba(248,248,245,0.7))]',
          isFeatured ? 'px-6 pb-4 pt-8 sm:px-8 sm:pt-10' : 'px-6 pb-3 pt-7',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage:
              'radial-gradient(ellipse 75% 60% at 50% 30%, black 0%, transparent 100%)',
          }}
        />
        <div
          className={cn(
            'relative',
            isFeatured
              ? 'mx-auto h-48 w-full max-w-[18rem] sm:h-60 sm:max-w-[20rem]'
              : 'h-36 w-full max-w-[13rem]',
          )}
        >
          <HomeFeatureIllustration
            variant={feature.variant}
            className="h-full w-full text-[#111827]"
          />
        </div>
      </div>

      <div className={cn('flex flex-col gap-4 p-6', isFeatured && 'sm:p-8')}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(15,23,42,0.34)] font-mono">
          {isFeatured ? 'flagship capability' : 'growth system'}
        </p>
        <h3
          className={cn(
            'max-w-[18ch] text-balance font-semibold tracking-[-0.04em] text-[#0a0a0b]',
            isFeatured
              ? 'text-[1.9rem] leading-[1.02]'
              : 'text-[1.35rem] leading-8',
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            'max-w-[34ch] text-pretty text-sm leading-7 text-[rgba(15,23,42,0.62)]',
            isFeatured && 'text-[1rem] leading-8',
          )}
        >
          {feature.description}
        </p>
      </div>
    </article>
  )
}

export default function HomeFeaturesSection() {
  if (!FEATURED_CARD) {
    return null
  }

  return (
    <section
      aria-labelledby="home-features-heading"
      className="bg-[#f7f7f4] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <HomeSectionHeading
          id="home-features-heading"
          eyebrow="capabilities"
          title="Everything your brand needs to grow, in one system"
          description="A lighter, clearer view of Prism’s five core growth pillars. Same operating model, tighter hierarchy."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:auto-rows-fr">
          <FeatureCard feature={FEATURED_CARD} />
          {SUPPORTING_CARDS.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

import HomeFeatureIllustration, {
  type HomeFeatureIllustrationVariant,
} from '@/components/home/HomeFeatureIllustration'
import { cn } from '@/lib/utils'

import styles from '@/components/home/HomeFeaturesSection.module.css'

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

type FeatureCardProps = {
  feature: HomeFeature
}

function FeatureCard({ feature }: FeatureCardProps) {
  const isFeatured = Boolean(feature.featured)

  return (
    <article
      className={cn('group', styles.card, isFeatured && styles.featuredCard)}
      data-home-feature-card=""
      data-feature-variant={feature.variant}
    >
      <div
        className={cn(
          styles.illustrationStage,
          isFeatured && styles.featuredIllustrationStage,
        )}
      >
        <HomeFeatureIllustration
          variant={feature.variant}
          className={cn(
            styles.illustration,
            isFeatured ? styles.featuredIllustration : styles.standardIllustration,
          )}
        />
      </div>

      <div className={cn(styles.content, isFeatured && styles.featuredContent)}>
        <h3
          className={cn(
            'font-pixel font-semibold leading-[1.02] tracking-[0.08em] text-zinc-50',
            styles.title,
            isFeatured ? 'text-[1.5rem] sm:text-[1.75rem]' : 'text-lg sm:text-xl',
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            styles.description,
            'text-sm leading-6 text-zinc-300 sm:text-[15px]',
            isFeatured && 'max-w-[34ch]',
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
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
    >
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className={styles.shell}>
          <div className={styles.header}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300/90">
              Features
            </p>
            <h2
              id="home-features-heading"
              className={cn(
                'font-pixel mt-3 max-w-[14ch] text-balance text-[2.15rem] font-semibold leading-[0.95] tracking-[0.08em] text-zinc-50 sm:text-[2.8rem] lg:max-w-[18ch] lg:text-[2.95rem] xl:text-[3.15rem]',
              )}
            >
              Everything your brand needs to grow, in one system
            </h2>
          </div>

          <div className={styles.layout}>
            <FeatureCard feature={FEATURED_CARD} />

            <div className={styles.supportingGrid}>
              {SUPPORTING_CARDS.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

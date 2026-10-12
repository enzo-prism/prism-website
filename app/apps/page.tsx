import Footer from '@/components/footer'
import MinimalAppsList from '@/components/minimal-apps-list'
import Navbar from '@/components/navbar'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import SeoTextSection from '@/components/seo-text-section'
import { ItemListSchema } from '@/components/schema-markup'
import { LandingHero } from '@/components/landing/landing-hero'
import { FinalCta } from '@/components/prism/final-cta'
import { Section, SectionHeader } from '@/components/prism/section'
import { Card } from '@/components/ui/card'
import type { Metadata } from 'next'
import { Apple, Globe, Smartphone } from 'lucide-react'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'App development & product portfolio',
  description:
    'Explore selected Prism product work across web, iOS, and Android, including public projects and archived portfolio work.',
  path: '/apps',
  ogImage: '/prism-opengraph.png',
})

const appProjects = [
  {
    id: '1',
    title: 'prism dashboard',
    description: 'private client analytics and growth reporting workspace',
    category: 'business',
    platforms: ['Web'],
    status: 'private',
  },
  {
    id: '2',
    title: 'peak surf',
    url: 'https://peaksurf.club',
    description: 'surf forecasts, tide data, and community features',
    category: 'lifestyle',
    platforms: ['iOS', 'Android', 'Web'],
  },
  {
    id: '3',
    title: 'track & field',
    url: 'https://pv-schedule.com',
    description: 'athletic performance tracking and event scheduling',
    category: 'sports',
    platforms: ['Web'],
  },
  {
    id: '4',
    title: 'sison yum',
    description:
      'archived restaurant reviews and dining recommendations project',
    category: 'food',
    platforms: ['Web'],
    status: 'archived',
  },
  {
    id: '5',
    title: 'grind deck',
    url: 'https://www.grinddeck.com/',
    description: 'gamified productivity with rewards and achievements',
    category: 'productivity',
    platforms: ['iOS', 'Android'],
  },
]

const PROCESS = [
  {
    title: 'discovery & strategy',
    detail: "Understanding your users and defining the app's purpose.",
  },
  {
    title: 'design & prototype',
    detail: 'Creating beautiful interfaces and intuitive user flows.',
  },
  {
    title: 'develop & test',
    detail: 'Building robust code with rigorous quality assurance.',
  },
  {
    title: 'launch & grow',
    detail: 'App Store optimization and ongoing support.',
  },
] as const

const PLATFORMS = [
  { label: 'iOS', icon: Apple },
  { label: 'Android', icon: Smartphone },
  { label: 'Web', icon: Globe },
] as const

export default function AppsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollProgressBar />
      <Navbar />

      <main className="flex-1" id="main-content" tabIndex={-1}>
        <LandingHero
          location="apps hero"
          eyebrow="Apps"
          title="apps for iOS, Android, and the web."
          description="We design and build your app, add it to the App Store, then grow it."
          secondary={{ label: 'See the portfolio', href: '#portfolio', trackingLabel: 'apps portfolio anchor' }}
          glow="blue"
        >
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {PLATFORMS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-muted-foreground"
              >
                <Icon aria-hidden="true" className="size-3.5" />
                {label}
              </li>
            ))}
          </ul>
        </LandingHero>

        <Section id="portfolio" aria-labelledby="apps-portfolio-title" className="scroll-mt-24 pt-4 sm:pt-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="apps-portfolio-title"
                eyebrow="Portfolio"
                title="selected product work."
                description="Public projects and archived portfolio work across web, iOS, and Android."
              />
            </div>
            <MinimalAppsList projects={appProjects} />
          </div>
        </Section>

        <Section aria-labelledby="apps-process-title">
          <SectionHeader
            id="apps-process-title"
            eyebrow="Our process"
            title="from idea to App Store."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <li key={step.title}>
                <Card className="flex h-full flex-col gap-6 p-6">
                  <span className="font-mono text-[11px] tabular-nums text-subtle">0{index + 1}</span>
                  <div>
                    <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">{step.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-6 text-muted-foreground">{step.detail}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Section>

        <SeoTextSection title="mobile app development services">
          <p>
            We design and ship production-ready iOS and Android apps:
            architecture, UI, and deployment. Our team handles the full
            lifecycle: strategy, design, development, testing, App Store
            submission, and growth. Whether you are validating an MVP or scaling
            an existing product, we prioritize performance, accessibility, and a
            clean codebase you can maintain.
          </p>
        </SeoTextSection>
        <FinalCta location="apps final cta" secondary={{ label: 'See the work', href: '/case-studies' }} />
      </main>
      <Footer />
      <ItemListSchema
        id="https://www.design-prism.com/apps#portfolio"
        name="Prism app portfolio"
        url="https://www.design-prism.com/apps"
        items={appProjects.map((project) => ({
          name: project.title,
          description: project.description,
          url:
            project.url ??
            `https://www.design-prism.com/apps#app-project-${project.id}`,
          itemType: 'CreativeWork',
        }))}
      />
    </div>
  )
}

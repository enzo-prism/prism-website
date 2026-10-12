import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import BrandLogo from '@/components/brand-logo'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import ScrollToTop from '@/components/scroll-to-top'
import { WebPageSchema } from '@/components/schema-markup'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAllPosts } from '@/lib/mdx-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'

const REPLIT_REFERRAL_URL = 'https://replit.com/refer/enzo78'
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@the_design_prism'

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const formatBlogDate = (date: string) => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return date
  }
  return BLOG_DATE_FORMATTER.format(parsed)
}

const WORKFLOW_ITEMS = [
  {
    title: 'custom website builds',
    description:
      'Fast, lightweight, SEO-optimized sites built in HTML, CSS, JavaScript, or frameworks like React.',
  },
  {
    title: 'live collaboration',
    description: 'Clients can review and comment inside Replit in real time.',
  },
  {
    title: 'AI-assisted development',
    description:
      'Powered by Replit’s Ghostwriter and Prism’s design systems for speed and consistency.',
  },
  {
    title: 'instant deployment',
    description:
      'Shareable links, automated updates, and analytics integrations built right in.',
  },
]

const LEARNING_CHANNELS = [
  {
    title: 'Our blog',
    description:
      'Detailed guides for Replit web development and design best practices.',
    href: '/blog',
  },
  {
    title: 'Our YouTube channel',
    description: 'Walkthroughs, tips, and visual tutorials.',
    href: YOUTUBE_CHANNEL_URL,
  },
]

const PAGE_TITLE = 'Prism x Replit website builds'
const PAGE_DESCRIPTION =
  'Prism partners with Replit to design, build, and teach modern website creation, with free guides and tutorials for founders and builders.'
const CANONICAL_URL = 'https://www.design-prism.com/replit'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/replit',
  ogImage: '/prism-opengraph.png',
})

export default async function ReplitPage() {
  const allPosts = await getAllPosts()
  const replitBlogPosts = (allPosts ?? [])
    .filter(
      (post) =>
        post.slug.toLowerCase().includes('replit') ||
        post.title.toLowerCase().includes('replit') ||
        post.description.toLowerCase().includes('replit'),
    )
    .slice(0, 3)

  const linkClassName =
    'rounded-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Prism × Replit"
          title="building the next generation of websites."
          description="Prism partners with Replit to design and build high-performance websites for modern businesses. Whether you want a custom site built by our team or prefer to learn how to build your own, we'll help you get started."
          location="replit hero"
          ctaHref={WAITLIST_FOCUS_HREFS.website}
          secondary={{
            label: 'Learn to build it yourself',
            href: '#learn-replit',
          }}
          glow="violet"
        >
          <p className="flex items-center justify-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.18em] text-subtle">
            <BrandLogo brand="replit" decorative className="size-4" />
            Build. Launch. Grow. All on Replit.
          </p>
        </LandingHero>

        <Section aria-labelledby="replit-why-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="replit-why-title"
                eyebrow="Why we use Replit"
                title="a better way to build websites."
              />
            </Reveal>
            <Reveal
              delay={80}
              className="space-y-5 text-pretty text-lg leading-8 text-muted-foreground lg:pt-12"
            >
              <p>
                Replit is one of the fastest, most collaborative platforms for
                web development, letting us design, build, and deploy client
                websites entirely in the browser. No downloads. No setup. Just a
                link, and we&apos;re live.
              </p>
              <p>
                Prism uses Replit to streamline everything from design previews
                to real-time collaboration, so clients can see updates, give
                feedback, and launch faster.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="replit-workflow-title">
          <Reveal>
            <SectionHeader
              id="replit-workflow-title"
              eyebrow="How Prism builds"
              title="our workflow."
              description="We use Replit for:"
            />
          </Reveal>
          <Reveal delay={100}>
            <ul className="spectrum-rule mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2">
              {WORKFLOW_ITEMS.map((item) => (
                <li key={item.title} className="flex gap-4 bg-card p-6 sm:p-8">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Check
                      aria-hidden="true"
                      className="size-4 text-foreground"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="learn-replit" aria-labelledby="replit-learn-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="replit-learn-title"
                eyebrow="Learn to build on Replit"
                title="prefer to build it yourself?"
                description="We also publish free tutorials and step-by-step guides for creators who want to learn how to build on Replit. You'll find them here:"
              />
            </Reveal>
            <Reveal delay={80} className="lg:pt-12">
              <ul className="grid gap-4 sm:grid-cols-2">
                {LEARNING_CHANNELS.map((channel) => {
                  const isExternal = channel.href.startsWith('http')
                  return (
                    <li key={channel.title}>
                      <Link
                        href={channel.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="group/learn block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <Card className="flex h-full flex-col gap-2 p-6 transition-[border-color,transform] duration-300 group-hover/learn:-translate-y-0.5 group-hover/learn:border-white/20">
                          <span className="flex items-center justify-between gap-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
                            {channel.title}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/learn:-translate-y-0.5 group-hover/learn:translate-x-0.5 group-hover/learn:text-foreground"
                            />
                          </span>
                          <span className="text-[15px] leading-7 text-muted-foreground">
                            {channel.description}
                          </span>
                        </Card>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-6">
                <a
                  href={REPLIT_REFERRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandLogo brand="replit" decorative className="size-4" />
                  Start with Replit (referral link)
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          </div>

          {replitBlogPosts.length > 0 ? (
            <div className="mt-16 sm:mt-20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-heading text-foreground">
                  dive into our Replit tutorials.
                </h3>
                <Link
                  href="/blog"
                  className="group/blog inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  Browse the blog
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/blog:translate-x-0.5"
                  />
                </Link>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {replitBlogPosts.map((post, index) => (
                  <Reveal as="li" key={post.slug} delay={index * 80}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/post block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <Card className="flex h-full flex-col justify-between gap-6 p-6 transition-[border-color,transform] duration-300 group-hover/post:-translate-y-0.5 group-hover/post:border-white/20">
                        <div className="space-y-4">
                          <Badge variant="outline">{post.category}</Badge>
                          <h4 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">
                            {post.title}
                          </h4>
                          <p className="line-clamp-3 text-[15px] leading-7 text-muted-foreground">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-mono text-[12px] text-subtle">
                            {formatBlogDate(post.date)}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                            Read post
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-200 group-hover/post:translate-x-0.5"
                            />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>

        <Section aria-label="Replit partnership and work">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <Card className="flex h-full flex-col p-6 sm:p-10">
                <p className="text-eyebrow text-subtle">
                  Partnership statement
                </p>
                <h2 className="text-heading mt-4 text-foreground">
                  our partnership with Replit.
                </h2>
                <p className="mt-4 text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base">
                  Prism is proud to be part of Replit&apos;s creator ecosystem,
                  helping businesses and creators build their online presence
                  faster and smarter. Through our partnership, anyone who joins
                  Replit using our referral link helps support Prism&apos;s
                  mission to make professional web design accessible to
                  everyone.
                </p>
                <div className="mt-auto pt-8">
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={REPLIT_REFERRAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Replit through our link
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <Card className="flex h-full flex-col p-6 sm:p-10">
                <p className="text-eyebrow text-subtle">Explore our work</p>
                <h2 className="text-heading mt-4 text-foreground">
                  see the websites we build on Replit.
                </h2>
                <p className="mt-4 text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base">
                  Visit our dedicated{' '}
                  <Link href="/websites" className={linkClassName}>
                    websites page
                  </Link>{' '}
                  to explore launched projects, performance results, and the
                  design systems powering each build.
                </p>
                <ul className="mt-6 space-y-3 text-[15px] text-muted-foreground">
                  {[
                    'Real-world examples of Prism sites built with Replit.',
                    'Detailed launch stories, tech stacks, and design decisions.',
                    'Insights on performance, accessibility, and conversion.',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-foreground"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="group/web"
                  >
                    <Link href="/websites">
                      Explore Prism websites
                      <ArrowRight
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/web:translate-x-0.5"
                      />
                    </Link>
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </Section>

        <FinalCta
          location="replit final cta"
          href={WAITLIST_FOCUS_HREFS.website}
          title="ready to build something?"
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
    </div>
  )
}

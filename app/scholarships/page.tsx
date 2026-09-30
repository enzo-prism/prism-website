import Link from 'next/link'
import Image from 'next/image'
import ScholarshipQuarterScene from '@/components/scholarships/ScholarshipQuarterScene'
import {
  OpportunityGraphic,
  OfficeHoursGraphic,
} from '@/components/scholarships/ScholarshipGraphics'
import {
  ScholarshipsMotionShell,
  MotionScene,
  MotionToggle,
} from '@/components/scholarships/ScholarshipsMotion'
import styles from '@/components/scholarships/scholarships.module.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { WebPageSchema } from '@/components/schema-markup'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteContainedSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import ProgramApplicationForm from '@/components/scholarships/ProgramApplicationForm'
import OfficeHoursBooking from '@/components/scholarships/OfficeHoursBooking'
import ScholarshipRoundText from '@/components/scholarships/ScholarshipRoundText'
import {
  getScholarshipRound,
  SCHOLARSHIP_LEARNING_SLUGS,
} from '@/lib/scholarships'
import { getOfficeHoursSessions } from '@/lib/office-hours'
import { getPost } from '@/lib/mdx-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

// Program dates must advance without waiting for a new deployment.
export const dynamic = 'force-dynamic'

const description =
  'Prism support when you cannot afford it yet. Apply for a quarterly scholarship, join Sunday office hours, or learn at your own pace.'
export const metadata = buildRouteMetadata({
  titleStem: 'Scholarships',
  description,
  path: '/scholarships',
})

export default async function ScholarshipsPage() {
  const now = new Date()
  const round = getScholarshipRound(now)
  const sessions = getOfficeHoursSessions(now)
  const posts = (
    await Promise.all(
      SCHOLARSHIP_LEARNING_SLUGS.map(async (slug) => {
        const post = await getPost(slug)
        return post ? { slug, ...post.frontmatter } : null
      }),
    )
  ).filter((post) => post !== null)

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground">
      <Navbar />
      <ScholarshipsMotionShell>
        <main id="main-content" tabIndex={-1}>
          <section
            className={`${coreRouteSectionClassName} ${styles.hero}`}
            aria-labelledby="scholarships-heading"
          >
            <div className={`${coreRouteContainerClassName} space-y-12`}>
              <div className={styles.utility}>
                <MotionToggle />
              </div>
              <div className={styles.heroLayout}>
                <div className="space-y-8">
                  <CoreSectionHeading
                    eyebrow="a little help, a bigger possibility"
                    as="h1"
                    variant="hero"
                    title={
                      <span id="scholarships-heading">prism scholarships</span>
                    }
                    description="You have something worth building. If Prism is out of reach right now, start here."
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <CoreActionLink
                      href="#scholarship-application"
                      variant="heroPrimary"
                    >
                      apply for a scholarship
                    </CoreActionLink>
                    <CoreActionLink
                      href="#office-hours"
                      variant="heroSecondary"
                    >
                      explore office hours
                    </CoreActionLink>
                  </div>
                  <p className="max-w-md text-sm leading-6 text-muted-foreground">
                    A scholarship to help you build. A conversation to find your
                    next step. A place to keep learning.
                  </p>
                </div>
                <MotionScene className={styles.heroVisual}>
                  <div className={styles.sceneTop}>
                    <span>
                      <span className={styles.signal} />
                      possibility, in progress
                    </span>
                    <span>Prism / support</span>
                  </div>
                  <OpportunityGraphic />
                  <div className={styles.sceneBottom}>
                    <span>your idea</span>
                    <span>a little support</span>
                    <span>your next chapter ↗</span>
                  </div>
                </MotionScene>
              </div>
              <nav className={styles.paths} aria-label="Ways to get support">
                {[
                  {
                    icon: 'award.svg',
                    title: 'A scholarship',
                    href: '#scholarship-application',
                    detail: (
                      <>
                        <ScholarshipRoundText initialRound={round} /> · one
                        recipient
                      </>
                    ),
                  },
                  {
                    icon: 'calendar.svg',
                    title: 'Office hours',
                    href: '#office-hours',
                    detail: 'Sundays · 10–11 a.m. Pacific',
                  },
                  {
                    icon: 'document-letter.svg',
                    title: 'Keep learning',
                    href: '#learn',
                    detail: 'Free ideas to put into practice',
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={styles.path}
                  >
                    <span className={styles.iconTile}>
                      <PixelishIcon
                        src={`/pixelish/${item.icon}`}
                        alt=""
                        size={28}
                      />
                    </span>
                    <span>
                      <span className={styles.pathTitle}>{item.title}</span>
                      <span className={styles.pathMeta}>{item.detail}</span>
                    </span>
                    <PixelishIcon
                      src="/pixelish/arrow-right.svg"
                      alt=""
                      size={18}
                      className={styles.arrow}
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </section>

          <section
            className={coreRouteSectionClassName}
            aria-labelledby="scholarship-title"
          >
            <div
              className={`${coreRouteContainerClassName} grid gap-12 lg:grid-cols-2`}
            >
              <div className="space-y-8">
                <CoreSectionHeading
                  title={
                    <span id="scholarship-title">
                      the next chapter starts here.
                    </span>
                  }
                  description="One person or project receives a Prism scholarship at the end of each business quarter. Our first selection is December 31, 2026."
                />
                <p className="max-w-md leading-7 text-muted-foreground">
                  For people who are ready to build, but cannot afford Prism
                  yet. Tell us what you are working on, who it helps, and what
                  support would make a difference. We scope the support around
                  the selected project.
                </p>
                <MotionScene className={styles.quarterScene}>
                  <ScholarshipQuarterScene initialRound={round} />
                </MotionScene>
                <dl className="divide-y divide-border border-y border-border">
                  {(
                    [
                      [
                        'applications open',
                        <ScholarshipRoundText
                          key="round"
                          initialRound={round}
                        />,
                      ],
                      [
                        'selection date',
                        <ScholarshipRoundText
                          key="date"
                          initialRound={round}
                          field="selectionDateLabel"
                        />,
                      ],
                      ['recipients', 'One each quarter'],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-wrap justify-between gap-4 py-5"
                    >
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">what we look for</h3>
                  <p className="max-w-md leading-7 text-muted-foreground">
                    A clear idea, a real need for support, and a willingness to
                    put the work in. You do not need a polished pitch or a
                    finished business.
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  We review applications personally and contact the selected
                  recipient by email. Applying does not guarantee selection.
                  Office hours are available separately.
                </p>
              </div>
              <div
                id="scholarship-application"
                className={`${coreRouteContainedSectionClassName} scroll-mt-28`}
              >
                <div className={styles.panelHeader}>
                  <div>
                    <h3 className="mb-2 text-2xl font-medium tracking-tight">
                      apply for <ScholarshipRoundText initialRound={round} />
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Tell us where you are and where you want to go.
                    </p>
                  </div>
                  <PixelishIcon
                    src="/pixelish/award-plus.svg"
                    alt=""
                    size={32}
                    className={styles.panelIcon}
                  />
                </div>
                <ProgramApplicationForm
                  program="scholarship"
                  roundId={round.id}
                  roundLabel={round.label}
                />
              </div>
            </div>
          </section>

          <section
            id="office-hours"
            className={`${coreRouteSectionClassName} scroll-mt-28`}
            aria-labelledby="office-hours-title"
          >
            <div className={`${coreRouteContainerClassName} space-y-12`}>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="space-y-8">
                  <CoreSectionHeading
                    title={
                      <span id="office-hours-title">
                        a conversation can move you forward.
                      </span>
                    }
                    description="Bring your project and your questions to office hours with Enzo Sison, founder of Prism."
                  />
                  <p className="text-2xl font-medium tracking-tight">
                    every Sunday
                    <br />
                    <span className="text-muted-foreground">
                      10–11 a.m. Pacific Time
                    </span>
                  </p>
                  <p className="max-w-md leading-7 text-muted-foreground">
                    A free group session to discuss what you are building, work
                    through a blocker, and find your next step. Apply once.
                    After approval, use your code to sign up for the Sunday that
                    works for you.
                  </p>
                  <CoreActionLink href="#approved-office-hours">
                    already approved? choose a Sunday →
                  </CoreActionLink>
                </div>
                <MotionScene className={styles.officeVisual}>
                  <div className={styles.sceneTop}>
                    <span>
                      <span className={styles.signal} />
                      room for your questions
                    </span>
                    <PixelishIcon
                      src="/pixelish/chat-dots.svg"
                      alt=""
                      size={20}
                    />
                  </div>
                  <OfficeHoursGraphic />
                  <div className={styles.sceneBottom}>
                    <span>one hour / every Sunday</span>
                    <span>10–11 a.m. Pacific</span>
                  </div>
                </MotionScene>
              </div>
              <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                <div
                  id="office-hours-application"
                  className={`${coreRouteContainedSectionClassName} scroll-mt-28`}
                >
                  <div className={styles.panelHeader}>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      first time here
                    </p>
                    <PixelishIcon
                      src="/pixelish/chat-circle-dots.svg"
                      alt=""
                      size={28}
                      className={styles.panelIcon}
                    />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight">
                    apply for office hours
                  </h3>
                  <p className="mb-8 mt-3 text-sm leading-6 text-muted-foreground">
                    Let us know what you want to cover. If approved, you will
                    receive a code by email to choose a session.
                  </p>
                  <ProgramApplicationForm program="office-hours" />
                </div>
                <div
                  id="approved-office-hours"
                  className={`${coreRouteContainedSectionClassName} scroll-mt-28`}
                >
                  <div className={styles.panelHeader}>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      already approved
                    </p>
                    <PixelishIcon
                      src="/pixelish/lock-open.svg"
                      alt=""
                      size={28}
                      className={styles.panelIcon}
                    />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight">
                    choose your next Sunday
                  </h3>
                  <p className="mb-8 mt-3 text-sm leading-6 text-muted-foreground">
                    Use the code from your approval email. This browser will
                    remember your approval for 30 days.
                  </p>
                  <OfficeHoursBooking sessions={sessions} />
                </div>
              </div>
            </div>
          </section>

          <section
            id="learn"
            className={`${coreRouteSectionClassName} scroll-mt-28`}
            aria-labelledby="learn-title"
          >
            <div className={`${coreRouteContainerClassName} space-y-10`}>
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <CoreSectionHeading
                  title={<span id="learn-title">learn on your own.</span>}
                  description="Start with one useful idea. Try it on your project. Bring your questions to office hours."
                />
                <CoreActionLink href="/blog">all articles →</CoreActionLink>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group ${styles.resource}`}
                  >
                    <div className={styles.thumbnail}>
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                      ) : (
                        <div className={styles.articleVisual}>
                          <PixelishIcon
                            src="/pixelish/graph-chart-high.svg"
                            alt=""
                            size={64}
                          />
                        </div>
                      )}
                    </div>
                    <span className={styles.resourceMeta}>
                      <PixelishIcon
                        src="/pixelish/document-letter.svg"
                        alt=""
                        size={16}
                      />
                      read · {post.category}
                    </span>
                    <h3 className="my-5 text-xl font-medium leading-7 tracking-tight group-hover:underline underline-offset-4">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {post.description}
                    </p>
                    <span className="mt-6 text-sm">
                      read the article <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'AI Agents Ran My TikTok: 1.2M Views',
                    thumbnail:
                      'https://i.ytimg.com/vi/S_Ol7aMNOeU/hqdefault.jpg',
                    href: 'https://www.youtube.com/watch?v=S_Ol7aMNOeU',
                    text: 'A look inside an AI-assisted publishing system.',
                  },
                  {
                    title: 'sell the install',
                    thumbnail:
                      'https://i.ytimg.com/vi/nC4OWxh_Vvk/hqdefault.jpg',
                    href: 'https://www.youtube.com/watch?v=nC4OWxh_Vvk',
                    text: 'Share what you know. Help people put it to work.',
                  },
                  {
                    title:
                      'my honest experience using Lovable for client websites',
                    thumbnail:
                      'https://i.ytimg.com/vi/nsTcb-vLtHM/hqdefault.jpg',
                    href: 'https://www.youtube.com/watch?v=nsTcb-vLtHM',
                    text: 'What to consider when building your own website.',
                  },
                ].map((video) => (
                  <a
                    key={video.href}
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${styles.resource}`}
                  >
                    <div className={styles.thumbnail}>
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <span className={styles.play}>
                        <PixelishIcon
                          src="/pixelish/media-play.svg"
                          alt=""
                          size={24}
                        />
                      </span>
                    </div>
                    <span className={styles.resourceMeta}>
                      <PixelishIcon
                        src="/pixelish/socials-youtube.svg"
                        alt=""
                        size={16}
                      />
                      watch · YouTube
                    </span>
                    <h3 className="my-5 text-xl font-medium leading-7 tracking-tight group-hover:underline underline-offset-4">
                      {video.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {video.text}
                    </p>
                    <span className="mt-6 text-sm">
                      watch the video <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    label: 'YouTube',
                    href: 'https://www.youtube.com/@the_design_prism',
                    text: 'Watch walkthroughs and longer conversations.',
                  },
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/the_design_prism/',
                    text: 'Short ideas and a look behind the work.',
                  },
                  {
                    label: 'TikTok',
                    href: 'https://www.tiktok.com/@the_design_prism',
                    text: 'Quick lessons you can put into practice.',
                  },
                ].map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${styles.channel}`}
                  >
                    <PixelishIcon
                      src={`/pixelish/socials-${channel.label.toLowerCase()}.svg`}
                      alt=""
                      size={28}
                      className="shrink-0"
                    />
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium group-hover:underline underline-offset-4">
                        watch on {channel.label}{' '}
                        <span aria-hidden="true">↗</span>
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {channel.text}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <noscript>
            <div className="container-px-safe mx-auto max-w-6xl py-12">
              <p className="leading-7">
                To apply without JavaScript, email{' '}
                <a href="mailto:support@design-prism.com" className="underline">
                  support@design-prism.com
                </a>{' '}
                with your name, email, and project. For a scholarship, include
                the support you need and why Prism is out of reach. For office
                hours, include what you want to cover. Already approved? Include
                your preferred Sunday. We review applications before confirming
                participation.
              </p>
            </div>
          </noscript>
        </main>
      </ScholarshipsMotionShell>
      <Footer />
      <WebPageSchema
        name="Prism Scholarships"
        description={description}
        url="https://www.design-prism.com/scholarships"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}

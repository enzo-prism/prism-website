import Image from 'next/image'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import ScrollToTimelineButton from '@/components/about/ScrollToTimelineButton'
import Footer from '@/components/footer'
import DeferredAsciiHeroBackdrop from '@/components/home/DeferredAsciiHeroBackdrop'
import Navbar from '@/components/navbar'
import PoleVaultCarousel from '@/components/pole-vault-carousel'
import { BreadcrumbSchema, PersonSchema } from '@/components/schema-markup'
import ScrollingTimeline from '@/components/scrolling-timeline'
import { cn } from '@/lib/utils'

export default function AboutClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />

      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteHeroFrameClassName}>
              <DeferredAsciiHeroBackdrop
                animationName="fire-2"
                frameCount={94}
                fps={18}
                quality="high"
                textSize="text-[2.3px] sm:text-[2.8px] md:text-[3.2px]"
                ariaLabel="Fire ASCII animation behind the About page hero"
                className="opacity-[0.18] sm:opacity-[0.28] md:opacity-[0.42] md:[-webkit-mask-image:linear-gradient(90deg,black_0%,black_62%,transparent_100%)] md:[mask-image:linear-gradient(90deg,black_0%,black_62%,transparent_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]"
              />

              <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-center lg:px-12 lg:py-16">
                <div className="space-y-8">
                  <CoreSectionHeading
                    title="Built by Enzo Sison."
                    description="Enzo built Prism to empower small businesses with frontier tech and design."
                    as="h1"
                    variant="hero"
                    titleClassName="max-w-[9ch]"
                    descriptionClassName="max-w-[32rem]"
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
                    <ScrollToTimelineButton />
                    <CoreActionLink
                      href="https://enzosison.com"
                      variant="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EnzoSison.com
                    </CoreActionLink>
                  </div>
                </div>

                <div className="lg:justify-self-end">
                  <div className="rounded-[1.75rem] border border-white/12 bg-black/35 p-3 sm:p-4">
                    <div className="overflow-hidden rounded-[1.3rem] border border-white/12 bg-white/5">
                      <Image
                        src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp"
                        alt="Enzo Sison headshot"
                        width={640}
                        height={800}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              coreRouteContainedSectionClassName,
              'grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center',
            )}
          >
            <CoreSectionHeading
              title="Olympic journey."
              description="Pole vaulting for the Philippines on the path to LA 2028."
              titleClassName="max-w-[8.5ch]"
            />

            <div className="border-t border-white/12 pt-6 lg:border-t-0 lg:border-l lg:pl-10">
              <PoleVaultCarousel />
            </div>
          </div>
        </section>

        <section
          id="timeline"
          className={coreRouteSectionClassName}
        >
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              title="Our journey."
              description="A few milestones behind the work."
              align="center"
              titleClassName="max-w-[8ch]"
              descriptionClassName="max-w-[24rem]"
            />

            <div className="mt-14">
              <ScrollingTimeline />
            </div>
          </div>
        </section>

        <section className="px-4 py-20 pb-28 sm:px-6 sm:py-24">
          <div
            className={cn(
              coreRouteContainerClassName,
              'border-t border-white/12 pt-8 sm:pt-10',
            )}
          >
            <CoreSectionHeading
              title="If the fit is right, let's build what's next."
              description="If there is a fit, we will make the next step clear."
              titleClassName="max-w-[10ch]"
              descriptionClassName="max-w-[24rem]"
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
              <CoreActionLink href="/get-started">Get started</CoreActionLink>
              <CoreActionLink href="/case-studies" variant="secondary">
                Case studies
              </CoreActionLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.design-prism.com' },
          { name: 'About', url: 'https://www.design-prism.com/about' },
        ]}
      />
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism Agency, helping businesses create digital experiences that drive real results"
        image="https://www.design-prism.com/enzo-avatar.png"
        url="https://www.design-prism.com/about"
        sameAs={[
          'https://x.com/NosisTheGod',
          'https://www.linkedin.com/in/enzo-sison',
          'https://www.instagram.com/the_design_prism/',
        ]}
      />
    </div>
  )
}

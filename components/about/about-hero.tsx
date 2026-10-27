import Image from 'next/image'
import { ArrowUpRight, Flag } from 'lucide-react'

import ScrollToTimelineButton from '@/components/about/ScrollToTimelineButton'
import { PrismMark } from '@/components/prism/prism-logo'
import { Eyebrow } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'

export const ENZO_HEADSHOT_SRC =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp'

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pt-24"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[52rem] opacity-50" />
      <div
        aria-hidden="true"
        className="absolute right-[-4%] top-[6%] -z-10 size-[34rem] max-w-[120vw] rounded-full bg-[conic-gradient(from_210deg,color-mix(in_oklch,var(--spectrum-red)_26%,transparent),color-mix(in_oklch,var(--spectrum-yellow)_16%,transparent),color-mix(in_oklch,var(--spectrum-green)_16%,transparent),color-mix(in_oklch,var(--spectrum-blue)_28%,transparent),color-mix(in_oklch,var(--spectrum-violet)_26%,transparent),color-mix(in_oklch,var(--spectrum-red)_26%,transparent))] opacity-75 blur-[100px]"
      />

      <div className="prism-container grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="flex flex-col items-start">
          <Eyebrow className="prism-rise">the founder</Eyebrow>
          <h1
            id="about-title"
            className="prism-rise text-display text-gradient mt-6 max-w-[11ch] text-balance pb-2 [--rise-delay:80ms] max-sm:text-[3.4rem]"
          >
            built by Enzo Sison.
          </h1>
          <p className="prism-rise text-lead mt-7 max-w-[34rem] text-pretty text-foreground/90 [--rise-delay:160ms]">
            Enzo worked on CarPlay, GymKit, AirPlay, HomeKit, and Find My at
            Apple, earned an engineering degree at Cal Poly, and competed in D1
            track. In May 2023, he left his full-time job, went pro in track and
            field, and started Prism.
          </p>
          <p className="prism-rise mt-4 max-w-[34rem] text-pretty text-[15px] leading-7 text-muted-foreground [--rise-delay:200ms]">
            He founded Prism to help small businesses turn a stronger online
            presence into more customer conversations. He still pole vaults for
            the Philippines, on the path to LA 2028.
          </p>
          <div className="prism-rise mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center [--rise-delay:240ms]">
            <WaitlistButton location="about hero" size="xl" />
            <ScrollToTimelineButton />
          </div>
        </div>

        <div className="prism-rise relative mx-auto w-full max-w-[26rem] lg:mr-0 [--rise-delay:200ms]">
          <figure className="relative rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_50px_120px_-50px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/8%)_inset] backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-black">
              <Image
                src={ENZO_HEADSHOT_SRC}
                alt="Enzo Sison, founder of Prism"
                width={800}
                height={800}
                priority
                sizes="(min-width: 1024px) 416px, (min-width: 640px) 416px, 90vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
              />
              <p className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[12px] font-medium text-foreground backdrop-blur-md">
                <Flag aria-hidden="true" className="size-3.5" />
                On the path to LA 2028
              </p>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="flex flex-col">
                  <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    Enzo Sison
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    Founder, Prism · since May 2023
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-black/60 backdrop-blur-md">
                  <PrismMark className="size-5" />
                </span>
              </figcaption>
            </div>
          </figure>
          <a
            href="https://enzosison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group/site mx-auto mt-4 flex min-h-10 w-fit items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            More from Enzo at enzosison.com
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutHero

import { BarChart3, Search } from 'lucide-react'

import { BrowserFrame } from '@/components/prism/browser-frame'
import { PhoneFrame } from '@/components/services/PhoneFrame'
import { getClientSites } from '@/components/services/client-sites'

// Front, back-left, back-right, then the phone. All current clients.
const [FRONT, LEFT, RIGHT, PHONE] = getClientSites([
  'exquisite-dentistry',
  'waikiki-dental',
  'olympic-bootworks',
  'dr-christopher-wong',
])

function FloatingChip({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Search
  children: string
  className: string
}) {
  return (
    <span
      className={`absolute z-40 hidden items-center gap-2 rounded-full border border-white/10 bg-background/75 py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-foreground shadow-[0_16px_40px_-20px_oklch(0_0_0/90%)] backdrop-blur-md sm:inline-flex ${className}`}
    >
      <span className="grid size-6 place-items-center rounded-full bg-white/[0.08]">
        <Icon aria-hidden="true" className="size-3.5" />
      </span>
      {children}
    </span>
  )
}

/**
 * /websites hero: a fan of live client sites in browser chrome, with the
 * mobile build of a fourth site in a phone shell at the front.
 */
export function WebsitesHeroVisual() {
  return (
    <div className="group/fan relative mx-auto h-[270px] max-w-6xl sm:h-[420px] lg:h-[560px]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[18%] -z-10 h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/30%),oklch(0.63_0.19_295/14%)_55%,transparent)] blur-2xl"
      />
      {/* The desktop frames fade into the page through a mask (not an
          overlay), so the hero grid and glow show through cleanly. */}
      <div className="mask-fade-b absolute -inset-x-12 inset-y-0 sm:-inset-x-20">
        <div className="relative mx-12 h-full sm:mx-20">
          {LEFT ? (
            <BrowserFrame
              src={LEFT.desktop}
              alt={`${LEFT.client} website built by Prism`}
              url={LEFT.host}
              sizes="(min-width: 1024px) 620px, 56vw"
              className="absolute left-0 top-[14%] w-[60%] sm:w-[54%] origin-bottom-right -rotate-[7deg] opacity-70 transition-[rotate,translate,opacity] duration-700 ease-out group-hover/fan:-translate-x-2 group-hover/fan:opacity-90"
            />
          ) : null}
          {RIGHT ? (
            <BrowserFrame
              src={RIGHT.desktop}
              alt={`${RIGHT.client} website built by Prism`}
              url={RIGHT.host}
              sizes="(min-width: 1024px) 620px, 56vw"
              className="absolute right-0 top-[14%] w-[60%] sm:w-[54%] origin-bottom-left rotate-[7deg] opacity-70 transition-[rotate,translate,opacity] duration-700 ease-out group-hover/fan:translate-x-2 group-hover/fan:opacity-90"
            />
          ) : null}
          {FRONT ? (
            <BrowserFrame
              src={FRONT.desktop}
              alt={`${FRONT.client} website built by Prism`}
              url={FRONT.host}
              priority
              sizes="(min-width: 1024px) 800px, 72vw"
              className="absolute left-1/2 top-0 z-10 w-[84%] -translate-x-1/2 sm:w-[70%] shadow-[0_50px_120px_-40px_oklch(0_0_0/95%),0_0_0_1px_oklch(1_0_0/6%)]"
            />
          ) : null}
        </div>
      </div>
      {PHONE ? (
        <PhoneFrame
          src={PHONE.mobile}
          alt={`${PHONE.client} mobile website built by Prism`}
          sizes="(min-width: 1024px) 200px, 22vw"
          className="absolute bottom-[-6%] right-[2%] z-40 w-[26%] max-w-[210px] rotate-[3deg] sm:right-[9%] sm:w-[17%]"
        />
      ) : null}

      <FloatingChip icon={BarChart3} className="bottom-[18%] left-[6%]">
        Analytics wired in at launch
      </FloatingChip>
      <FloatingChip
        icon={Search}
        className="right-[4%] top-[6%] lg:right-[10%]"
      >
        Search foundations built in
      </FloatingChip>
    </div>
  )
}

export default WebsitesHeroVisual

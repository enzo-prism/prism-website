import { CheckCircle2, Radio, Sparkles } from 'lucide-react'

import { OwnerDecision } from '@/components/prism/owner-decision'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HomeLogoRail from '@/components/home/HomeLogoRail'
import HomeFaq from '@/components/home/HomeFaq'
import HomeHashScrollStabilizer from '@/components/home/HomeHashScrollStabilizer'
import HomeHero from '@/components/home/HomeHero'
import HomeHowToGetIn from '@/components/home/HomeHowToGetIn'
import HomeLove from '@/components/home/HomeLove'
import HomeNumbers from '@/components/home/HomeNumbers'
import HomeServices from '@/components/home/HomeServices'
import HomeStories from '@/components/home/HomeStories'
import { HOMEPAGE_FINAL_CTA } from '@/components/home/homepage-content'
import { FinalCta } from '@/components/prism/final-cta'

function WeeklyUpdatePreview() {
  const rows = [
    { icon: CheckCircle2, tag: 'Shipped', text: 'Mobile test-ride flow live' },
    {
      icon: Radio,
      tag: 'Tracked',
      text: 'Form requests visible in Prism Grow',
    },
    { icon: Sparkles, tag: 'Next', text: 'You approve the next move' },
  ] as const

  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-white/[0.08] bg-background/70 p-4"
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <span className="text-xs font-medium text-foreground">
          Weekly update
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-subtle">
          Example
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {rows.map(({ icon: Icon, tag, text }) => (
          <li
            key={tag}
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px]"
          >
            <Icon className="size-3.5 shrink-0 text-foreground/80" />
            <span className="w-16 shrink-0 font-mono text-[11px] text-subtle">
              {tag}
            </span>
            <span className="truncate text-foreground/90">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ClientPage() {
  return (
    <div className="flex min-h-svh flex-col bg-transparent font-sans text-foreground">
      <Navbar />
      <HomeHashScrollStabilizer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* One idea per screen: the promise, who trusts us, the work, the
            numbers, what we do, what clients say, how we work, how to get
            in, then the close. */}
        <HomeHero />
        <HomeLogoRail />
        <HomeStories />
        <HomeNumbers />
        <HomeServices />
        <HomeLove />
        <OwnerDecision
          eyebrow="Working with Prism"
          title="a direct line to the people doing the work."
          body="One priority at a time. Weekly proof. Your call on what ships next."
          visual={<WeeklyUpdatePreview />}
          links={[
            { label: 'How we work', href: '/about' },
            { label: 'Prism Grow for clients', href: '/app' },
          ]}
        />
        <HomeHowToGetIn />
        <HomeFaq />
        <FinalCta
          location="homepage final cta"
          title={HOMEPAGE_FINAL_CTA.title}
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />
      </main>
      <Footer />
    </div>
  )
}

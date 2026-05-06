import Link from 'next/link'

import { HOMEPAGE_SEARCH_CONSOLE_SLIDES } from '@/components/home/homepage-content'
import HomeSectionHeading from '@/components/home/HomeSectionHeading'
import SearchConsoleSnapshotsRail from '@/components/home/SearchConsoleSnapshotsRail'

const HERO_SEARCH_ICON = '/pixelish/lens.svg'

export default function HomeSearchProofSection() {
  return (
    <section className="bg-[#fcfcfb] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
        <div className="space-y-6">
          <HomeSectionHeading
            eyebrow="search visibility"
            title="Search visibility that compounds"
            description="Prism clients show up more where customers are already searching."
          />
          <Link
            href="/seo"
            className="inline-flex text-sm font-medium text-[rgba(15,23,42,0.56)] underline decoration-black/15 underline-offset-4 transition-colors hover:text-[#0a0a0b]"
          >
            learn more about Prism&apos;s SEO services
          </Link>
        </div>

        <div className="rounded-[1.75rem] border border-black/8 bg-[rgba(255,255,255,0.92)] p-3 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
          <SearchConsoleSnapshotsRail
            slides={[...HOMEPAGE_SEARCH_CONSOLE_SLIDES]}
            iconSrc={HERO_SEARCH_ICON}
          />
        </div>
      </div>
    </section>
  )
}

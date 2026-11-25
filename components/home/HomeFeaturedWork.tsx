import Image from 'next/image'
import { ArrowUpRight, Play } from 'lucide-react'

import { Eyebrow, Section } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

export default function HomeFeaturedWork() {
  return (
    <Section
      id="featured-work"
      aria-labelledby="featured-title"
      className="scroll-mt-16 pb-8 pt-12"
    >
      <div className="grid items-center gap-8 border-y border-border py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <TrackedLink
          href="/case-studies/olympic-bootworks#walkthrough"
          label="watch Olympic Bootworks walkthrough"
          location="homepage featured work"
          className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
        >
          <Image
            src="/case-studies/olympic-catalog.webp"
            alt="Fantic trail bikes displayed side by side with prices in the Olympic Bootworks catalog"
            width={1280}
            height={800}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full"
          />
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-foreground">
            <Play aria-hidden="true" className="size-4" /> Watch the walkthrough
          </span>
        </TrackedLink>
        <div>
          <Eyebrow>Olympic Bootworks · Tahoe retail</Eyebrow>
          <h2 id="featured-title" className="text-title mt-5 text-balance">
            from bike research to a test ride.
          </h2>
          <p className="text-lead mt-5 text-muted-foreground">
            A rider used to have to call the shop to compare bikes. Now they can
            see the models, check pricing and request a ride at either Tahoe
            location.
          </p>
          <p className="mt-3 text-sm text-subtle">
            Source: the shop’s live Fantic catalog, November 2026.
          </p>
          <TrackedLink
            href="/case-studies/olympic-bootworks"
            label="Olympic Bootworks case study"
            location="homepage featured work"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium"
          >
            See what we built{' '}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </TrackedLink>
        </div>
      </div>
    </Section>
  )
}

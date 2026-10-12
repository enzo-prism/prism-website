'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { VideoDialog } from '@/components/prism/video-dialog'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type HomeCaseStudyTab = {
  slug: string
  tabLabel: string
  client: string
  industry: string
  location: string
  href: string
  url?: string
  desktopImage: string
  mobileImage: string
  focus?: string
  scope?: string
  result?: string
  metric?: {
    value: string
    label: string
    source: string
    dateRange: string
  }
  video?: { youtubeId: string; label: string; description?: string }
}

export default function HomeCaseStudyTabs({
  tabs,
}: {
  tabs: HomeCaseStudyTab[]
}) {
  return (
    <Tabs defaultValue={tabs[0]?.slug} className="mt-12 gap-8">
      <div className="-mx-5 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] sm:mx-0 sm:px-0 sm:[mask-image:none]">
        <TabsList aria-label="Featured clients">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.slug}
              value={tab.slug}
              className="px-4 sm:px-5"
            >
              {tab.tabLabel}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.slug}
          value={tab.slug}
          className="data-[state=active]:motion-safe:animate-in data-[state=active]:motion-safe:fade-in-0 data-[state=active]:motion-safe:slide-in-from-bottom-2 duration-500"
        >
          <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-5 sm:p-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14 lg:p-10">
            <div className="relative pb-10 pr-6 sm:pb-14 sm:pr-12">
              <figure className="overflow-hidden rounded-xl border border-white/10 bg-popover shadow-[0_40px_80px_-30px_oklch(0_0_0/90%)]">
                <div
                  className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-3"
                  aria-hidden="true"
                >
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  {tab.url ? (
                    <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-subtle">
                      {tab.url}
                    </span>
                  ) : null}
                </div>
                <Image
                  src={tab.desktopImage}
                  alt={`${tab.client} website built by Prism`}
                  width={2880}
                  height={1800}
                  sizes="(min-width: 1024px) 620px, 90vw"
                  className="block h-auto w-full"
                />
              </figure>
              <div className="absolute bottom-0 right-0 w-[26%] min-w-[92px] overflow-hidden rounded-[1.1rem] border-[3px] border-[oklch(0.22_0.004_286)] bg-black shadow-[0_30px_60px_-20px_oklch(0_0_0/95%)]">
                <Image
                  src={tab.mobileImage}
                  alt=""
                  width={780}
                  height={1688}
                  sizes="180px"
                  className="block aspect-[9/19] h-auto w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{tab.industry}</Badge>
                <Badge variant="outline">{tab.location}</Badge>
              </div>
              <h3 className="text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground">
                {tab.client}
              </h3>

              {tab.metric ? (
                <div className="spectrum-rule rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="text-[clamp(2.75rem,2rem+2.4vw,4rem)] font-semibold leading-none tracking-[-0.06em] text-foreground">
                    {tab.metric.value}
                  </p>
                  <p className="mt-2 text-[15px] leading-snug text-muted-foreground">
                    {tab.metric.label}
                  </p>
                  <p className="mt-3 font-mono text-[12px] text-subtle">
                    {tab.metric.source} · {tab.metric.dateRange}
                  </p>
                </div>
              ) : (
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
                  {tab.focus ? (
                    <div className="bg-card p-4">
                      <dt className="text-eyebrow text-subtle">Focus</dt>
                      <dd className="mt-2 text-[15px] text-foreground">
                        {tab.focus}
                      </dd>
                    </div>
                  ) : null}
                  {tab.scope ? (
                    <div className="bg-card p-4">
                      <dt className="text-eyebrow text-subtle">Scope</dt>
                      <dd className="mt-2 text-[15px] text-foreground">
                        {tab.scope}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              )}

              {tab.result ? (
                <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {tab.result}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <TrackedLink
                  href={tab.href}
                  label={`read the ${tab.client} case study`}
                  location="homepage case studies"
                  className="group/link inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  Read the case study
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </TrackedLink>
                {tab.video ? (
                  <VideoDialog
                    youtubeId={tab.video.youtubeId}
                    title={tab.video.label}
                    description={tab.video.description}
                    location="homepage case studies"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

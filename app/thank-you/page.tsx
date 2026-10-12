import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { ConfirmationShell } from '@/components/landing/misc/confirmation'
import { Eyebrow } from '@/components/prism/section'
import ApplyDashboardClaimCta from '@/components/thank-you/ApplyDashboardClaimCta'
import ApplySuccessTracker from '@/components/thank-you/ApplySuccessTracker'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { firstSearchParamString } from '@/lib/search-params'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Thank you',
  description:
    'We received your submission. Every real inquiry is reviewed, and Prism reaches out when the next step is genuinely a fit for both sides.',
  path: '/thank-you',
  index: false,
})

const DEFAULT_NEXT_STEPS = [
  {
    label: '01',
    title: 'Submission received',
    body: 'Your form is in. The team has what it needs to begin the review.',
  },
  {
    label: '02',
    title: 'Review is guaranteed',
    body: 'Every real submission gets reviewed. That review is part of the standard flow.',
  },
  {
    label: '03',
    title: 'Next step is selective',
    body: 'If there is a fit, Prism will reach out with the right next step.',
  },
] as const

const APPLY_NEXT_STEPS = [
  {
    label: '01',
    title: 'Request received',
    body: 'Your free Growth Audit request is in the queue.',
  },
  {
    label: '02',
    title: 'Dashboard link sent',
    body: 'Your audit lives in a free dashboard. Claim it here or from your inbox.',
  },
  {
    label: '03',
    title: 'Growth Audit follows',
    body: 'Findings and your clearest next move land in the dashboard.',
  },
] as const

const WEBSITE_BUILD_NEXT_STEPS = [
  {
    label: '01',
    title: 'Request received',
    body: 'Your website request is in the review queue.',
  },
  {
    label: '02',
    title: 'Fit review',
    body: 'Prism checks the scope, assets, timing, and whether the team can make the work excellent.',
  },
  {
    label: '03',
    title: 'We reach out',
    body: 'If the project is a fit, Prism replies within two business days with next steps.',
  },
] as const

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string | string[] }>
}) {
  const resolvedSearchParams = await searchParams
  const source = firstSearchParamString(resolvedSearchParams?.source)
  const isApplyFlow = source === 'apply'
  const isWebsiteBuildFlow = source === 'website-build'
  const nextSteps = isApplyFlow
    ? APPLY_NEXT_STEPS
    : isWebsiteBuildFlow
      ? WEBSITE_BUILD_NEXT_STEPS
      : DEFAULT_NEXT_STEPS
  const kicker = isApplyFlow
    ? 'Free growth audit'
    : isWebsiteBuildFlow
      ? 'Website build'
      : 'Received'
  const headline = isApplyFlow
    ? 'audit request received.'
    : isWebsiteBuildFlow
      ? 'website request received.'
      : 'review in progress.'
  const body = isApplyFlow
    ? "Thanks, we've got it. Every real business submission receives a Growth Audit. Your audit lives in a free Growth Dashboard. Claim it to follow the review from one place."
    : isWebsiteBuildFlow
      ? "Thanks, we've got it. Prism reviews website requests before scoping the build. If the project is a fit, the team will reply within two business days."
      : "We received your submission. Every real inquiry gets reviewed. If there's a fit, we'll reach out with the right next step."

  return (
    <>
      {isApplyFlow ? <ApplySuccessTracker /> : <LeadSuccessTracker />}
      <ConfirmationShell center={false}>
        <div className="mx-auto max-w-5xl space-y-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-10 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] top-0 h-px bg-spectrum opacity-70"
            />
            <div className="mb-7 grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <Check aria-hidden="true" className="size-5 text-foreground" />
            </div>
            <Eyebrow>{kicker}</Eyebrow>
            <h1 className="text-gradient mt-5 max-w-[16ch] text-balance pb-1 text-[clamp(2.3rem,1.6rem+3vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              {headline}
            </h1>
            <p className="text-lead mt-6 max-w-[54ch] text-pretty text-muted-foreground">
              {body}
            </p>
          </div>

          {isApplyFlow ? <ApplyDashboardClaimCta /> : null}

          <ol className="grid gap-4 lg:grid-cols-3">
            {nextSteps.map((step) => (
              <li key={step.label}>
                <Card className="h-full p-6">
                  <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-subtle tabular-nums">
                    {step.label}
                  </p>
                  <h2 className="text-heading mt-4 text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {step.body}
                  </p>
                </Card>
              </li>
            ))}
          </ol>

          <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-heading text-foreground">
                {isApplyFlow ? 'while we review.' : 'in the meantime.'}
              </p>
              <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                {isApplyFlow
                  ? 'Check your inbox for the same dashboard link.'
                  : isWebsiteBuildFlow
                    ? 'Gather any copy, images, links, or references you want Prism to review.'
                    : 'You can review case studies or head back home.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group/cta">
                <Link href="/case-studies">
                  View case studies
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </Card>
        </div>
      </ConfirmationShell>
    </>
  )
}

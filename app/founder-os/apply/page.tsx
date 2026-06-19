import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Lock, UserCheck } from 'lucide-react'

import FounderOsApplicationForm from '@/components/forms/FounderOsApplicationForm'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Apply to build your Founder OS',
  description:
    'Apply for Founder OS, Prism’s custom AI operating-layer engagement. Tell us where your company is losing leverage and which workflow to rebuild first. Strong-fit teams are invited to a private engineering session.',
  path: '/founder-os/apply',
  ogImage: '/prism-opengraph.png',
})

const META = [
  { icon: Clock, label: '8–10 minutes' },
  { icon: UserCheck, label: 'Best completed by a founder or senior operator' },
  { icon: Lock, label: 'Do not include passwords, customer records, or confidential data' },
] as const

export default function FounderOsApplyPage() {
  return (
    <div
      data-surface="founder-os"
      className="min-h-screen bg-[#ffffff] font-sans text-[#0a0a0a] antialiased [color-scheme:light] selection:bg-[#0a0a0a] selection:text-[#ffffff]"
    >
      <header className="border-b border-[#ededed]">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[#0a0a0a] transition-colors hover:text-[#0063d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
            >
              Prism
            </Link>
            <span aria-hidden="true" className="text-[#d4d4d4]">
              /
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
              Founder OS
            </span>
          </div>
          <Link
            href="/founder-os"
            className="inline-flex items-center gap-1.5 text-[0.82rem] text-[#6e6e6e] transition-colors hover:text-[#0a0a0a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Overview
          </Link>
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16"
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#6e6e6e]">
          Founder OS application
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#0a0a0a]">
          Apply to build your Founder OS.
        </h1>
        <p className="mt-5 max-w-2xl text-[1.08rem] leading-8 text-[#525252]">
          Tell us where your company is losing leverage, which systems hold the
          truth, and which workflow should be rebuilt first. Prism reviews each
          application for business value, technical feasibility, and
          implementation readiness. Strong-fit teams are invited to a private
          scoping session with Prism engineering.
        </p>

        <ul className="mt-7 grid gap-3 border-y border-[#ededed] py-6 sm:grid-cols-3">
          {META.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0063d1]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[0.82rem] leading-5 text-[#525252]">{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <FounderOsApplicationForm />
        </div>

        <p className="mt-10 border-t border-[#ededed] pt-6 text-[0.78rem] leading-6 text-[#6e6e6e]">
          Prism stores your application to evaluate fit and may use trusted
          service providers to process it. Application data is not used to train
          public AI models. Please don&apos;t submit credentials, customer
          records, patient information, or other confidential source data — Prism
          will set up a secure process if detailed material is needed later. See
          the{' '}
          <Link href="/privacy-policy" className="text-[#0063d1] underline-offset-2 hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </main>
    </div>
  )
}

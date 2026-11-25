'use client'

import { useState } from 'react'

import { Section, SectionHeader } from '@/components/prism/section'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const PRESETS = [
  { label: 'General exam', margin: '300', attendance: '30' },
  { label: 'Cosmetic case', margin: '1200', attendance: '20' },
  { label: 'Implant consult', margin: '2500', attendance: '15' },
] as const

function formatUsd(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export default function DentalAdsWorksheet() {
  const [margin, setMargin] = useState('')
  const [attendance, setAttendance] = useState('')
  const valid =
    margin.trim() !== '' &&
    attendance.trim() !== '' &&
    Number(margin) > 0 &&
    Number(attendance) >= 0 &&
    Number(attendance) <= 100
  const ceiling = valid ? (Number(margin) * Number(attendance)) / 100 : null
  const conservativeTarget = ceiling !== null ? ceiling * 0.5 : null

  return (
    <Section aria-labelledby="budget-worksheet">
      <SectionHeader
        id="budget-worksheet"
        eyebrow="Practice budget worksheet"
        title="what is an inquiry worth to your practice?"
        description="Plug in your own numbers or tap an example below to see your break-even ceiling."
      />
      <div className="mt-8 grid max-w-3xl gap-5 rounded-3xl border border-border bg-card p-5 sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">
          <p className="text-[12px] text-subtle">Try a quick example</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const active =
                margin === preset.margin && attendance === preset.attendance
              return (
                <button
                  key={preset.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setMargin(preset.margin)
                    setAttendance(preset.attendance)
                  }}
                  className={cn(
                    'inline-flex min-h-9 items-center rounded-full border px-3.5 text-[12.5px] font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    active
                      ? 'border-foreground/40 bg-white/[0.09] text-foreground'
                      : 'border-white/[0.1] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:bg-white/[0.05] hover:text-foreground',
                  )}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="patient-margin">
            Contribution per attended new patient ($)
          </Label>
          <Input
            id="patient-margin"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="e.g. 400"
            className="h-12 rounded-xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="attendance-rate">
            Qualified inquiries that attend (%)
          </Label>
          <Input
            id="attendance-rate"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            step="any"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            placeholder="e.g. 25"
            className="h-12 rounded-xl"
          />
        </div>
        <div
          aria-live="polite"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:col-span-2"
        >
          {ceiling !== null && Number.isFinite(ceiling) ? (
            <>
              <p className="text-heading text-foreground">
                {ceiling.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                per qualified inquiry at break-even.
              </p>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                To keep roughly half your contribution as profit, aim under{' '}
                <span className="font-medium text-foreground">
                  {formatUsd(conservativeTarget ?? 0)}
                </span>{' '}
                per qualified inquiry for all ad spend and management combined.
              </p>
            </>
          ) : (
            <p className="text-[15px] leading-6 text-muted-foreground">
              Enter a positive contribution and a rate from 0 to 100%, or tap a
              practice example above.
            </p>
          )}
        </div>
      </div>
      <p className="mt-5 max-w-prose text-sm leading-6 text-muted-foreground">
        Illustration only: $400 contribution × 25% attendance gives $100 per
        qualified inquiry for all acquisition costs combined. Subtract
        management and creative costs per inquiry to find what stays available
        for media.
      </p>
    </Section>
  )
}

'use client'

import { useState } from 'react'

import { Section, SectionHeader } from '@/components/prism/section'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
  return (
    <Section aria-labelledby="budget-worksheet">
      <SectionHeader
        id="budget-worksheet"
        eyebrow="Practice budget worksheet"
        title="what is an inquiry worth to your practice?"
        description="Use contribution after the cost of delivering care and the share of qualified inquiries that become attended new-patient visits."
      />
      <div className="mt-8 grid max-w-3xl gap-5 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="patient-margin">
            Contribution per attended new patient ($)
          </Label>
          <Input
            id="patient-margin"
            type="number"
            min="0"
            step="any"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="e.g. 400"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="attendance-rate">
            Qualified inquiries that attend (%)
          </Label>
          <Input
            id="attendance-rate"
            type="number"
            min="0"
            max="100"
            step="any"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            placeholder="e.g. 25"
          />
        </div>
        <p aria-live="polite" className="text-heading sm:col-span-2">
          {ceiling !== null && Number.isFinite(ceiling)
            ? ceiling.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }) + ' per qualified inquiry at break-even.'
            : 'Enter a positive contribution and a rate from 0 to 100%.'}
        </p>
      </div>
      <p className="mt-5 max-w-prose text-muted-foreground">
        Illustration: $400 contribution × 25% attendance gives $100 per
        qualified inquiry for all acquisition costs combined. Subtract
        management fees and creative costs per inquiry to find the amount
        available for media. Use a lower target to leave room for profit.
      </p>
    </Section>
  )
}

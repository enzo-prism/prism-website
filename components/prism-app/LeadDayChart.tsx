'use client'

import { useState } from 'react'
import { DEMO_LEADS } from '@/lib/prism-app'

const dayLabel = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export function LeadDayChart() {
  const [day, setDay] = useState(DEMO_LEADS.daily.length - 1)
  const count = DEMO_LEADS.daily[day]
  const date = new Date(DEMO_LEADS.firstDay)
  date.setUTCDate(date.getUTCDate() + day)
  const value = `${dayLabel.format(date)} · ${count} ${count === 1 ? 'lead' : 'leads'}`

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor="demo-lead-day" className="mb-2 block text-xs text-muted-foreground">
        Select a day
      </label>
      <div className="relative flex h-12 items-end gap-px border-b border-white/15">
        {DEMO_LEADS.daily.map((leads, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="min-h-px flex-1 rounded-t-sm bg-spectrum-green"
            style={{ height: `${leads / 4 * 100}%`, opacity: index === day ? 1 : 0.5 }}
          />
        ))}
        <input
          id="demo-lead-day"
          type="range"
          className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
          min={0}
          max={DEMO_LEADS.daily.length - 1}
          value={day}
          aria-valuetext={value}
          onChange={(event) => setDay(event.currentTarget.valueAsNumber)}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2" />
      </div>
      <output htmlFor="demo-lead-day" aria-live="off" className="mt-1 block text-right font-mono text-xs text-muted-foreground">{value}</output>
    </div>
  )
}

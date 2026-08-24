import { ArrowUpRight, LockKeyhole } from 'lucide-react'

import styles from './chatgpt-ads.module.css'

export default function ChatGptAdsConversation() {
  return (
    <aside className="relative" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-10 rounded-[3.5rem] bg-[radial-gradient(58%_58%_at_68%_22%,var(--cga-accent-soft),transparent_74%)]" />
      <div className="relative overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-foreground/10 shadow-[0_1px_2px_rgb(16_16_16/0.05),0_22px_60px_-26px_rgb(16_16_16/0.24),0_60px_110px_-48px_rgb(16_16_16/0.3)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Illustrative placement
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <LockKeyhole className="size-3" />
            Private chat
          </span>
        </div>
        <div className="flex flex-col gap-3 px-5 py-6 sm:px-6 sm:py-7">
          <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-muted px-4 py-3 text-sm leading-relaxed">
            I need a dentist near Austin taking new patients, with Saturday
            appointments and online booking.
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            I can help you compare nearby practices by availability, services,
            and how to book.
          </div>
          <div className="relative mt-1 overflow-hidden rounded-2xl bg-card p-4 shadow-xs ring-1 ring-(--cga-accent-ring) sm:p-5">
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-px ${styles.scanLine}`}
            />
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-(--cga-accent)">
                <span className="size-1.5 rounded-full bg-(--cga-accent)" />
                Sponsored
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Matches the ask
              </span>
            </div>
            <p className="mt-3 text-lg font-medium tracking-[-0.03em]">
              A practice ready for this patient.
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              New-patient availability, Saturday hours, and a direct path to
              book.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['New patients', 'Saturday hours', 'Book online'].map((item) => (
                <span
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground shadow-xs">
              Check availability
              <ArrowUpRight className="size-3" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-border bg-background/55">
          {[
            ['Answer', 'Independent'],
            ['Chat', 'Private'],
            ['Ad', 'Labeled'],
          ].map(([label, value], index) => (
            <div
              className={`px-3 py-3 ${index > 0 ? 'border-l border-border' : ''}`}
              key={label}
            >
              <span className="block font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

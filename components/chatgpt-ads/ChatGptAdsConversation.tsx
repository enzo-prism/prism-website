import { ArrowUpRight } from 'lucide-react'

import styles from './chatgpt-ads.module.css'

export default function ChatGptAdsConversation() {
  return (
    <aside className="relative" aria-hidden="true">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(58%_58%_at_72%_18%,rgb(16_163_127/0.13),transparent_72%)]"
      />
      <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 shadow-[0_1px_2px_rgb(16_16_16/0.05),0_16px_48px_-20px_rgb(16_16_16/0.22),0_48px_96px_-40px_rgb(16_16_16/0.28)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            ChatGPT
          </span>
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="size-2 rounded-full bg-foreground/10" />
          </span>
        </div>
        <div className="flex flex-col gap-3 px-5 py-6 sm:px-6">
          <div className="max-w-[88%] self-end rounded-2xl rounded-br-md bg-muted px-4 py-3 text-sm leading-relaxed">
            Who is a great dentist near me that takes new patients?
          </div>
          <div className="max-w-[88%] self-start rounded-2xl rounded-bl-md border border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            Here are a few well-reviewed options in your area, with hours and
            how to book.
          </div>
          <div className="mt-1 rounded-2xl p-4 shadow-xs ring-1 ring-(--cga-accent-ring) [background:linear-gradient(180deg,var(--cga-accent-soft),transparent_46%),var(--card)] sm:p-5">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-(--cga-accent)" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-(--cga-accent)">
                Sponsored
              </span>
            </div>
            <p className="mt-2.5 text-base font-medium tracking-[-0.02em]">
              Your business, in the answer.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              A clearly labeled card under the reply. Shown when someone is
              already asking to buy.
            </p>
            <span className="mt-3.5 inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-xs">
              Learn more
              <ArrowUpRight className="size-3 text-muted-foreground" />
            </span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-4 left-6 hidden items-center gap-2 rounded-full bg-card px-3.5 py-2 ring-1 ring-foreground/10 shadow-[0_12px_32px_-12px_rgb(16_16_16/0.3)] sm:inline-flex">
        <span className={styles.pulse} />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Labeled, never the answer
        </span>
      </div>
    </aside>
  )
}

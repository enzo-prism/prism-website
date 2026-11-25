'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X } from 'lucide-react'

import { FaqList } from '@/components/prism/faq-list'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { WAITLIST_PATH } from '@/lib/waitlist'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqTopic = {
  id: string
  title: string
  items: readonly FaqItem[]
}

type FaqExplorerProps = {
  topics: readonly FaqTopic[]
}

const QUICK_SEARCH_CHIPS = [
  { label: 'Waitlist', query: 'waitlist' },
  { label: 'Pricing', query: 'pricing' },
  { label: 'AI search', query: 'ChatGPT' },
  { label: 'Timeline', query: 'how long' },
] as const

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

/**
 * Searchable, topic-grouped FAQ on the shared native-<details> FaqList, so
 * every answer is in the server HTML. Mobile gets one-tap quick-search chips
 * and a horizontal topic-jump strip; searching auto-opens the top matching
 * answer per topic so answers appear without an extra tap.
 */
export default function FaqExplorer({ topics }: FaqExplorerProps) {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const needle = normalize(query)

  const visibleTopics = useMemo(() => {
    if (!needle) return topics
    return topics
      .map((topic) => ({
        ...topic,
        items: topic.items.filter((item) =>
          normalize(`${item.question} ${item.answer}`).includes(needle),
        ),
      }))
      .filter((topic) => topic.items.length > 0)
  }, [needle, topics])

  const matchCount = visibleTopics.reduce(
    (sum, topic) => sum + topic.items.length,
    0,
  )

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <label htmlFor={inputId} className="sr-only">
          Search questions
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle"
          />
          <Input
            id={inputId}
            type="search"
            enterKeyHint="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions"
            autoComplete="off"
            className="h-11 rounded-full pl-10 pr-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <X aria-hidden="true" className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Popular topics">
          {QUICK_SEARCH_CHIPS.map((chip) => {
            const active = normalize(chip.query) === needle
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={active}
                onClick={() => setQuery(active ? '' : chip.query)}
                className={cn(
                  'inline-flex min-h-8 items-center rounded-full border px-3 text-[12px] font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  active
                    ? 'border-foreground/40 bg-white/[0.09] text-foreground'
                    : 'border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:bg-white/[0.05] hover:text-foreground',
                )}
              >
                {chip.label}
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="mt-3 px-1 text-[13px] text-subtle">
          {needle
            ? `${matchCount} ${matchCount === 1 ? 'answer' : 'answers'} found`
            : `${topics.reduce((sum, topic) => sum + topic.items.length, 0)} answers in ${topics.length} topics`}
        </p>

        {/* Mobile topic jump strip when browsing so phone visitors never scroll blind. */}
        {!needle ? (
          <nav
            aria-label="Jump to topic"
            style={{
              maskImage:
                'linear-gradient(to right, black 0, black calc(100% - 2.25rem), transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 0, black calc(100% - 2.25rem), transparent 100%)',
            }}
            className="-mx-5 mt-4 overflow-x-auto overscroll-x-contain px-5 pb-1 pr-10 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:pr-8 lg:hidden [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-1.5">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href={`#faq-${topic.id}`}
                    className="inline-flex min-h-9 items-center rounded-full border border-white/[0.1] bg-card/80 px-3.5 text-[13px] text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <nav aria-label="FAQ topics" className="mt-6 hidden lg:block">
          <ul className="flex flex-col border-l border-white/[0.08]">
            {topics.map((topic) => {
              const visible = visibleTopics.some((item) => item.id === topic.id)
              return (
                <li key={topic.id}>
                  <a
                    href={`#faq-${topic.id}`}
                    aria-disabled={!visible || undefined}
                    className={
                      visible
                        ? '-ml-px flex min-h-10 items-center border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-white/40 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50'
                        : '-ml-px pointer-events-none flex min-h-10 items-center border-l border-transparent pl-4 text-sm text-white/25'
                    }
                  >
                    {topic.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        {visibleTopics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground">
              No answers match that search.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a shorter word, or ask us directly when you share your goals.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                Clear search
              </button>
              <Link
                href={WAITLIST_PATH}
                className="group/ask inline-flex min-h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                Ask us on the waitlist
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 group-hover/ask:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12 sm:gap-14">
            {visibleTopics.map((topic, topicIndex) => (
              <section
                key={topic.id}
                id={`faq-${topic.id}`}
                aria-labelledby={`faq-${topic.id}-heading`}
                className="scroll-mt-28"
              >
                <h2
                  id={`faq-${topic.id}-heading`}
                  className="text-heading text-foreground"
                >
                  {topic.title}.
                </h2>
                <FaqList
                  key={`${topic.id}-${needle ? `search-${needle}` : 'browse'}`}
                  items={topic.items}
                  name={`faq-${topic.id}`}
                  defaultOpen={needle || topicIndex === 0 ? 0 : undefined}
                  className="mt-5"
                />
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

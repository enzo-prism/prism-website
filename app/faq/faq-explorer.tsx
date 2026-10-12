'use client'

import { useId, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'

import { FaqList } from '@/components/prism/faq-list'
import { Input } from '@/components/ui/input'

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

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

/**
 * Searchable, topic-grouped FAQ on the shared native-<details> FaqList, so
 * every answer is in the server HTML. Search only filters what is shown.
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

  const matchCount = visibleTopics.reduce((sum, topic) => sum + topic.items.length, 0)

  return (
    <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <aside className="lg:sticky lg:top-28 lg:self-start">
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions"
            autoComplete="off"
            className="rounded-full pl-10 pr-10 [&::-webkit-search-cancel-button]:hidden"
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
        <p aria-live="polite" className="mt-3 px-1 text-[13px] text-subtle">
          {needle
            ? `${matchCount} ${matchCount === 1 ? 'answer' : 'answers'} found`
            : `${topics.reduce((sum, topic) => sum + topic.items.length, 0)} answers in ${topics.length} topics`}
        </p>

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
            <p className="text-base font-medium text-foreground">No answers match that search.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a shorter word, or clear the search to browse every topic.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {visibleTopics.map((topic) => (
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
                  items={topic.items}
                  name={`faq-${topic.id}`}
                  defaultOpen={0}
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

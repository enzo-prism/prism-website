'use client'

import { useEffect, useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

type FeedbackValue = 'helpful' | 'not-helpful'
type FeedbackState = FeedbackValue | null

const FEEDBACK_OPTIONS = [
  {
    value: 'helpful' as const,
    label: 'Yes',
    icon: ThumbsUp,
  },
  {
    value: 'not-helpful' as const,
    label: 'No',
    icon: ThumbsDown,
  },
]

function storageKey(slug: string) {
  return `prism-blog-feedback-${slug}`
}

interface BlogPostFeedbackProps {
  slug: string
}

export default function BlogPostFeedback({ slug }: BlogPostFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackState>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(storageKey(slug))
    if (saved === 'helpful' || saved === 'not-helpful') {
      setFeedback(saved)
    }
  }, [slug])

  const submitFeedback = (value: FeedbackValue) => {
    setFeedback(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey(slug), value)
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight">Was this post helpful?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your feedback helps us improve how we deliver practical playbooks.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="post helpfulness">
        {FEEDBACK_OPTIONS.map((option) => {
          const isSelected = feedback === option.value
          const Icon = option.icon
          return (
            <Button
              key={option.value}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              size="xs"
              onClick={() => submitFeedback(option.value)}
              className="min-h-11 rounded-md px-3 text-xs sm:text-sm"
              aria-pressed={isSelected}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              <span>{option.label}</span>
            </Button>
          )
        })}
      </div>
      {feedback ? (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          Thanks. We&apos;ll keep iterating based on what readers need.
        </p>
      ) : null}
    </section>
  )
}

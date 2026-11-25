'use client'

import { useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import { WAITLIST_FORM_ENDPOINT } from '@/lib/waitlist'
import { trackEvent } from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

/** A diagnostic request is distinct from an application for paid work. */
export default function SiteReviewForm() {
  const [state, setState] = useState<
    'ready' | 'sending' | 'error' | 'received'
  >('ready')
  const pending = useRef(false)
  const started = useRef(false)
  const receipt = useRef('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    for (const name of ['business', 'goal']) {
      const field = form.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
      if (!field.value.trim()) {
        field.setCustomValidity('Please add a few words here.')
        field.reportValidity()
        return
      }
      data.set(name, field.value.trim())
    }
    pending.current = true
    setState('sending')
    receipt.current ||= 'review-' + crypto.randomUUID()
    data.set('submission_id', receipt.current)
    appendAttributionToFormData(data)
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error('Request was not accepted')
    } catch {
      pending.current = false
      setState('error')
      trackEvent('site_review_error', { form_name: 'site_review' })
      return
    }
    setState('received')
    trackEvent('site_review_received', {
      form_name: 'site_review',
      transaction_id: receipt.current,
    })
  }

  if (state === 'received')
    return (
      <div role="status">
        <h2 className="text-heading">your request is in.</h2>
        <p className="mt-3 text-muted-foreground">
          Thanks for sharing your goal. We review requests as capacity allows.
          If we can help, we’ll reply to the address you provided.
        </p>
        <Link
          className="mt-6 inline-block underline underline-offset-4"
          href="/case-studies"
        >
          Explore the work
        </Link>
      </div>
    )
  return (
    <form
      action={WAITLIST_FORM_ENDPOINT}
      method="post"
      onSubmit={submit}
      className="grid gap-5"
      onChange={(event) => {
        const field = event.target
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity('')
        if (!started.current) {
          started.current = true
          trackEvent('site_review_start', { form_name: 'site_review' })
        }
      }}
    >
      <FormspreeOpsFields formKey="site_review" />
      <input
        type="hidden"
        name="_subject"
        value="Prism website review request"
      />
      <input type="hidden" name="intake_type" value="site_review" />
      <input
        type="text"
        name="_gotcha"
        hidden
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid gap-2">
        <Label htmlFor="review-business">Website or business name</Label>
        <Input
          id="review-business"
          name="business"
          required
          maxLength={240}
          autoComplete="organization"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="review-email">Work email</Label>
        <Input
          id="review-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="review-goal">
          What do you want more customers to do?
        </Label>
        <Textarea
          id="review-goal"
          name="goal"
          placeholder="For example, request a test ride at our shop."
          required
          maxLength={1600}
          rows={3}
        />
      </div>
      {state === 'error' && (
        <p role="alert">
          We couldn’t save your request. Your answers are still here. Please try
          again.
        </p>
      )}
      <Button type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Request a site review'}
      </Button>
    </form>
  )
}

'use client'

import { ArrowRight, Check } from 'lucide-react'

import { Eyebrow, Section } from '@/components/prism/section'
import { Button } from '@/components/ui/button'
import {
  appendFormspreeOpsMetadata,
  FormspreeOpsFields,
} from '@/components/forms/FormspreeOpsFields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import { trackFormSubmission } from '@/utils/analytics'
import Link from 'next/link'
import { useRef, useState } from 'react'

const DEFAULT_FORM_ENDPOINT = 'https://formspree.io/f/mwpwwjek'
const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT
const REFERRAL_OPTIONS = [
  'instagram',
  'tiktok',
  'youtube',
  'linkedin',
  'friend or client',
  'search',
  'event or meetup',
  'other',
]

export default function ScholarshipPageClient() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submitApplication = async (form: HTMLFormElement) => {
    setStatus('submitting')
    setErrorMessage(null)

    const formData = new FormData(form)
    const payload = new FormData()
    payload.append('first_name', String(formData.get('firstName') || ''))
    payload.append('last_name', String(formData.get('lastName') || ''))
    payload.append('email', String(formData.get('email') || ''))
    payload.append('heard_about', String(formData.get('referral') || ''))
    payload.append('project_description', String(formData.get('project') || ''))
    payload.append('page', 'scholarship')
    payload.append('_subject', 'New Prism scholarship application')
    payload.append('form_name', 'scholarship_application')
    appendFormspreeOpsMetadata(payload, 'scholarship')
    appendAttributionToFormData(payload)

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      })

      if (!response.ok) {
        throw new Error(
          'Could not submit your application. Please try again in a moment.',
        )
      }

      setStatus('success')
      trackFormSubmission('scholarship_application', 'scholarship_form', {
        conversionMode: 'immediate',
        lead_type: 'scholarship_application',
        sendGoogleAdsConversion: false,
      })
      form.reset()
      const textArea = form.querySelector<HTMLTextAreaElement>('textarea')
      textArea?.blur()
    } catch (error) {
      console.error('scholarship form submission failed', error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  const {
    getError,
    handleBlur,
    handleInput,
    handleSubmit: handleValidatedSubmit,
    isSubmitting,
  } = useFormValidation({ onValidSubmit: submitApplication })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setStatus('idle')
    setErrorMessage(null)
    void handleValidatedSubmit(event)
  }

  const renderError = (name: string) => {
    const error = getError(name)
    if (!error) return null

    return (
      <p
        id={`scholarship-${name}-error`}
        className="text-[0.8125rem] font-medium text-destructive"
        aria-live="polite"
      >
        {error}
      </p>
    )
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `scholarship-${name}-error` : undefined

  return (
    <Section
      id="apply"
      aria-labelledby="scholarship-apply-title"
      className="scroll-mt-20 pt-4 sm:pt-6"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Monthly pick</Eyebrow>
          <h2
            id="scholarship-apply-title"
            className="text-title text-gradient mt-5 max-w-[12ch] text-balance pb-1"
          >
            tell us your idea.
          </h2>
          <p className="text-lead mt-5 max-w-[44ch] text-pretty text-muted-foreground">
            One founder, one free website each month. We read every
            application before the next pick on the 1st of the month.
          </p>
          <ul className="mt-8 grid gap-3">
            {[
              'Share who it serves and what the site should help you achieve.',
              'We review every entry manually.',
              'If you are selected, we follow up by email.',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.95rem] leading-6 text-muted-foreground"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-foreground"
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/website-design"
            className="mt-8 inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            See how we approach website design
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset,0_30px_80px_-40px_oklch(0_0_0/80%)] sm:p-8">
          <form
            ref={formRef}
            id="scholarship_application"
            name="scholarship_application"
            action={FORM_ENDPOINT}
            method="POST"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="hidden"
              name="_subject"
              value="New Prism scholarship application"
            />
            <input
              type="hidden"
              name="form_name"
              value="scholarship_application"
            />
            <FormspreeOpsFields formKey="scholarship" />
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  placeholder="Alex"
                  aria-invalid={Boolean(getError('firstName'))}
                  aria-describedby={getDescribedBy('firstName')}
                  onBlur={handleBlur}
                  onInput={handleInput}
                />
                {renderError('firstName')}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  placeholder="Rivera"
                  aria-invalid={Boolean(getError('lastName'))}
                  aria-describedby={getDescribedBy('lastName')}
                  onBlur={handleBlur}
                  onInput={handleInput}
                />
                {renderError('lastName')}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(getError('email'))}
                aria-describedby={getDescribedBy('email')}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              {renderError('email')}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="referral"
                className="text-sm font-medium text-foreground"
              >
                How did you first hear about Prism?
              </label>
              <select
                id="referral"
                name="referral"
                required
                className="flex h-11 w-full rounded-lg border border-input bg-white/[0.03] px-3.5 text-base text-foreground outline-none transition-[color,box-shadow,border-color] hover:border-white/20 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-invalid:border-destructive [&>option]:bg-popover [&>option]:text-foreground"
                defaultValue=""
                aria-invalid={Boolean(getError('referral'))}
                aria-describedby={getDescribedBy('referral')}
                onBlur={handleBlur}
                onChange={handleInput}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {REFERRAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {renderError('referral')}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="project"
                className="text-sm font-medium text-foreground"
              >
                Tell us about the website you would like us to build
              </label>
              <Textarea
                id="project"
                name="project"
                minLength={24}
                required
                rows={5}
                placeholder="Share what you are building, who it serves, and what the site should help you achieve."
                aria-invalid={Boolean(getError('project'))}
                aria-describedby={getDescribedBy('project')}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              {renderError('project')}
            </div>
            {status === 'success' ? (
              <p
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground"
                role="status"
                aria-live="polite"
              >
                Thanks for applying. We will review your submission before
                the next pick and follow up via email.
              </p>
            ) : null}
            {status === 'error' && errorMessage ? (
              <p
                className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
                role="alert"
              >
                {errorMessage}
              </p>
            ) : null}
            <Button
              type="submit"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting…' : 'Submit application'}
            </Button>
            <p className="text-[13px] leading-5 text-subtle">
              We review every entry manually and reach out via email if
              you are selected. Submitting an application does not
              guarantee selection.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}

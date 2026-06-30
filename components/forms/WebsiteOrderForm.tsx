'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { paymentLink } from '@/lib/payment-links'
import { trackEvent, type EventType } from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

const FORM_ACTION =
  process.env.NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT ??
  'https://formspree.io/f/xpqebnbz'
const FORM_NAME = 'website_order'
const FORM_LOCATION = 'website_order_form'
const FORM_KEY = 'website-order'
const ORDER_PRICE = 300
const BRIEF_MAX_LENGTH = 4000

type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type OrderStatus = 'order' | 'success'

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

/**
 * The flat-$300 order funnel emits two events (`website_order_submitted` and
 * `website_order_begin_checkout`) that live outside the shared `EventType`
 * union in `utils/analytics`, which this component does not own. Route the
 * typed event name string through that closed union so the new funnel events
 * stay type-safe without editing the analytics module.
 */
function trackOrderEvent(
  eventName: string,
  params: Record<string, string | number | boolean>,
) {
  trackEvent(eventName as EventType, params)
}

function FieldError({ error, id }: { error: string; id: string }) {
  if (!error) return null

  return (
    <p
      id={id}
      className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#d8bc79]"
      aria-live="polite"
    >
      {error}
    </p>
  )
}

export default function WebsiteOrderForm() {
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const [brandName, setBrandName] = useState('')
  const [audience, setAudience] = useState('')
  const [websiteGoal, setWebsiteGoal] = useState('')
  const [projectBrief, setProjectBrief] = useState('')
  const [referenceLinks, setReferenceLinks] = useState('')
  const [timelineNote, setTimelineNote] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const [status, setStatus] = useState<OrderStatus>('order')
  const [submittedBrand, setSubmittedBrand] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { getError, handleBlur, handleSubmit, isSubmitting, validateFields } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
          })

          if (!response.ok) {
            setSubmitError("We couldn't place your order right now. Try again?")
            return
          }
        } catch (error) {
          console.error('website order submission failed:', error)
          setSubmitError("We couldn't place your order right now. Try again?")
          return
        }

        trackOrderEvent('website_order_submitted', {
          value: ORDER_PRICE,
          currency: 'USD',
          form_name: FORM_NAME,
          form_location: FORM_LOCATION,
          lead_type: FORM_NAME,
        })

        setSubmittedBrand(brandName.trim())
        setStatus('success')
      },
    })

  useEffect(() => {
    if (status === 'success') {
      successHeadingRef.current?.focus()
    }
  }, [status])

  const syncFieldValidity = useCallback((field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    switch (field.name) {
      case 'brand_name':
        if (!value) message = 'Enter your brand or business name'
        break
      case 'project_brief':
        if (!value) message = 'Tell us a little about the website you want'
        break
      case 'full_name':
        if (!value) message = 'Enter your name'
        break
      case 'email':
        if (!value) {
          message = 'Enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Enter a valid email'
        }
        break
    }

    field.setCustomValidity(message)
  }, [])

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    syncFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleOrderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    Array.from(event.currentTarget.elements)
      .filter(isFieldElement)
      .forEach(syncFieldValidity)

    await handleSubmit(event)
  }

  const handlePayClick = () => {
    trackOrderEvent('website_order_begin_checkout', {
      value: ORDER_PRICE,
      currency: 'USD',
      form_name: FORM_NAME,
      form_location: FORM_LOCATION,
    })
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  const fieldClassName =
    'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0'
  const labelClassName =
    'font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]'
  const optionalClassName = 'text-[#6e6e68] normal-case tracking-[0.04em]'

  if (status === 'success') {
    return (
      <div className="relative border border-white/10 bg-[#070707] p-6 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-9">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
          Order received
        </p>

        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 max-w-[14ch] text-balance font-sans text-[clamp(2rem,7vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8] focus-visible:outline-hidden"
        >
          Request received.
        </h2>

        <p className="mt-4 max-w-xl text-[1.05rem] leading-7 text-[#b8afa2]">
          {submittedBrand
            ? `We've got your vision for ${submittedBrand}'s website.`
            : "We've got your vision for your new website."}
        </p>

        <div className="mt-8 border border-white/10 bg-black/30 p-5 sm:p-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#8f877b]">
            What happens next
          </p>
          <p className="mt-3 text-[1rem] leading-7 text-[#d6d0c6]">
            We build your site to your spec, ready in about{' '}
            <span className="text-[#f5f0e8]">7 days</span>. To kick off the
            build, complete your <span className="text-[#f5f0e8]">$300</span>{' '}
            payment.
          </p>
        </div>

        <a
          href={paymentLink('website')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePayClick}
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#d8bc79]/60 bg-[#d8bc79]/12 px-6 font-mono text-[0.82rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:bg-[#d8bc79]/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-0 motion-reduce:transition-none"
        >
          Pay $300 to start building
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>

        <p className="mt-5 max-w-xl text-[0.92rem] leading-7 text-[#8f877b]">
          Once you pay, our team starts building. The finished website is 100%
          yours, and we do infinite iterations until you love it. When you're
          happy, add a $100/month care plan or host it yourself — your call.
        </p>
      </div>
    )
  }

  return (
    <form
      id={FORM_NAME}
      name={FORM_NAME}
      action={FORM_ACTION}
      method="POST"
      noValidate
      onSubmit={handleOrderSubmit}
      className="relative border border-white/10 bg-[#070707] p-5 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-7"
    >
      <input type="hidden" name="_subject" value="New website order — $300" />
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <input type="hidden" name="order_value" value={ORDER_PRICE} />
      <FormspreeOpsFields formKey={FORM_KEY} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
            Website by Prism
          </p>
          <h2 className="max-w-[16ch] text-balance font-sans text-[clamp(1.9rem,6vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8]">
            Describe your website.
          </h2>
          <p className="max-w-md font-mono text-[0.84rem] leading-6 text-[#8f877b]">
            Tell us what you want. We design and build it, then iterate until
            you love it.
          </p>
        </div>

        <div className="shrink-0 border border-[#d8bc79]/30 bg-[#d8bc79]/10 px-4 py-3 text-right">
          <p className="font-sans text-[2rem] font-medium leading-none tracking-[-0.05em] text-[#f5f0e8] tabular-nums">
            $300
          </p>
          <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#d8bc79]">
            Flat · one-time
          </p>
        </div>
      </div>

      <div className="grid gap-6 py-7 sm:py-9">
        <div className="space-y-3">
          <Label htmlFor="website-order-brand" className={labelClassName}>
            Brand or business name
          </Label>
          <Input
            id="website-order-brand"
            name="brand_name"
            required
            autoComplete="organization"
            value={brandName}
            placeholder="Business or project name"
            className={fieldClassName}
            aria-invalid={Boolean(getError('brand_name'))}
            aria-describedby={getDescribedBy('brand_name')}
            onChange={(event) => setBrandName(event.currentTarget.value)}
            onBlur={handleValidatedBlur}
          />
          <FieldError error={getError('brand_name')} id="brand_name-error" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="website-order-audience" className={labelClassName}>
              What you do{' '}
              <span className={optionalClassName}>/ who you serve</span>
            </Label>
            <Input
              id="website-order-audience"
              name="audience"
              value={audience}
              placeholder="e.g. Family dentistry in Austin"
              className={fieldClassName}
              onChange={(event) => setAudience(event.currentTarget.value)}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="website-order-goal" className={labelClassName}>
              What the website is for{' '}
              <span className={optionalClassName}>(optional)</span>
            </Label>
            <Input
              id="website-order-goal"
              name="website_goal"
              value={websiteGoal}
              placeholder="e.g. Book more new patients"
              className={fieldClassName}
              onChange={(event) => setWebsiteGoal(event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="website-order-brief" className={labelClassName}>
            Describe your website
          </Label>
          <Textarea
            id="website-order-brief"
            name="project_brief"
            required
            maxLength={BRIEF_MAX_LENGTH}
            value={projectBrief}
            placeholder="Pages you want, style / vibe, inspiration sites, content you already have, anything that helps us match your vision. The more detail, the better."
            className="min-h-[220px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
            aria-invalid={Boolean(getError('project_brief'))}
            aria-describedby={getDescribedBy('project_brief')}
            onChange={(event) => setProjectBrief(event.currentTarget.value)}
            onBlur={handleValidatedBlur}
          />
          <FieldError
            error={getError('project_brief')}
            id="project_brief-error"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="website-order-links" className={labelClassName}>
            Existing site or inspiration links{' '}
            <span className={optionalClassName}>(optional)</span>
          </Label>
          <Textarea
            id="website-order-links"
            name="reference_links"
            maxLength={800}
            value={referenceLinks}
            placeholder="yourcurrentsite.com, sites you love, social profiles…"
            className="min-h-[88px] border-white/12 bg-black/40 px-4 py-3 text-[0.95rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
            onChange={(event) => setReferenceLinks(event.currentTarget.value)}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="website-order-timeline" className={labelClassName}>
            Timeline note <span className={optionalClassName}>(optional)</span>
          </Label>
          <Input
            id="website-order-timeline"
            name="timeline_note"
            value={timelineNote}
            placeholder="e.g. Hoping to launch before next month"
            className={fieldClassName}
            onChange={(event) => setTimelineNote(event.currentTarget.value)}
          />
        </div>

        <div className="grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="website-order-name" className={labelClassName}>
              Your name
            </Label>
            <Input
              id="website-order-name"
              name="full_name"
              required
              autoComplete="name"
              value={fullName}
              placeholder="Your name"
              className={fieldClassName}
              aria-invalid={Boolean(getError('full_name'))}
              aria-describedby={getDescribedBy('full_name')}
              onChange={(event) => setFullName(event.currentTarget.value)}
              onBlur={handleValidatedBlur}
            />
            <FieldError error={getError('full_name')} id="full_name-error" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="website-order-email" className={labelClassName}>
              Email
            </Label>
            <Input
              id="website-order-email"
              name="email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              spellCheck={false}
              value={email}
              placeholder="you@company.com"
              className={fieldClassName}
              aria-invalid={Boolean(getError('email'))}
              aria-describedby={getDescribedBy('email')}
              onChange={(event) => setEmail(event.currentTarget.value)}
              onBlur={handleValidatedBlur}
            />
            <FieldError error={getError('email')} id="email-error" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-14 w-full border-[#d8bc79]/60 bg-[#d8bc79]/12 px-6 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] hover:bg-[#d8bc79]/20 focus-visible:ring-[#d8bc79]/40"
        >
          {isSubmitting ? 'Placing order…' : 'Place my order'}
          {!isSubmitting ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : null}
        </Button>
        <p className="mt-4 text-center font-mono text-[0.72rem] leading-6 text-[#8f877b]">
          Flat $300, one time. You pay on the next step to start the build.
        </p>

        {submitError ? (
          <Alert className="mt-4 border-[#d8bc79]/30 bg-[#d8bc79]/8 text-[#f5f0e8]">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}
      </div>
    </form>
  )
}

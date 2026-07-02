'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { trackFormSubmission } from '@/utils/analytics'
import { FormspreeOpsFields } from './FormspreeOpsFields'

/** Referral form: $100 per referral who becomes a Prism client. */
const FORM_ACTION =
  process.env.NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT ??
  'https://formspree.io/f/meebpgaj'
const FORM_NAME = 'referral'
const FORM_LOCATION = 'referral_form'
const FORM_KEY = 'referral'

type ValidFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

function isFieldElement(element: Element): element is ValidFieldElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
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

const fieldClassName =
  'min-h-14 border-white/12 bg-black/40 px-4 text-[1rem] text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0'
const labelClassName =
  'font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#8f877b]'
const optionalClassName = 'text-[#6e6e68] normal-case tracking-[0.04em]'

export default function ReferralForm() {
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const [referrerName, setReferrerName] = useState('')
  const [referrerEmail, setReferrerEmail] = useState('')
  const [friendName, setFriendName] = useState('')
  const [friendBusiness, setFriendBusiness] = useState('')
  const [friendContact, setFriendContact] = useState('')
  const [friendNeed, setFriendNeed] = useState('')
  const [note, setNote] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)
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
            setSubmitError(
              "We couldn't send your referral right now. Try again?",
            )
            return
          }
        } catch (error) {
          console.error('referral submission failed:', error)
          setSubmitError("We couldn't send your referral right now. Try again?")
          return
        }

        // Referral payouts are not sales leads: no Google Ads conversion.
        trackFormSubmission(FORM_NAME, FORM_LOCATION, {
          conversionMode: 'immediate',
          sendGoogleAdsConversion: false,
        })

        setIsSubmitted(true)
        requestAnimationFrame(() => successHeadingRef.current?.focus())
      },
    })

  const syncFieldValidity = (field: ValidFieldElement) => {
    const value = field.value.trim()
    let message = ''

    switch (field.name) {
      case 'referrer_name':
        if (!value) message = 'Enter your name'
        break
      case 'referrer_email':
        if (!value) {
          message = 'Enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Enter a valid email'
        }
        break
      case 'friend_name':
        if (!value) message = "Enter your friend's name"
        break
      case 'friend_contact':
        if (!value) message = 'Enter an email or phone number for them'
        break
    }

    field.setCustomValidity(message)
  }

  const handleValidatedBlur = (event: FocusEvent<ValidFieldElement>) => {
    syncFieldValidity(event.currentTarget)
    handleBlur(event)
  }

  const handleReferralSubmit = async (event: FormEvent<HTMLFormElement>) => {
    Array.from(event.currentTarget.elements)
      .filter(isFieldElement)
      .forEach(syncFieldValidity)

    await handleSubmit(event)
  }

  const handleReset = () => {
    setFriendName('')
    setFriendBusiness('')
    setFriendContact('')
    setFriendNeed('')
    setNote('')
    setSubmitError(null)
    setIsSubmitted(false)
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  if (isSubmitted) {
    return (
      <div className="border border-white/10 bg-[#070707] p-6 sm:p-9">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
          Received
        </p>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 font-sans text-[clamp(1.7rem,5vw,2.4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#f5f0e8] focus-visible:outline-hidden"
        >
          We&apos;ll take it from here.
        </h3>
        <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#b8afa2]">
          We&apos;ll reach out to your friend within one business day. The day
          they become a client, $100 goes to you — then send us the next one.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-white/16 bg-white/[0.03] px-6 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0 motion-reduce:transition-none"
        >
          Refer another friend
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </button>
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
      onSubmit={handleReferralSubmit}
      className="border border-white/10 bg-[#070707] p-6 sm:p-9"
    >
      <input
        type="hidden"
        name="_subject"
        value="New referral — $100 program"
      />
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <FormspreeOpsFields formKey={FORM_KEY} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="referral-your-name" className={labelClassName}>
              Your name
            </Label>
            <Input
              id="referral-your-name"
              name="referrer_name"
              required
              autoComplete="name"
              value={referrerName}
              placeholder="Alex Rivera"
              className={fieldClassName}
              aria-invalid={Boolean(getError('referrer_name'))}
              aria-describedby={getDescribedBy('referrer_name')}
              onChange={(event) => setReferrerName(event.currentTarget.value)}
              onBlur={handleValidatedBlur}
            />
            <FieldError
              error={getError('referrer_name')}
              id="referrer_name-error"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="referral-your-email" className={labelClassName}>
              Your email
            </Label>
            <Input
              id="referral-your-email"
              name="referrer_email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              spellCheck={false}
              value={referrerEmail}
              placeholder="you@company.com"
              className={fieldClassName}
              aria-invalid={Boolean(getError('referrer_email'))}
              aria-describedby={getDescribedBy('referrer_email')}
              onChange={(event) => setReferrerEmail(event.currentTarget.value)}
              onBlur={handleValidatedBlur}
            />
            <FieldError
              error={getError('referrer_email')}
              id="referrer_email-error"
            />
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="referral-friend-name" className={labelClassName}>
              Friend&apos;s name
            </Label>
            <Input
              id="referral-friend-name"
              name="friend_name"
              required
              value={friendName}
              placeholder="Jordan Lee"
              className={fieldClassName}
              aria-invalid={Boolean(getError('friend_name'))}
              aria-describedby={getDescribedBy('friend_name')}
              onChange={(event) => setFriendName(event.currentTarget.value)}
              onBlur={handleValidatedBlur}
            />
            <FieldError error={getError('friend_name')} id="friend_name-error" />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="referral-friend-business"
              className={labelClassName}
            >
              Their business{' '}
              <span className={optionalClassName}>(optional)</span>
            </Label>
            <Input
              id="referral-friend-business"
              name="friend_business"
              value={friendBusiness}
              placeholder="Lee Family Dental"
              className={fieldClassName}
              onChange={(event) =>
                setFriendBusiness(event.currentTarget.value)
              }
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="referral-friend-contact" className={labelClassName}>
            Their email or phone
          </Label>
          <Input
            id="referral-friend-contact"
            name="friend_contact"
            required
            value={friendContact}
            placeholder="jordan@leedental.com or (916) 555-0123"
            className={fieldClassName}
            aria-invalid={Boolean(getError('friend_contact'))}
            aria-describedby={getDescribedBy('friend_contact')}
            onChange={(event) => setFriendContact(event.currentTarget.value)}
            onBlur={handleValidatedBlur}
          />
          <FieldError
            error={getError('friend_contact')}
            id="friend_contact-error"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="referral-friend-need" className={labelClassName}>
            What do they need?{' '}
            <span className={optionalClassName}>(optional)</span>
          </Label>
          <Input
            id="referral-friend-need"
            name="friend_need"
            value={friendNeed}
            placeholder="Website, content, dental, everything — your best guess"
            className={fieldClassName}
            onChange={(event) => setFriendNeed(event.currentTarget.value)}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="referral-note" className={labelClassName}>
            Anything else? <span className={optionalClassName}>(optional)</span>
          </Label>
          <Textarea
            id="referral-note"
            name="note"
            maxLength={600}
            value={note}
            placeholder="They just opened a second location."
            className="min-h-[96px] border-white/12 bg-black/40 px-4 py-3 text-[1rem] leading-7 text-[#f5f0e8] placeholder:text-[#6e6e68] focus-visible:border-[#d8bc79]/65 focus-visible:ring-[#d8bc79]/30 focus-visible:ring-offset-0"
            onChange={(event) => setNote(event.currentTarget.value)}
          />
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#d8bc79]/60 bg-[#d8bc79]/12 px-6 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:bg-[#d8bc79]/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        >
          {isSubmitting ? 'Sending…' : 'Send the referral'}
          {!isSubmitting ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : null}
        </button>
        <p className="mt-4 text-center font-mono text-[0.68rem] leading-6 text-[#8f877b]">
          We&apos;ll reach out to them. You get $100 when they become a client.
        </p>

        {submitError ? (
          <p
            role="alert"
            className="mt-4 border border-[#d8bc79]/30 bg-[#d8bc79]/8 px-4 py-3 text-[0.95rem] text-[#f5f0e8]"
          >
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  )
}

'use client'

import type { FocusEvent, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
      className="text-[0.8125rem] font-medium text-destructive"
      aria-live="polite"
    >
      {error}
    </p>
  )
}

const fieldClassName = 'h-12 bg-background/60 px-4 text-[1rem]'
const labelClassName = 'text-[0.875rem] font-medium text-foreground'
const optionalClassName = 'font-normal text-subtle'
const panelClassName =
  'rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset,0_30px_80px_-40px_oklch(0_0_0/80%)] sm:p-8'

export default function ReferralForm() {
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const [referrerName, setReferrerName] = useState('')
  const [referrerEmail, setReferrerEmail] = useState('')
  const [friendName, setFriendName] = useState('')
  const [friendBusiness, setFriendBusiness] = useState('')
  const [friendContact, setFriendContact] = useState('')
  const [friendNeed, setFriendNeed] = useState('')
  const [note, setNote] = useState('')
  const [hasReferralPermission, setHasReferralPermission] = useState(false)

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
      case 'referral_permission':
        if (field instanceof HTMLInputElement && !field.checked) {
          message = 'Confirm you have permission to share their details'
        }
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
    setHasReferralPermission(false)
    setSubmitError(null)
    setIsSubmitted(false)
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `${name}-error` : undefined

  if (isSubmitted) {
    return (
      <div className={panelClassName}>
        <p className="inline-flex items-center gap-2 text-eyebrow text-subtle">
          <span className="prism-live-dot" aria-hidden="true" />
          Received
        </p>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-heading mt-4 text-foreground focus-visible:outline-hidden"
        >
          We&apos;ll take it from here.
        </h3>
        <p className="mt-4 max-w-xl text-pretty text-[1rem] leading-7 text-muted-foreground">
          We&apos;ll reach out to your friend within one business day. The day
          they become a client, $100 goes to you. Then send us the next one.
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="mt-7"
        >
          Refer another friend
          <ArrowRight aria-hidden="true" />
        </Button>
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
      className={panelClassName}
    >
      <input
        type="hidden"
        name="_subject"
        value="New referral: $100 program"
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

        <div className="grid gap-6 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
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
            <FieldError
              error={getError('friend_name')}
              id="friend_name-error"
            />
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
              onChange={(event) => setFriendBusiness(event.currentTarget.value)}
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

        <div className="space-y-3 border-t border-white/[0.08] pt-6">
          <div className="flex items-start gap-3">
            <input
              id="referral-permission"
              name="referral_permission"
              type="checkbox"
              required
              value="confirmed"
              checked={hasReferralPermission}
              className="mt-0.5 size-5 shrink-0 rounded accent-primary"
              aria-invalid={Boolean(getError('referral_permission'))}
              aria-describedby={
                getError('referral_permission')
                  ? 'referral-permission-help referral_permission-error'
                  : 'referral-permission-help'
              }
              onChange={(event) => {
                setHasReferralPermission(event.currentTarget.checked)
                syncFieldValidity(event.currentTarget)
                if (getError('referral_permission')) {
                  validateFields([event.currentTarget])
                }
              }}
              onBlur={handleValidatedBlur}
            />
            <Label
              htmlFor="referral-permission"
              className="text-[0.95rem] font-normal leading-6 text-muted-foreground"
            >
              I have their permission to share these contact details with Prism.
            </Label>
          </div>
          <p
            id="referral-permission-help"
            className="pl-8 text-[0.8125rem] leading-5 text-subtle"
          >
            We&apos;ll use their details only to follow up about this referral.
          </p>
          <FieldError
            error={getError('referral_permission')}
            id="referral_permission-error"
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
            placeholder="Website, content, dental, everything: your best guess"
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
            className="min-h-[96px] bg-background/60 px-4 py-3 text-[1rem] leading-7"
            onChange={(event) => setNote(event.currentTarget.value)}
          />
        </div>
      </div>

      <div className="mt-7 border-t border-white/[0.08] pt-6">
        <Button
          type="submit"
          size="xl"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending…' : 'Send the referral'}
          {!isSubmitting ? <Check aria-hidden="true" /> : null}
        </Button>
        <p className="mt-4 text-center text-[0.8125rem] leading-6 text-subtle">
          We&apos;ll reach out to them. You get $100 when they become a client.
        </p>

        {submitError ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-[0.95rem] text-foreground"
          >
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  )
}

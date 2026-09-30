'use client'

import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, FormEvent } from 'react'

import { coreHeroPrimaryActionClassName } from '@/components/core-route/CoreRoutePrimitives'
import {
  appendFormspreeOpsMetadata,
  FormspreeOpsFields,
} from '@/components/forms/FormspreeOpsFields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import {
  getScholarshipRound,
  OFFICE_HOURS_APPLICATION_ENDPOINT,
  SCHOLARSHIP_FORM_ENDPOINT,
} from '@/lib/scholarships'
import { trackFormSubmission } from '@/utils/analytics'

type ProgramApplicationFormProps = {
  program: 'scholarship' | 'office-hours'
  roundId?: string
  roundLabel?: string
}

type ApplicationField = {
  name: string
  label: string
  type?: 'email' | 'url'
  autoComplete?: string
  multiline?: boolean
  optional?: boolean
  help?: string
  maxLength: number
}

const contactFields: ApplicationField[] = [
  {
    name: 'firstName',
    label: 'First name',
    autoComplete: 'given-name',
    maxLength: 100,
  },
  {
    name: 'lastName',
    label: 'Last name',
    autoComplete: 'family-name',
    maxLength: 100,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    maxLength: 254,
  },
]

const scholarshipFields: ApplicationField[] = [
  { name: 'projectName', label: 'Project or business name', maxLength: 200 },
  {
    name: 'projectUrl',
    label: 'Project website or social link',
    type: 'url',
    optional: true,
    help: 'An existing link is helpful, but you do not need one to apply. Include https://.',
    maxLength: 2000,
  },
  {
    name: 'projectDescription',
    label: 'What are you building?',
    multiline: true,
    help: 'Tell us who it is for, where you are in your journey, and what you want to make possible.',
    maxLength: 4000,
  },
  {
    name: 'supportNeeded',
    label: 'How could Prism help?',
    multiline: true,
    help: 'Describe the website, content, or growth support that would move your project forward.',
    maxLength: 3000,
  },
  {
    name: 'financialNeed',
    label: 'Why is a scholarship the right next step?',
    multiline: true,
    help: 'Share why paid Prism support is out of reach right now. No financial documents or income figures are needed.',
    maxLength: 3000,
  },
]

const officeHoursFields: ApplicationField[] = [
  {
    name: 'message',
    label: 'What would you like to cover?',
    multiline: true,
    help: 'Tell Enzo about your project and the question or decision you want to work through.',
    maxLength: 4000,
  },
]

const fieldClassName =
  'min-h-14 rounded-xl border-border bg-background px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-0'

function checkMeaningfulValue(field: HTMLInputElement | HTMLTextAreaElement) {
  field.setCustomValidity(
    field.required && field.value.length > 0 && !field.value.trim()
      ? 'Please enter an answer.'
      : '',
  )
}

export default function ProgramApplicationForm({
  program,
  roundId,
  roundLabel,
}: ProgramApplicationFormProps) {
  const scholarship = program === 'scholarship'
  const [round, setRound] = useState(() => {
    const current = getScholarshipRound()
    return { id: roundId ?? current.id, label: roundLabel ?? current.label }
  })
  const [submittedRoundLabel, setSubmittedRoundLabel] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const formKey = scholarship ? 'scholarship' : 'office_hours_application'
  const formName = scholarship
    ? 'scholarship_application'
    : 'office_hours_application'
  const endpoint = scholarship
    ? SCHOLARSHIP_FORM_ENDPOINT
    : OFFICE_HOURS_APPLICATION_ENDPOINT
  const fields = [
    ...contactFields,
    ...(scholarship ? scholarshipFields : officeHoursFields),
  ]

  useEffect(() => {
    if (!scholarship) return
    const refreshRound = () => {
      const current = getScholarshipRound()
      setRound((previous) =>
        previous.id === current.id && previous.label === current.label
          ? previous
          : { id: current.id, label: current.label },
      )
    }
    const refreshVisibleRound = () => {
      if (document.visibilityState === 'visible') refreshRound()
    }
    refreshRound()
    window.addEventListener('focus', refreshRound)
    document.addEventListener('visibilitychange', refreshVisibleRound)
    return () => {
      window.removeEventListener('focus', refreshRound)
      document.removeEventListener('visibilitychange', refreshVisibleRound)
    }
  }, [scholarship])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const { getError, handleBlur, handleInput, handleSubmit, isSubmitting } =
    useFormValidation({
      onValidSubmit: async (form) => {
        setSubmitError(null)
        const payload = new FormData(form)
        const submissionRound = scholarship ? getScholarshipRound() : null
        for (const field of fields) {
          payload.set(field.name, String(payload.get(field.name) ?? '').trim())
        }
        if (scholarship) {
          // Keep the fields consumed by the existing scholarship inbox workflow
          // while adding the richer application answers under their own names.
          payload.set('first_name', String(payload.get('firstName') ?? ''))
          payload.set('last_name', String(payload.get('lastName') ?? ''))
          payload.set(
            'project_description',
            String(payload.get('projectDescription') ?? ''),
          )
          payload.set('page', 'scholarship')
          if (submissionRound) {
            payload.set('scholarship_round', submissionRound.id)
            setRound({ id: submissionRound.id, label: submissionRound.label })
          }
        }
        appendFormspreeOpsMetadata(payload, formKey)
        appendAttributionToFormData(payload)

        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 20_000)
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: payload,
            signal: controller.signal,
          })
          if (!response.ok) throw new Error('Submission was not accepted')
        } catch {
          setSubmitError(
            controller.signal.aborted
              ? 'The request took too long. Your answers are still here. Please try again.'
              : 'We could not send your application. Your answers are still here. Please try again.',
          )
          return
        } finally {
          window.clearTimeout(timeout)
        }

        setSubmittedRoundLabel(submissionRound?.label ?? '')
        setSubmitted(true)
        // Preserve scholarship measurement without sending Ads conversions.
        // Office hours are only a submission event. Never send freeform
        // answers or contact details to analytics.
        trackFormSubmission(
          formName,
          scholarship ? 'scholarship_form' : 'office_hours_application_form',
          {
            conversionMode: scholarship ? 'immediate' : 'none',
            sendGoogleAdsConversion: false,
            lead_type: formName,
          },
        )
      },
    })

  function submit(event: FormEvent<HTMLFormElement>) {
    event.currentTarget
      .querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
      >('input:not([type="hidden"]), textarea')
      .forEach(checkMeaningfulValue)
    void handleSubmit(event)
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="space-y-5 rounded-xl border border-border bg-muted p-6 sm:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Application received
        </p>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-2xl font-medium tracking-tight text-foreground focus:outline-none"
        >
          {scholarship
            ? 'Thank you for sharing your project.'
            : 'Your next step starts here.'}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          {scholarship
            ? `Your application for ${submittedRoundLabel} has been received. We will review it and email you about the outcome. Applying does not guarantee a scholarship.`
            : 'Your office hours application has been received. Enzo will review it and email you if you are approved, with instructions to choose a Sunday. Your application does not reserve a session.'}
        </p>
      </div>
    )
  }

  return (
    <form
      id={`${program}-application-form`}
      name={formName}
      aria-label={
        scholarship ? 'Scholarship application' : 'Office hours application'
      }
      action={endpoint}
      method="POST"
      noValidate
      onSubmit={submit}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="_subject"
        value={
          scholarship
            ? 'New Prism scholarship application'
            : 'New Prism office hours application'
        }
      />
      <input type="hidden" name="form_name" value={formName} />
      <input type="hidden" name="program" value={program} />
      {scholarship ? (
        <input type="hidden" name="scholarship_round" value={round.id} />
      ) : null}
      <FormspreeOpsFields formKey={formKey} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {scholarship ? (
        <p aria-live="polite" className="text-sm font-medium text-foreground">
          Applying for {round.label}.
        </p>
      ) : null}
      <p className="text-sm leading-relaxed text-muted-foreground">
        All fields are required unless marked optional.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${program}-${field.name}`
          const error = getError(field.name)
          const describedBy =
            [field.help ? `${id}-help` : '', error ? `${id}-error` : '']
              .filter(Boolean)
              .join(' ') || undefined
          const props = {
            id,
            name: field.name,
            required: !field.optional,
            maxLength: field.maxLength,
            autoComplete: field.autoComplete,
            'aria-invalid': Boolean(error),
            'aria-describedby': describedBy,
            className: fieldClassName,
            onBlur: (
              event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              checkMeaningfulValue(event.currentTarget)
              handleBlur(event)
            },
            onInput: (
              event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              checkMeaningfulValue(event.currentTarget)
              handleInput(event)
            },
          }
          return (
            <div
              key={field.name}
              className={
                field.name === 'firstName' || field.name === 'lastName'
                  ? 'space-y-2'
                  : 'space-y-2 sm:col-span-2'
              }
            >
              <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground"
              >
                {field.label}
                {field.optional ? (
                  <span className="font-normal text-muted-foreground">
                    {' '}
                    (optional)
                  </span>
                ) : null}
              </label>
              {field.help ? (
                <p
                  id={`${id}-help`}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {field.help}
                </p>
              ) : null}
              {field.multiline ? (
                <Textarea {...props} rows={4} />
              ) : (
                <Input {...props} type={field.type ?? 'text'} />
              )}
              {error ? (
                <p
                  id={`${id}-error`}
                  className="text-sm text-destructive"
                  aria-live="polite"
                >
                  {error}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
      {submitError ? (
        <p
          role="alert"
          className="rounded-xl border border-border p-4 text-sm leading-relaxed text-foreground"
        >
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${coreHeroPrimaryActionClassName} disabled:cursor-wait disabled:opacity-60`}
      >
        {isSubmitting
          ? 'Sending application…'
          : scholarship
            ? 'Apply for a scholarship'
            : 'Apply for office hours'}
      </button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We use your details to review your application and follow up by email.{' '}
        {scholarship
          ? 'One scholarship is selected each quarter.'
          : 'Approval is required before you can reserve office hours.'}
      </p>
    </form>
  )
}

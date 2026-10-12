'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Camera,
  Sparkles,
  Wallet,
} from 'lucide-react'

import Footer from '@/components/footer'
import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  appendFormspreeOpsMetadata,
  FormspreeOpsFields,
} from '@/components/forms/FormspreeOpsFields'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { appendAttributionToFormData } from '@/lib/marketing-attribution'
import { trackCTAClick, trackFormSubmission } from '@/utils/analytics'
import { useFormValidation } from '@/hooks/use-form-validation'

const offerHighlights: Array<{
  icon: LucideIcon
  title: string
  description: string
  note?: string
}> = [
  {
    icon: Sparkles,
    title: 'free whitening',
    description:
      'Get a professional whitening treatment from one of our trusted partner dentists.',
    note: 'a serious head start',
  },
  {
    icon: Camera,
    title: 'professional photos & video',
    description:
      'Work with Prism’s creative team on real projects for local dental brands.',
  },
  {
    icon: Wallet,
    title: 'paid shoots',
    description:
      'Get compensated for your time and receive professional content for your own portfolio.',
  },
  {
    icon: CalendarCheck,
    title: 'flexible bookings',
    description:
      'Get alerts when opportunities pop up, pass on the ones that don’t fit, and lock in sessions that work for you.',
  },
]

const howItWorks = [
  {
    icon: '1',
    title: 'apply online',
    description: 'Fill out the short application form to get started.',
  },
  {
    icon: '2',
    title: 'get approved',
    description:
      'If you’re a good fit, we’ll add you to the Prism models list.',
  },
  {
    icon: '3',
    title: 'choose your session',
    description:
      'View available whitening appointments and pick one that fits your schedule.',
  },
  {
    icon: '4',
    title: 'whitening day',
    description:
      'Attend your appointment and enjoy your professional teeth whitening.',
  },
  {
    icon: '5',
    title: 'get paid',
    description: 'Receive payment from Prism after your session.',
  },
  {
    icon: '6',
    title: 'come back anytime',
    description:
      'Check the list again whenever you’re ready for your next whitening.',
  },
]

type DentalPartner = {
  name: string
  location: string
  doctor: string
  url: string
  external?: boolean
}

const dentalPartners: DentalPartner[] = [
  {
    name: 'Exquisite Dentistry',
    location: 'Los Angeles, CA',
    doctor: 'Dr. Alexie Aguil',
    url: 'https://exquisitedentistryla.com',
  },
  {
    name: 'Dr. Christopher B. Wong',
    location: 'Palo Alto, CA',
    doctor: 'Dr. Christopher B. Wong',
    url: 'https://www.chriswongdds.com',
  },
  {
    name: 'Family First Smile Care',
    location: 'Los Gatos, CA',
    doctor: 'Dr. Tim J. Chuang',
    url: 'https://famfirstsmile.com',
  },
  {
    name: 'Town Centre Dental',
    location: 'Brentwood, CA',
    doctor: 'Dr. Gerard Banaga',
    url: 'https://www.towncentredental.net',
  },
  {
    name: 'Grace Dental Santa Rosa',
    location: 'Santa Rosa, CA',
    doctor: 'Dr. Tingjen Ji',
    url: 'https://www.tingjenjidds.com',
  },
]

const CONTACT_OPTIONS: Array<{
  value: 'email' | 'text'
  label: string
  hint: string
}> = [
  {
    value: 'email',
    label: 'Email',
    hint: 'Quick replies straight to your inbox.',
  },
  {
    value: 'text',
    label: 'Text message',
    hint: 'Get updates by text, no phone calls.',
  },
]

export default function ModelsPageClient() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [contactMethod, setContactMethod] = useState<'email' | 'text' | ''>('')

  const submitApplication = async (form: HTMLFormElement) => {
    setSubmitError(null)
    setIsSuccess(false)

    const formData = new FormData(form)
    const selectedContactMethod = (
      contactMethod ||
      (formData.get('preferred_contact_method')?.toString() ?? '')
    ).toLowerCase() as 'email' | 'text' | ''

    formData.set('preferred_contact_method', selectedContactMethod)
    formData.set('_subject', 'New Prism models application')
    formData.set('form_name', 'model_application')
    appendFormspreeOpsMetadata(formData, 'models')
    appendAttributionToFormData(formData)

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        form.reset()
        setContactMethod('')
        setSubmitError(null)
        setIsSuccess(true)
        trackFormSubmission('model_application', 'models_form', {
          conversionMode: 'immediate',
          lead_type: 'model_application',
          sendGoogleAdsConversion: false,
        })
        return
      }

      const body = await response.json().catch(() => null)
      const message =
        (body && (body.error || body.message)) ||
        "we couldn't submit your application. please try again or email support@design-prism.com."
      setSubmitError(
        typeof message === 'string'
          ? message.toLowerCase()
          : "we couldn't submit your application. please try again or email support@design-prism.com.",
      )
    } catch (submissionError) {
      console.error('error submitting models application:', submissionError)
      setSubmitError(
        "we couldn't submit your application. please try again or email support@design-prism.com.",
      )
    }
  }

  const {
    getError,
    handleBlur,
    handleInput,
    handleSubmit: handleValidatedSubmit,
    isSubmitting,
  } = useFormValidation({ onValidSubmit: submitApplication })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setSubmitError(null)
    setIsSuccess(false)
    void handleValidatedSubmit(event)
  }

  const handleContactMethodChange = (value: 'email' | 'text') => {
    setContactMethod(value)
    setSubmitError(null)
  }

  const renderError = (name: string) => {
    const error = getError(name)
    if (!error) return null

    return (
      <p
        id={`models-${name}-error`}
        className="text-[0.8125rem] font-medium text-destructive"
        aria-live="polite"
      >
        {error}
      </p>
    )
  }

  const getDescribedBy = (name: string) =>
    getError(name) ? `models-${name}-error` : undefined

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <HeroSection />

        <Section aria-labelledby="models-partners-title" className="py-14 sm:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Partner practices</Eyebrow>
              <h2
                id="models-partners-title"
                className="text-heading mt-4 text-foreground"
              >
                dentists you can model for.
              </h2>
            </div>
          </div>
          <div className="mt-8 -mx-5 [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:mx-0">
            <div
              className="flex gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-1 [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {dentalPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target={partner.external === false ? undefined : '_blank'}
                  rel={
                    partner.external === false
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={
                    partner.external === false
                      ? `view ${partner.name} case study`
                      : `visit ${partner.name} website`
                  }
                  onClick={() =>
                    trackCTAClick('models_dental_partner', partner.name)
                  }
                  className="group/partner block min-w-[240px] shrink-0 rounded-2xl border border-white/[0.08] bg-card p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <div className="space-y-1.5 text-left">
                    <p className="flex items-center justify-between gap-3 text-[0.95rem] font-medium text-foreground">
                      {partner.name}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-subtle transition-colors group-hover/partner:text-foreground"
                      />
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {partner.location}
                    </p>
                    <p className="text-[13px] text-subtle">
                      Lead dentist:{' '}
                      <span className="font-medium text-muted-foreground">
                        {partner.doctor}
                      </span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Section>

        <Section id="offer" aria-labelledby="models-offer-title" className="pt-6 sm:pt-8">
          <SectionHeader
            id="models-offer-title"
            eyebrow="The offer"
            title="why join Prism models."
            align="center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {offerHighlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <Card
                  key={highlight.title}
                  className="flex h-full flex-col p-6 sm:p-8"
                >
                  <span
                    className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-heading mt-6 text-foreground">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-muted-foreground">
                    {highlight.description}
                  </p>
                  {highlight.note ? (
                    <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                      {highlight.note}
                    </p>
                  ) : null}
                </Card>
              )
            })}
          </div>
        </Section>

        <Section id="how-it-works" aria-labelledby="models-how-title">
          <SectionHeader
            id="models-how-title"
            eyebrow="Six steps"
            title="how it works."
            description="We make it simple from start to finish."
            align="center"
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {howItWorks.map((step) => (
              <li key={step.title}>
                <Card className="flex h-full flex-col gap-5 p-6 sm:p-7">
                  <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-sm tabular-nums text-foreground">
                    {step.icon}
                  </span>
                  <div>
                    <h3 className="text-[1.125rem] font-medium tracking-[-0.02em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="group/cta">
              <Link
                href="#apply"
                onClick={() =>
                  trackCTAClick('models_how_it_works_apply', '#apply')
                }
              >
                Apply today
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </Button>
          </div>
        </Section>

        <Section id="apply" aria-labelledby="models-apply-title" className="scroll-mt-20">
          <div className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-12">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="space-y-3 text-center sm:space-y-4">
              <h2
                id="models-apply-title"
                className="text-title text-gradient mx-auto max-w-[14ch] text-balance pb-1"
              >
                ready to be featured?
              </h2>
              <p className="mx-auto max-w-[52ch] text-pretty text-[0.95rem] leading-7 text-muted-foreground sm:text-base">
                Join real people who&apos;ve worked with Prism to create
                authentic, confident, and professional content. No modeling
                agency required.
              </p>
            </div>
            <form
              id="model_application"
              name="model_application"
              className="mt-10 flex flex-col gap-6 sm:mt-12 sm:gap-8"
              action="https://formspree.io/f/mrbyvoqo"
              method="POST"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="_subject"
                value="New Prism models application"
              />
              <input
                type="hidden"
                name="form_name"
                value="model_application"
              />
              <FormspreeOpsFields formKey="models" />
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
                <FormField
                  label="Name"
                  name="name"
                  error={renderError('name')}
                >
                  <Input
                    id="models-name"
                    name="name"
                    placeholder="First and last name"
                    required
                    className="h-12"
                    aria-invalid={Boolean(getError('name'))}
                    aria-describedby={getDescribedBy('name')}
                    onBlur={handleBlur}
                    onInput={handleInput}
                  />
                </FormField>
                <FormField
                  label="City / state"
                  name="location"
                  error={renderError('location')}
                >
                  <Input
                    id="models-location"
                    name="location"
                    placeholder="Los Angeles, CA"
                    required
                    className="h-12"
                    aria-invalid={Boolean(getError('location'))}
                    aria-describedby={getDescribedBy('location')}
                    onBlur={handleBlur}
                    onInput={handleInput}
                  />
                </FormField>
                <div className="sm:col-span-2">
                  <FormField
                    label="Instagram username"
                    name="social"
                    optional
                  >
                    <Input
                      id="models-social"
                      name="social"
                      placeholder="@yourhandle"
                      className="h-12"
                      onBlur={handleBlur}
                      onInput={handleInput}
                    />
                  </FormField>
                </div>
                <div className="sm:col-span-2">
                  <fieldset
                    className="rounded-2xl border border-white/[0.08] bg-background/50 p-5 sm:p-6"
                    aria-invalid={Boolean(
                      getError('preferred_contact_method'),
                    )}
                    aria-describedby={getDescribedBy(
                      'preferred_contact_method',
                    )}
                  >
                    <legend className="px-1 text-sm font-medium text-foreground">
                      Preferred contact method
                    </legend>
                    <p className="mt-1 text-[13px] text-subtle">
                      Choose the best way to reach you.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {CONTACT_OPTIONS.map((option) => {
                        const selected = contactMethod === option.value
                        return (
                          <label
                            key={option.value}
                            className={cn(
                              'flex cursor-pointer flex-col gap-1.5 rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors focus-within:ring-[3px] focus-within:ring-ring/50',
                              selected
                                ? 'border-white/40 bg-white/[0.06] text-foreground'
                                : 'border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20',
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'grid size-5 place-items-center rounded-full border transition-colors',
                                  selected
                                    ? 'border-foreground bg-foreground'
                                    : 'border-white/25',
                                )}
                              >
                                <span
                                  className={cn(
                                    'size-2 rounded-full',
                                    selected ? 'bg-background' : 'bg-transparent',
                                  )}
                                />
                              </span>
                              {option.label}
                            </span>
                            <span className="pl-8 text-[13px] font-normal text-subtle">
                              {option.hint}
                            </span>
                            <input
                              type="radio"
                              name="preferred_contact_method"
                              value={option.value}
                              className="sr-only"
                              checked={selected}
                              onChange={(event) => {
                                handleContactMethodChange(option.value)
                                handleInput(event)
                              }}
                              onBlur={handleBlur}
                              required
                            />
                          </label>
                        )
                      })}
                    </div>
                    {renderError('preferred_contact_method')}
                    <div className="mt-6 space-y-4">
                      {contactMethod === 'email' ? (
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="models-email"
                            className="text-sm font-medium text-foreground"
                          >
                            Email address
                          </label>
                          <Input
                            id="models-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="h-12"
                            required
                            aria-invalid={Boolean(getError('email'))}
                            aria-describedby={getDescribedBy('email')}
                            onBlur={handleBlur}
                            onInput={handleInput}
                          />
                          {renderError('email')}
                        </div>
                      ) : null}
                      {contactMethod === 'text' ? (
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="models-phone"
                            className="text-sm font-medium text-foreground"
                          >
                            Mobile number for texts
                          </label>
                          <Input
                            id="models-phone"
                            type="tel"
                            name="phone"
                            placeholder="(555) 555-5555"
                            autoComplete="tel"
                            inputMode="tel"
                            pattern="(?:\+?1[ .-]?)?(?:\([2-9][0-9]{2}\)|[2-9][0-9]{2})[ .-]?[0-9]{3}[ .-]?[0-9]{4}"
                            className="h-12"
                            required
                            aria-invalid={Boolean(getError('phone'))}
                            aria-describedby={getDescribedBy('phone')}
                            onBlur={handleBlur}
                            onInput={handleInput}
                          />
                          {renderError('phone')}
                          <p className="text-[13px] text-subtle">
                            We only text with shoot updates and reminders.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </fieldset>
                </div>
              </div>
              {submitError ? (
                <p
                  className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-foreground"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}
              {isSuccess ? (
                <p
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-foreground"
                  role="status"
                  aria-live="polite"
                >
                  <span className="prism-live-dot mt-1.5" aria-hidden="true" />
                  Thanks! We&apos;ll reach out soon if we have a shoot
                  opportunity near you.
                </p>
              ) : null}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Button
                  type="submit"
                  size="xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending…' : 'Apply now'}
                  {!isSubmitting ? <ArrowRight aria-hidden="true" /> : null}
                </Button>
                <p className="text-[13px] leading-5 text-subtle sm:max-w-xs">
                  We review all applications and reach out when there&apos;s a
                  great match in your area.
                </p>
              </div>
            </form>
          </div>
        </Section>

        <Section aria-labelledby="models-practices-title" className="pt-0 sm:pt-0">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-white/[0.08] bg-card px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <Eyebrow>For dental practices</Eyebrow>
              <h2
                id="models-practices-title"
                className="text-heading mt-4 max-w-[26ch] text-foreground"
              >
                want custom photo and video content for your marketing?
              </h2>
            </div>
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <Link
                href="/services"
                onClick={() =>
                  trackCTAClick('dental_cta_models_footer', '/services')
                }
              >
                Explore Prism services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Section>

        <Section aria-labelledby="models-closing-title" className="pt-0 sm:pt-4">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-14 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(50%_60%_at_25%_100%,oklch(0.66_0.21_29/22%),transparent_70%),radial-gradient(50%_60%_at_75%_100%,oklch(0.66_0.16_258/24%),transparent_70%)]"
            />
            <div className="flex flex-col items-center">
              <h2
                id="models-closing-title"
                className="text-title text-gradient max-w-[18ch] text-balance pb-1"
              >
                real people. real smiles. real opportunities.
              </h2>
              <p className="mt-4 max-w-[52ch] text-pretty text-[0.95rem] leading-7 text-muted-foreground sm:text-base">
                Join Prism models for free whitening, professional photos, and
                paid creative work that helps dental practices share authentic
                stories.
              </p>
              <Button asChild size="xl" className="mt-8 group/cta">
                <Link
                  href="#apply"
                  onClick={() => trackCTAClick('models_footer_apply', '#apply')}
                >
                  Apply now
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section
      aria-labelledby="models-hero-title"
      className="relative isolate overflow-hidden border-b border-white/[0.08]"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1600/v1761853323/thumbnail_yscklx.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <HeroBackgroundLoop
          videoSrc="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1761852734/models_2_x9gxtj.mp4"
          posterSrc="https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1600/v1761853323/thumbnail_yscklx.webp"
          posterAlt="Models program hero"
          videoClassName="pointer-events-none hidden h-full w-full object-cover sm:block"
          posterClassName="absolute inset-0 h-full w-full object-cover"
          posterUnoptimized
        />
        <div aria-hidden="true" className="absolute inset-0 bg-background/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklch,var(--background)_70%,transparent)_55%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        />
      </div>
      <div className="prism-container flex min-h-[64vh] flex-col justify-center py-20 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>Models program</Eyebrow>
          <h1
            id="models-hero-title"
            className="text-display text-gradient mt-5 max-w-[12ch] text-balance pb-2"
          >
            Prism models.
          </h1>
          <p className="text-lead mt-5 max-w-[40ch] text-pretty text-foreground/85">
            Elite models for cosmetic dental practice ads.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="group/cta">
              <Link
                href="#apply"
                onClick={() => trackCTAClick('models_hero_apply', '#apply')}
              >
                Apply now
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="#how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  children,
  optional,
  error,
}: {
  label: string
  name: string
  children: React.ReactNode
  optional?: boolean
  error?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-2" htmlFor={`models-${name}`}>
        <span className="flex items-center justify-between text-sm font-medium text-foreground">
          {label}
          {optional ? (
            <span className="text-[13px] font-normal normal-case text-subtle">
              optional
            </span>
          ) : null}
        </span>
        {children}
      </label>
      {error}
    </div>
  )
}

"use client"

import { FormEvent, useMemo, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import HeroLoopingVideo from "@/components/HeroLoopingVideo"
import StepIndicator from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { cn } from "@/lib/utils"

const websitePlanFeatures = [
  "Premium analytics tracking across GA4, Tag Manager, Meta Pixel, and more.",
  "SEO + Answer Engine Optimization tuned for local intent.",
  "Speed, accessibility, and mobile optimization baked into every build.",
  "Hosting, maintenance, and proactive updates handled by Prism.",
  "Modern design system plus a performance dashboard you can share with stakeholders.",
]

const websitePlans = [
  {
    name: "starter site",
    pages: "1–5 pages",
    bestFor: "solo founders & local startups",
    price: "$200/mo",
  },
  {
    name: "business site",
    pages: "6–10 pages",
    bestFor: "growing local businesses",
    price: "$500/mo",
  },
  {
    name: "pro site",
    pages: "11+ pages",
    bestFor: "multi-location or complex operations",
    price: "$900/mo",
  },
  {
    name: "no website build",
    pages: "skip Step 1",
    bestFor: "teams only adding upgrades, ads, or content",
    price: "$0/mo",
  },
]

const NO_UPGRADE_VALUE = "no-upgrades"

const foundationalUpgrades = [
  {
    value: "local-listings",
    title: "Local Listings",
    description:
      "Google, Apple Maps, Yelp, Bing setup, NAP consistency, category optimization, review tracking",
    price: "+$100/mo",
  },
  {
    value: "custom-email",
    title: "Custom Email Setup",
    description:
      "Branded email setup via Google Workspace or Outlook (e.g. john@yourdomain.com). Includes full setup, DNS config, and 1–3 inboxes.",
    price: "+$50/mo",
  },
  {
    value: NO_UPGRADE_VALUE,
    title: "No foundational upgrades",
    description: "Stick with the base plan today and add upgrades whenever you need them.",
    price: "$0/mo",
  },
]

const adPackages = [
  {
    name: "starter ads",
    adSpend: "$400",
    total: "$480/mo",
    platforms: "Google or Meta",
  },
  {
    name: "growth ads",
    adSpend: "$1,000",
    total: "$1,200/mo",
    platforms: "Google + Meta",
  },
  {
    name: "scale ads",
    adSpend: "$2,000",
    total: "$2,400/mo",
    platforms: "Google + Meta + TikTok/YouTube",
  },
  {
    name: "dominate ads",
    adSpend: "$3,000",
    total: "$3,600/mo",
    platforms: "Full multi-channel campaigns",
  },
]

const contentTiers = [
  {
    name: "light",
    description: "1–5 monthly pieces (blogs, reels, or emails)",
    price: "+$500/mo",
  },
  {
    name: "pro",
    description: "6–10 monthly assets mixing written and video formats",
    price: "+$1,000/mo",
  },
]

const popularBundles = [
  {
    name: "local starter",
    includes: "Starter Site + Listings",
    price: "$300/mo",
  },
  {
    name: "growth 10",
    includes: "Business Site + Listings + Starter Ads",
    price: "$1,100/mo",
  },
  {
    name: "content pro",
    includes: "Pro Site + Listings + Light Content",
    price: "$1,400/mo",
  },
  {
    name: "dominate local",
    includes: "Pro Site + Listings + Scale Ads + Pro Content",
    price: "$3,600/mo",
  },
]

const summaryPoints = [
  "Everything is monthly recurring — simple, transparent pricing.",
  "Every site ships with speed, SEO, analytics, and AEO as the default.",
  "Prism handles hosting, maintenance, updates, and ad operations in one place.",
  "Add Listings, Ads, or Content whenever you are ready to scale further.",
]

const adPackageOptions = [
  ...adPackages.map((pkg) => ({
    value: pkg.name,
    title: pkg.name,
    adSpend: pkg.adSpend,
    total: pkg.total,
    platforms: pkg.platforms,
  })),
  {
    value: "no-paid-ads",
    title: "No paid ads right now",
    adSpend: "$0",
    total: "$0/mo",
    platforms: "Stay organic — add ads when you are ready.",
  },
]

const contentOptions = [
  ...contentTiers.map((tier) => ({
    value: tier.name,
    title: `${tier.name} content`,
    description: tier.description,
    price: tier.price,
  })),
  {
    value: "no-content",
    title: "No content production",
    description: "Keep internal content for now and add production when you need more momentum.",
    price: "$0/mo",
  },
]

type PlannerMode = "custom" | "bundle"

export default function PricingPageClient() {
  const [mode, setMode] = useState<PlannerMode>("custom")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([])
  const [selectedAdPackage, setSelectedAdPackage] = useState("")
  const [selectedContent, setSelectedContent] = useState("")
  const [selectedBundle, setSelectedBundle] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const modeOptions: { label: string; value: PlannerMode }[] = [
    { label: "custom plan", value: "custom" },
    { label: "ready-made bundle", value: "bundle" },
  ]

const isCustomComplete =
  Boolean(selectedPlan) &&
  selectedUpgrades.length > 0 &&
  Boolean(selectedAdPackage) &&
  Boolean(selectedContent)

  const canSubmit =
    email.trim().length > 0 &&
    ((mode === "custom" && isCustomComplete) || (mode === "bundle" && Boolean(selectedBundle)))

  const summaryLines = useMemo(() => {
    if (mode === "bundle") {
      return [
        {
          label: "bundle",
          value: selectedBundle || "Pick a bundle below",
          complete: Boolean(selectedBundle),
        },
      ]
    }
    return [
      { label: "website plan", value: selectedPlan || "Choose a plan", complete: Boolean(selectedPlan) },
      {
        label: "foundational upgrades",
        value: formatSelectedUpgrades(selectedUpgrades, foundationalUpgrades),
        complete: selectedUpgrades.length > 0,
      },
      {
        label: "ads package",
        value: selectedAdPackage ? formatOptionLabel(selectedAdPackage, adPackageOptions) : "Select an option",
        complete: Boolean(selectedAdPackage),
      },
      {
        label: "content",
        value: selectedContent ? formatOptionLabel(selectedContent, contentOptions) : "Select an option",
        complete: Boolean(selectedContent),
      },
    ]
  }, [mode, selectedPlan, selectedUpgrades, selectedAdPackage, selectedContent, selectedBundle])

  const handleModeChange = (nextMode: PlannerMode) => {
    if (nextMode === mode) return

    setMode(nextMode)
    setError(null)

    if (nextMode === "bundle") {
      setSelectedBundle("")
      setSelectedPlan("")
      setSelectedUpgrades([])
      setSelectedAdPackage("")
      setSelectedContent("")
    } else {
      setSelectedBundle("")
      setSelectedPlan("")
      setSelectedUpgrades([])
      setSelectedAdPackage("")
      setSelectedContent("")
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setError("Enter your email so we can send your plan.")
      return
    }

    if (mode === "custom" && !isCustomComplete) {
      setError("Pick an option for every step to finish your custom plan.")
      return
    }

    if (mode === "bundle" && !selectedBundle) {
      setError("Select a bundle to continue.")
      return
    }

    setError(null)
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        router.push("/pricing/thank-you")
        return
      }

      const responseBody = await response.json().catch(() => null)
      const message =
        (responseBody && (responseBody.error || responseBody.message)) ||
        "We couldn't send your plan. Try again or email support@design-prism.com."
      setError(message)
    } catch (submissionError) {
      console.error("Error submitting pricing plan:", submissionError)
      setError("We couldn't send your plan. Try again or email support@design-prism.com.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 sm:gap-14">
          <HeroLoopingVideo />
          <div className="mx-auto max-w-4xl text-center sm:px-6">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              pricing made simple
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Build your growth engine in a few guided clicks
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              Toggle between a custom mix or pre-built bundle, choose what you need, and send it to Prism instantly. We
              follow up with next steps, onboarding, and timelines tailored to your selections.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="#pricing-builder">
                  start building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/contact">talk with the team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing-builder" className="px-4 pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
              Interactive pricing menu
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1">
              {modeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleModeChange(option.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium lowercase transition",
                    mode === option.value ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  )}
                  aria-pressed={mode === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="mt-10 space-y-10"
            action="https://formspree.io/f/movkzjjp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="plan_type" value={mode} />

            {mode === "custom" ? (
              <>
                <input type="hidden" name="website_plan" value={selectedPlan} />
                <input
                  type="hidden"
                  name="foundational_upgrades"
                  value={formatSelectedUpgrades(selectedUpgrades, foundationalUpgrades)}
                />
                <input type="hidden" name="ads_package" value={formatOptionLabel(selectedAdPackage, adPackageOptions)} />
                <input type="hidden" name="content_package" value={formatOptionLabel(selectedContent, contentOptions)} />

                <CustomPlanner
                  selectedPlan={selectedPlan}
                  onSelectPlan={(value) => {
                    setSelectedPlan(value)
                    setError(null)
                  }}
                  selectedUpgrades={selectedUpgrades}
                  onToggleUpgrade={(value) => {
                    setSelectedUpgrades((prev) => {
                      if (value === NO_UPGRADE_VALUE) {
                        return prev.includes(value) ? [] : [NO_UPGRADE_VALUE]
                      }

                      const withoutNone = prev.filter((item) => item !== NO_UPGRADE_VALUE)
                      if (withoutNone.includes(value)) {
                        return withoutNone.filter((item) => item !== value)
                      }
                      return [...withoutNone, value]
                    })
                    setError(null)
                  }}
                  selectedAdPackage={selectedAdPackage}
                  onSelectAdPackage={(value) => {
                    setSelectedAdPackage(value)
                    setError(null)
                  }}
                  selectedContent={selectedContent}
                  onSelectContent={(value) => {
                    setSelectedContent(value)
                    setError(null)
                  }}
                />
              </>
            ) : (
              <>
                <input type="hidden" name="bundle_choice" value={selectedBundle} />
                <BundlePicker
                  selectedBundle={selectedBundle}
                  onSelectBundle={(value) => {
                    setSelectedBundle(value)
                    setError(null)
                  }}
                />
              </>
            )}

            <PlanSummary summaryLines={summaryLines} mode={mode} />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="pricing-email" className="text-sm font-medium text-neutral-800">
                  Email (required)
                </label>
                <Input
                  id="pricing-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError(null)
                  }}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="pricing-notes" className="text-sm font-medium text-neutral-800">
                  Notes or context 
                </label>
                <textarea
                  id="pricing-notes"
                  name="notes"
                  rows={4}
                  placeholder="Share goals, timelines, or anything we should know."
                  className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "sending..." : "send my plan"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/get-started?intent=pricing">{FREE_AUDIT_CTA_TEXT}</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
            what every prism subscription delivers
          </h2>
          <p className="mt-4 text-neutral-600">
            Whether you build a custom stack or choose a bundle, you get the same conversion-focused foundation.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
          <ul className="grid gap-4 sm:grid-cols-2">
            {websitePlanFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">why teams pick prism</h2>
          <ul className="mt-6 space-y-4 text-left text-sm text-neutral-600">
            {summaryPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/get-started?intent=pricing">
                start your plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/wall-of-love">Open wall of love</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

function formatSelectedUpgrades(
  values: string[],
  options: { value: string; title: string; price: string }[]
) {
  if (!values.length) return "No foundational upgrades selected"
  if (values.includes(NO_UPGRADE_VALUE)) return "No foundational upgrades"
  return values
    .map((value) => {
      const match = options.find((option) => option.value === value)
      if (!match) return value
      return `${match.title} – ${match.price}`
    })
    .join(", ")
}

function formatOptionLabel<T extends { value: string; title?: string; adSpend?: string; total?: string; platforms?: string; description?: string; price?: string }>(
  value: string,
  options: T[]
) {
  if (!value) return ""
  const match = options.find((option) => option.value === value)
  if (!match) return value
  if ("title" in match && match.title) {
    if ("total" in match && match.total) {
      return `${match.title} – ${match.total}`
    }
    if ("price" in match && match.price) {
      return `${match.title} – ${match.price}`
    }
    return match.title
  }
  return value
}

type CustomPlannerProps = {
  selectedPlan: string
  onSelectPlan: (value: string) => void
  selectedUpgrades: string[]
  onToggleUpgrade: (value: string) => void
  selectedAdPackage: string
  onSelectAdPackage: (value: string) => void
  selectedContent: string
  onSelectContent: (value: string) => void
}

function CustomPlanner({
  selectedPlan,
  onSelectPlan,
  selectedUpgrades,
  onToggleUpgrade,
  selectedAdPackage,
  onSelectAdPackage,
  selectedContent,
  onSelectContent,
}: CustomPlannerProps) {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <StepHeader
          step={1}
          title="Pick your website plan"
          description="Choose the base subscription that matches your current scope. Every plan is fully managed and built to convert."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {websitePlans.map((plan) => {
            const isActive = selectedPlan === plan.name
            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => onSelectPlan(plan.name)}
                className={cardClasses(isActive)}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold lowercase text-inherit">{plan.name}</p>
                    <p className="mt-2 text-sm uppercase tracking-wide text-neutral-400">{plan.pages}</p>
                  </div>
                  <span className="text-lg font-semibold text-inherit">{plan.price}</span>
                </div>
                <p className="mt-4 text-sm text-neutral-500">
                  Best for {plan.bestFor}
                </p>
              </button>
            )
          })}
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-base font-semibold text-neutral-900">Every website plan includes</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {websitePlanFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-neutral-600">
                <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

            <div className="space-y-6">
              <StepHeader
                step={2}
                title="Step 2 — Add foundational upgrades "
                description="Layer in essential infrastructure now or add it later — everything stays flexible and month-to-month."
              />
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:grid-cols-[1.3fr,2fr,0.8fr]">
            <span>Add-On</span>
            <span>Description</span>
            <span className="sm:text-right">Monthly</span>
          </div>
          <div className="divide-y divide-neutral-200">
          {foundationalUpgrades.map((upgrade) => {
            const isActive = selectedUpgrades.includes(upgrade.value)
            return (
              <button
                key={upgrade.value}
                type="button"
                onClick={() => onToggleUpgrade(upgrade.value)}
                className={cn(
                  "grid w-full gap-4 px-5 py-5 text-left transition sm:grid-cols-[1.3fr,2fr,0.8fr]",
                  isActive
                    ? "bg-neutral-900 text-white shadow-inner"
                    : "bg-white text-neutral-900 hover:bg-neutral-50"
                )}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold lowercase">{upgrade.title}</span>
                  {isActive ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
                </div>
                <span className={cn("text-sm", isActive ? "text-neutral-200" : "text-neutral-600")}>
                  {upgrade.description}
                </span>
                <span
                  className={cn(
                    "text-base font-semibold sm:text-right",
                    isActive ? "text-white" : "text-neutral-900"
                  )}
                >
                  {upgrade.price}
                </span>
              </button>
            )
          })}
          </div>
        </div>
        <p className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-5 py-4 text-sm text-neutral-600">
          Example: Starter Site + Listings + Custom Email = $350/mo
        </p>
      </div>

      <div className="space-y-6">
        <StepHeader
          step={3}
          title="Choose your ad package"
          description="All ad spend flows through Prism — one monthly price that combines media budget plus our 20% management fee."
        />
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
          Increase or decrease spend anytime — the management fee scales automatically.
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {adPackageOptions.map((option) => {
            const isActive = selectedAdPackage === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelectAdPackage(option.value)}
                className={cardClasses(isActive)}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-lg font-semibold text-inherit capitalize">{option.title}</p>
                  <span className="text-lg font-semibold text-inherit">{option.total}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-500">
                  Ad spend {option.adSpend}
                </p>
                <p className="mt-2 text-sm text-neutral-500">{option.platforms}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        <StepHeader
          step={4}
          title="Add content creation "
          description="Layer in recurring written and video content handled by the same team shipping your site and ads."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {contentOptions.map((option) => {
            const isActive = selectedContent === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelectContent(option.value)}
                className={cardClasses(isActive)}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-lg font-semibold text-inherit capitalize">{option.title}</p>
                  <span className="text-lg font-semibold text-inherit">{option.price}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-500">{option.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type BundlePickerProps = {
  selectedBundle: string
  onSelectBundle: (value: string) => void
}

function BundlePicker({ selectedBundle, onSelectBundle }: BundlePickerProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-600">
        Quick wins, zero guesswork. Each bundle layers the right mix of web, listings, ads, and content so you can move fast.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {popularBundles.map((bundle) => {
          const isActive = selectedBundle === bundle.name
          const extraClasses = isActive
            ? "text-left backdrop-blur-sm"
            : "text-left bg-white/80 border-neutral-200 backdrop-blur-sm"
          return (
            <button
              key={bundle.name}
              type="button"
              onClick={() => onSelectBundle(bundle.name)}
              className={cardClasses(isActive, extraClasses)}
              aria-pressed={isActive}
            >
              <p className="text-xs uppercase tracking-wide text-neutral-400">bundle</p>
              <div className="mt-2 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold capitalize text-inherit">{bundle.name}</h3>
                <span className="text-lg font-semibold text-inherit">{bundle.price}</span>
              </div>
              <p className="mt-3 text-sm text-neutral-500">{bundle.includes}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

type PlanSummaryProps = {
  summaryLines: { label: string; value: string; complete: boolean }[]
  mode: PlannerMode
}

function PlanSummary({ summaryLines, mode }: PlanSummaryProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-white">
      <p className="text-sm uppercase tracking-wide text-neutral-300">{mode === "custom" ? "custom plan recap" : "bundle recap"}</p>
      <h3 className="mt-2 text-2xl font-semibold lowercase">
        {mode === "custom" ? "your selected stack" : "your selected bundle"}
      </h3>
      <ul className="mt-6 space-y-3">
        {summaryLines.map((line) => (
          <li key={line.label} className="flex items-start gap-3 text-sm">
            <Check
              className={cn(
                "mt-[2px] h-4 w-4 flex-shrink-0",
                line.complete ? "text-green-400" : "text-neutral-500"
              )}
            />
            <div>
              <span className="text-neutral-300">{line.label}:</span>{" "}
              <span className={cn("font-medium", line.complete ? "text-white" : "text-neutral-400")}>{line.value}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs uppercase tracking-wide text-neutral-400">
        You can adjust any selection with your account manager during onboarding.
      </p>
    </div>
  )
}

type StepHeaderProps = {
  step: number
  title: string
  description: string
}

function StepHeader({ step, title, description }: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <StepIndicator number={step} variant="gradient" className="shrink-0" />
      <div>
        <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">{title}</h3>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base">{description}</p>
      </div>
    </div>
  )
}

function cardClasses(isActive: boolean, extra?: string) {
  return cn(
    "w-full rounded-2xl border p-6 text-left transition hover:border-neutral-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
    isActive
      ? "border-neutral-900 bg-neutral-900 text-white shadow-lg"
      : "border-neutral-200 bg-white text-neutral-900",
    extra
  )
}

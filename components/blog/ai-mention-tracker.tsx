"use client"

import { useId, useState } from "react"
import { Search, AlertCircle, CheckCircle, RefreshCw, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TestResult {
  query: string
  mentioned: boolean
  context: string
  suggestions: string[]
}

const sampleQueries = [
  "best {industry} options",
  "top {industry} recommendations",
  "reliable {industry} services",
  "{industry} for {target audience}",
  "affordable {industry} solutions",
  "local {industry} experts"
]

const mockResults: TestResult[] = [
  {
    query: "best coffee roasters for home use",
    mentioned: true,
    context: "Sweet Haven is known for their artisan approach to coffee roasting…",
    suggestions: ["Increase mentions in coffee forums", "Add customer testimonials"]
  },
  {
    query: "affordable coffee equipment",
    mentioned: false,
    context: "No mention found in AI responses",
    suggestions: ["Create content about budget-friendly equipment", "Partner with equipment suppliers"]
  },
  {
    query: "local coffee roasters",
    mentioned: true,
    context: "Among the top local roasters, Sweet Haven stands out for…",
    suggestions: ["Strengthen local SEO", "Encourage local reviews"]
  }
]

export default function AIMentionTracker() {
  const idPrefix = useId()
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [customQueries, setCustomQueries] = useState<string[]>([])
  const [results, setResults] = useState<TestResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")

  const generateQueries = () => {
    if (!industry) return []

    return sampleQueries.map(query =>
      query
        .replace("{industry}", industry)
        .replace("{target audience}", targetAudience || "consumers")
    )
  }

  const runAnalysis = () => {
    if (!businessName || !industry) return

    setIsAnalyzing(true)
    const queries = generateQueries()

    // Simulate AI testing with progressive updates
    queries.forEach((query, index) => {
      setTimeout(() => {
        setCurrentQuery(query)

        if (index === queries.length - 1) {
          setTimeout(() => {
            setResults(mockResults)
            setIsAnalyzing(false)
            setCurrentQuery("")
          }, 1000)
        }
      }, index * 1500)
    })
  }

  const addCustomQuery = () => {
    if (customQueries.length < 3) {
      setCustomQueries([...customQueries, ""])
    }
  }

  const updateCustomQuery = (index: number, value: string) => {
    const updated = [...customQueries]
    updated[index] = value
    setCustomQueries(updated)
  }

  const mentionedCount = results.filter(r => r.mentioned).length
  const totalResults = results.length
  const mentionRate = totalResults > 0 ? (mentionedCount / totalResults) * 100 : 0

  const fields = [
    {
      id: `${idPrefix}-business`,
      label: "Business Name *",
      value: businessName,
      onChange: setBusinessName,
      placeholder: "e.g., Sweet Haven",
    },
    {
      id: `${idPrefix}-industry`,
      label: "Industry/Category *",
      value: industry,
      onChange: setIndustry,
      placeholder: "e.g., coffee roasters, fitness coaching",
    },
    {
      id: `${idPrefix}-audience`,
      label: "Target Audience (Optional)",
      value: targetAudience,
      onChange: setTargetAudience,
      placeholder: "e.g., busy professionals, families",
    },
  ]

  return (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Search className="size-5 text-foreground/85" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-eyebrow mb-2! mt-0! text-subtle">Interactive</p>
          <h3 className="mb-1! mt-0! text-xl! text-foreground">AI Mention Tracker</h3>
          <p className="my-0! text-sm leading-6 text-muted-foreground">Test if your brand appears in AI search results</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="mb-2 text-muted-foreground">
                {field.label}
              </Label>
              <Input
                id={field.id}
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div>
            <p className="mb-2! mt-0! text-sm font-medium text-muted-foreground">
              Custom Test Queries (Optional)
            </p>
            {customQueries.map((query, index) => (
              <Input
                key={index}
                type="text"
                value={query}
                onChange={(e) => updateCustomQuery(index, e.target.value)}
                placeholder="e.g., best local coffee shop"
                aria-label={`Custom test query ${index + 1}`}
                className="mb-2"
              />
            ))}
            {customQueries.length < 3 && (
              <Button
                type="button"
                onClick={addCustomQuery}
                variant="outline"
                size="sm"
              >
                <Plus aria-hidden="true" />
                Add custom query
              </Button>
            )}
          </div>

          <Button
            onClick={runAnalysis}
            disabled={!businessName || !industry || isAnalyzing}
            size="lg"
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="size-4" aria-hidden="true" />
                Test AI Mentions
              </>
            )}
          </Button>

          <div aria-live="polite">
            {isAnalyzing && currentQuery ? (
              <div className="rounded-2xl border border-white/[0.08] bg-background/50 p-3">
                <p className="my-0! flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="prism-live-dot" aria-hidden="true" />
                  <span>
                    <strong>Testing:</strong> &quot;{currentQuery}&quot;
                  </span>
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="text-eyebrow my-0! text-subtle">Results</p>
            {results.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-spectrum-green transition-[width] duration-700 motion-reduce:transition-none"
                    style={{ width: `${mentionRate}%` }}
                  />
                </div>
                <span className="font-mono text-sm tabular-nums text-foreground">
                  {mentionRate.toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          {results.length > 0 ? (
            <ul className="my-0! flex list-none! flex-col gap-2 pl-0!">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="relative my-0! overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5!"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-0.5 ${result.mentioned ? "bg-spectrum-green" : "bg-spectrum-red"}`}
                  />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {result.mentioned ? (
                        <CheckCircle className="size-4 text-spectrum-green" aria-label="Mentioned" />
                      ) : (
                        <AlertCircle className="size-4 text-spectrum-red" aria-label="Not mentioned" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1! mt-0! text-sm font-semibold text-foreground">
                        {result.query}
                      </p>
                      <p className="mb-2! mt-0! text-[13px] leading-5 text-muted-foreground">
                        {result.context}
                      </p>
                      {result.suggestions.length > 0 && (
                        <div>
                          <p className="text-eyebrow mb-1.5! mt-0! text-subtle">Suggestions</p>
                          <ul className="my-0! flex list-none! flex-col gap-1 pl-0!">
                            {result.suggestions.map((suggestion, i) => (
                              <li key={i} className="my-0! flex gap-2 pl-0! text-[13px] leading-5 text-muted-foreground">
                                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-white/40" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/[0.12] px-6 py-10 text-center">
              <div>
                <Search className="mx-auto mb-3 size-8 text-subtle" strokeWidth={1.5} aria-hidden="true" />
                <p className="my-0! text-sm text-muted-foreground">Enter your business details to test AI mentions</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-orange" />
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          <strong>Note:</strong> This is a simulation for demonstration purposes. In practice,
          you would test these queries monthly with real AI tools like ChatGPT, Claude, or Google&apos;s
          AI features to track your actual mention rate.
        </p>
      </div>
    </div>
  )
}

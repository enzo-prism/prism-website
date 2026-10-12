"use client"

import React, { useId, useState } from "react"
import {
  Play,
  RotateCcw,
  Share2,
  Copy,
  Check,
  Sparkles,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface MobileInteractiveWidgetProps {
  title: string
  description: string
  type?: "quiz" | "calculator" | "generator" | "tracker" | "simulator"
  className?: string
}

const TYPE_ICON = {
  quiz: Target,
  calculator: TrendingUp,
  generator: Lightbulb,
} as const

export function MobileInteractiveWidget({
  title,
  description,
  type = "quiz",
  className = ""
}: MobileInteractiveWidgetProps) {
  const inputId = useId()
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentStep(0)
    setResults([])
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const TypeIcon = type in TYPE_ICON ? TYPE_ICON[type as keyof typeof TYPE_ICON] : null

  const stage = (heading: string, caption: string) => (
    <div className="text-center">
      <p className="mb-2! mt-0! text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
        {heading}
      </p>
      <p className="my-0! text-sm text-muted-foreground">{caption}</p>
    </div>
  )

  const panel = (children: React.ReactNode) => (
    <div className="rounded-2xl border border-white/[0.08] bg-background/50 p-4">{children}</div>
  )

  // Widget type specific content
  const getWidgetContent = () => {
    switch (type) {
      case "quiz":
        return (
          <div className="space-y-4">
            {stage(
              isActive ? `Step ${currentStep + 1}/3` : "Take Quiz",
              isActive ? "Answer the questions to get personalized recommendations" : "Test your knowledge",
            )}

            {isActive &&
              panel(
                <>
                  <p className="mb-3! mt-0! text-base font-medium text-foreground">
                    What&apos;s your primary business goal?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {["Increase Traffic", "Generate Leads", "Build Brand Awareness"].map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="h-auto min-h-11 justify-start rounded-xl px-4 py-3 text-left"
                        onClick={() => {
                          setResults([...results, option])
                          setCurrentStep(currentStep + 1)
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </>,
              )}
          </div>
        )

      case "calculator":
        return (
          <div className="space-y-4">
            {stage(isActive ? "Calculate" : "AI Impact Calculator", "Estimate your traffic loss from AI search")}

            {isActive &&
              panel(
                <>
                  <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-muted-foreground">
                    Monthly Website Traffic
                  </label>
                  <Input id={inputId} type="number" placeholder="e.g., 10000" />
                </>,
              )}
          </div>
        )

      case "generator":
        return (
          <div className="space-y-4">
            {stage(isActive ? "Generate" : "Tagline Generator", "Create AI-friendly brand taglines")}

            {isActive &&
              panel(
                <>
                  <Input
                    placeholder="Enter your business type…"
                    aria-label="Business type"
                    className="mb-3"
                  />
                  <Button className="w-full">
                    <Sparkles className="size-4" aria-hidden="true" />
                    Generate Taglines
                  </Button>
                </>,
              )}
          </div>
        )

      default:
        return stage("Interactive Tool", "Tap to get started")
    }
  }

  return (
    <div
      className={cn(
        "relative my-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8",
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="mb-2! mt-0! text-xl! text-foreground">{title}</h3>
          <p className="my-0! text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline">Interactive</Badge>
          {TypeIcon ? <TypeIcon className="size-4 text-subtle" aria-hidden="true" /> : null}
        </div>
      </div>

      {/* Widget content */}
      <div className="mb-6">{getWidgetContent()}</div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {!isActive ? (
          <Button onClick={handleStart} size="lg">
            <Play className="size-4" aria-hidden="true" />
            Start Tool
          </Button>
        ) : (
          <>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset
            </Button>

            {results.length > 0 && (
              <>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>

                <Button variant="outline" size="sm">
                  <Share2 className="size-4" aria-hidden="true" />
                  Share
                </Button>
              </>
            )}
          </>
        )}
      </div>

      {/* Progress indicator */}
      {isActive && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/[0.08]">
          <div
            className="bg-spectrum h-full transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type InteractiveChecklistProps = {
  items: string[]
  className?: string
  storageKey?: string
}

export default function InteractiveChecklist({
  items,
  className,
  storageKey = "interactive-checklist",
}: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  const serializedItems = JSON.stringify(items)

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) {
        setChecked(items.map(() => false))
        return
      }
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecked(parsed.map((value: boolean) => Boolean(value)))
      } else {
        setChecked(items.map(() => false))
      }
    } catch {
      setChecked(items.map(() => false))
    }
  }, [items.length, storageKey, serializedItems])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {
      // Storage can be unavailable (private mode); the checklist still works.
    }
  }, [checked, storageKey])

  const completedCount = useMemo(() => checked.filter(Boolean).length, [checked])
  const progressLabel = `${completedCount}/${items.length} Completed`
  const progress = items.length ? (completedCount / items.length) * 100 : 0

  const toggleItem = (index: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const reset = () => {
    setChecked(items.map(() => false))
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/[0.08] bg-card", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <p className="shrink-0 font-mono text-[12px] text-foreground">{progressLabel}</p>
          <div className="h-1 max-w-48 flex-1 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
            <div
              className="h-full rounded-full bg-foreground transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={reset} disabled={completedCount === 0}>
          Reset
        </Button>
      </div>
      <span className="sr-only" aria-live="polite">
        {progressLabel}
      </span>
      <ul className="divide-y divide-white/[0.06]">
        {items.map((item, index) => {
          const isChecked = checked[index] ?? false
          return (
            <li key={item}>
              <label
                htmlFor={`checklist-item-${index}`}
                className="flex min-h-14 cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] has-[:focus-visible]:bg-white/[0.03] sm:px-6"
              >
                <input
                  id={`checklist-item-${index}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(index)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50",
                    isChecked
                      ? "border-foreground bg-foreground text-background"
                      : "border-white/20 bg-white/[0.03] text-transparent",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span
                  className={cn(
                    "text-[15px] leading-6 transition-colors",
                    isChecked ? "text-subtle line-through decoration-white/20" : "text-foreground/90",
                  )}
                >
                  {item}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

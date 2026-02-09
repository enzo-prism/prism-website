"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import clsx from "clsx"

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
    window.localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked, storageKey])

  const completedCount = useMemo(() => checked.filter(Boolean).length, [checked])
  const progressLabel = `${completedCount}/${items.length} Completed`

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
    <div className={clsx("rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-neutral-900">{progressLabel}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={completedCount === 0}
        >
          Reset
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {progressLabel}
      </span>
      <ul className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="rounded-2xl border border-neutral-200 bg-white/70 p-4 transition hover:border-neutral-300">
            <label htmlFor={`checklist-item-${index}`} className="flex cursor-pointer items-start gap-3">
              <input
                id={`checklist-item-${index}`}
                type="checkbox"
                checked={checked[index] ?? false}
                onChange={() => toggleItem(index)}
                className="mt-1 h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-ring"
              />
              <span className="flex flex-1 items-start gap-3 text-sm text-neutral-700">
                <span
                  className={clsx(
                    "mt-0.5 rounded-full border p-1.5 transition",
                    checked[index]
                      ? "border-emerald-500 bg-emerald-100 text-emerald-600"
                      : "border-neutral-300 bg-neutral-100 text-neutral-400",
                  )}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{item}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

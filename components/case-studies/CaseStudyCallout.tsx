"use client"

import * as React from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type CaseStudyCalloutProps = {
  title?: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function CaseStudyCallout({
  title = "note",
  children,
  className,
  icon,
}: CaseStudyCalloutProps) {
  return (
    <Alert className={cn("rounded-2xl border-neutral-200 bg-neutral-50 text-neutral-900", className)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-neutral-700">{icon ?? <Info className="h-4 w-4" />}</div>
        <div className="grid gap-1">
          <AlertTitle className="lowercase">{title}</AlertTitle>
          <AlertDescription className="text-neutral-700 lowercase">{children}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}


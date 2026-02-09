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
    <Alert className={cn("rounded-md border-border/60 bg-card/30 text-foreground backdrop-blur-sm", className)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-muted-foreground">{icon ?? <Info className="h-4 w-4" />}</div>
        <div className="grid gap-1">
          <AlertTitle className="text-[10px] font-semibold uppercase tracking-[0.22em] font-pixel text-foreground">
            {title}
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">{children}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}

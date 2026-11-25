import * as React from 'react'
import type { ReactNode } from 'react'

type ViewTransitionProps = {
  name: string
  share?: string
  default?: string
  children: ReactNode
}

/*
 * React's <ViewTransition> ships in the React canary that the App Router
 * bundles (19.3), not in the 19.2 stable package that tests run on. Read it
 * off the namespace so a missing export falls back to rendering the child
 * as is: no transition, same markup.
 */
const ViewTransition = (
  React as unknown as {
    ViewTransition?: React.ComponentType<ViewTransitionProps>
  }
).ViewTransition

/**
 * Names one element so it morphs into its twin on the next route (a service
 * band growing from its homepage tile into the service hero). `default="none"`
 * keeps it out of unrelated transitions; reduced motion is handled in
 * globals.css.
 */
export function BandTransition({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  if (!ViewTransition) return <>{children}</>
  return (
    <ViewTransition name={name} share="band" default="none">
      {children}
    </ViewTransition>
  )
}

export default BandTransition

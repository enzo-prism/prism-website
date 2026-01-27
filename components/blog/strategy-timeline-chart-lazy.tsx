"use client"

import dynamic from "next/dynamic"

const StrategyTimelineChart = dynamic(() => import("./strategy-timeline-chart"), {
  loading: () => (
    <div className="mb-8 w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="h-6 w-56 animate-pulse rounded bg-neutral-100" />
      <div className="mt-3 h-4 w-72 animate-pulse rounded bg-neutral-100" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-16 w-full animate-pulse rounded-md bg-neutral-100" />
        ))}
      </div>
    </div>
  ),
})

export { StrategyTimelineChart }
export default StrategyTimelineChart

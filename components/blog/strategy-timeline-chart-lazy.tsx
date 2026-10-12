"use client"

import dynamic from "next/dynamic"

const StrategyTimelineChart = dynamic(() => import("./strategy-timeline-chart"), {
  loading: () => (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 sm:p-8">
      <div className="h-6 w-56 animate-pulse motion-reduce:animate-none rounded-md bg-white/[0.06]" />
      <div className="mt-3 h-4 max-w-72 w-full animate-pulse motion-reduce:animate-none rounded-md bg-white/[0.06]" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-16 w-full animate-pulse motion-reduce:animate-none rounded-2xl bg-white/[0.05]" />
        ))}
      </div>
    </div>
  ),
})

export { StrategyTimelineChart }
export default StrategyTimelineChart

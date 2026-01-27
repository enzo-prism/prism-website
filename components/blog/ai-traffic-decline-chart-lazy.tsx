"use client"

import dynamic from "next/dynamic"

const AITrafficDeclineChart = dynamic(() => import("./ai-traffic-decline-chart"), {
  loading: () => (
    <div className="mb-8 w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="h-6 w-48 animate-pulse rounded bg-neutral-100" />
      <div className="mt-3 h-4 w-80 animate-pulse rounded bg-neutral-100" />
      <div className="mt-6 h-64 w-full animate-pulse rounded-md bg-neutral-100" />
    </div>
  ),
})

export { AITrafficDeclineChart }
export default AITrafficDeclineChart

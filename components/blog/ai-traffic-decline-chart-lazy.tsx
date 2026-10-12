"use client"

import dynamic from "next/dynamic"

const AITrafficDeclineChart = dynamic(() => import("./ai-traffic-decline-chart"), {
  loading: () => (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 sm:p-8">
      <div className="h-6 w-48 animate-pulse motion-reduce:animate-none rounded-md bg-white/[0.06]" />
      <div className="mt-3 h-4 max-w-80 w-full animate-pulse motion-reduce:animate-none rounded-md bg-white/[0.06]" />
      <div className="mt-6 h-64 w-full animate-pulse motion-reduce:animate-none rounded-2xl bg-white/[0.05]" />
    </div>
  ),
})

export { AITrafficDeclineChart }
export default AITrafficDeclineChart

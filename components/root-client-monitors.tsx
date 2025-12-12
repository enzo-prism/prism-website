"use client"

import dynamic from "next/dynamic"

const ScrollManager = dynamic(() => import("@/components/scroll-manager"), { ssr: false })
const PerformanceMonitor = dynamic(() => import("@/components/performance-monitor"), { ssr: false })
const MCPHealthMonitor =
  process.env.NODE_ENV !== "production"
    ? dynamic(() => import("@/components/mcp-health-monitor"), { ssr: false })
    : () => null

export default function RootClientMonitors() {
  return (
    <>
      <ScrollManager />
      <MCPHealthMonitor />
      <PerformanceMonitor />
    </>
  )
}


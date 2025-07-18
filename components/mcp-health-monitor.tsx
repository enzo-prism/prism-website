"use client"

import { useEffect, useState } from "react"
import { checkAllMCPServersHealth, startMCPHealthMonitoring, type MCPHealthStatus } from "@/utils/mcp-health"
import { addBreadcrumb, isSentryInitialized } from "@/utils/sentry-helpers"

interface MCPHealthMonitorProps {
  enablePeriodicChecks?: boolean
  checkIntervalMinutes?: number
}

export default function MCPHealthMonitor({ 
  enablePeriodicChecks = true, 
  checkIntervalMinutes = 5 
}: MCPHealthMonitorProps) {
  const [healthStatus, setHealthStatus] = useState<MCPHealthStatus | null>(null)
  
  useEffect(() => {
    // Perform initial health check
    const performInitialCheck = async () => {
      try {
        const status = await checkAllMCPServersHealth()
        setHealthStatus(status)
        
        if (isSentryInitialized()) {
          addBreadcrumb(
            "Initial MCP health check completed",
            "system",
            "info",
            {
              overallStatus: status.overallStatus,
              serverCount: status.servers.length,
            }
          )
        }
      } catch (error) {
        console.error("Failed to perform initial MCP health check:", error)
      }
    }
    
    performInitialCheck()
    
    // Start periodic monitoring if enabled
    let cleanup: (() => void) | undefined
    if (enablePeriodicChecks) {
      cleanup = startMCPHealthMonitoring(checkIntervalMinutes)
    }
    
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [enablePeriodicChecks, checkIntervalMinutes])
  
  // This component doesn't render anything visible
  // It's purely for monitoring and reporting to Sentry
  return null
}
"use client"

import { captureErrorWithContext, addBreadcrumb, isSentryInitialized } from "./sentry-helpers"

export interface MCPServer {
  name: string
  endpoint: string
  status: "online" | "offline" | "error"
  lastChecked: Date
  responseTime?: number
  version?: string
}

export interface MCPHealthStatus {
  servers: MCPServer[]
  overallStatus: "healthy" | "degraded" | "critical"
  lastHealthCheck: Date
}

/**
 * Check the health of individual MCP servers
 */
export async function checkMCPServerHealth(serverName: string, endpoint: string): Promise<MCPServer> {
  const startTime = Date.now()
  
  try {
    // For client-side health checks, we'll simulate the check
    // In a real implementation, this would make HTTP requests to health endpoints
    const response = await fetch(endpoint, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    
    const responseTime = Date.now() - startTime
    
    if (response.ok) {
      if (isSentryInitialized()) {
        addBreadcrumb(
          `MCP server ${serverName} health check passed`,
          "http",
          "info",
          {
            server: serverName,
            responseTime,
            status: response.status,
          }
        )
      }
      
      return {
        name: serverName,
        endpoint,
        status: "online",
        lastChecked: new Date(),
        responseTime,
        version: response.headers.get('X-Version') || undefined,
      }
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    if (isSentryInitialized()) {
      captureErrorWithContext(error instanceof Error ? error : new Error(String(error)), {
        errorType: 'mcp_health_check_failure',
        component: 'MCPHealthMonitor',
        additionalData: {
          serverName,
          endpoint,
          responseTime,
          checkType: 'health_check',
        },
      })
    }
    
    return {
      name: serverName,
      endpoint,
      status: "error",
      lastChecked: new Date(),
      responseTime,
    }
  }
}

/**
 * Check the health of all configured MCP servers
 */
export async function checkAllMCPServersHealth(): Promise<MCPHealthStatus> {
  // Define the MCP servers based on the project configuration
  const mcpServers = [
    {
      name: "GitHub",
      endpoint: "https://api.github.com", // Using GitHub API as proxy for MCP server health
    },
    {
      name: "Supabase", 
      endpoint: "https://ibjqwvkcjdgdifujfnpb.supabase.co/rest/v1/", // Project-specific endpoint
    },
    {
      name: "Figma",
      endpoint: "http://localhost:3845", // Local Figma MCP server
    },
  ]

  const startTime = Date.now()
  
  try {
    // Check all servers in parallel
    const serverChecks = await Promise.allSettled(
      mcpServers.map(server => 
        checkMCPServerHealth(server.name, server.endpoint)
      )
    )
    
    const servers: MCPServer[] = serverChecks.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        // Handle rejected promises
        if (isSentryInitialized()) {
          captureErrorWithContext(result.reason, {
            errorType: 'mcp_health_check_promise_rejection',
            component: 'MCPHealthMonitor',
            additionalData: {
              serverName: mcpServers[index].name,
              endpoint: mcpServers[index].endpoint,
            },
          })
        }
        
        return {
          name: mcpServers[index].name,
          endpoint: mcpServers[index].endpoint,
          status: "error" as const,
          lastChecked: new Date(),
        }
      }
    })
    
    // Determine overall status
    const onlineServers = servers.filter(s => s.status === "online").length
    const totalServers = servers.length
    
    let overallStatus: "healthy" | "degraded" | "critical"
    if (onlineServers === totalServers) {
      overallStatus = "healthy"
    } else if (onlineServers > 0) {
      overallStatus = "degraded"
    } else {
      overallStatus = "critical"
    }
    
    const healthStatus: MCPHealthStatus = {
      servers,
      overallStatus,
      lastHealthCheck: new Date(),
    }
    
    // Log to Sentry for monitoring
    if (isSentryInitialized()) {
      addBreadcrumb(
        `MCP health check completed: ${overallStatus}`,
        "system",
        overallStatus === "healthy" ? "info" : "warning",
        {
          overallStatus,
          onlineServers,
          totalServers,
          checkDuration: Date.now() - startTime,
          servers: servers.map(s => ({
            name: s.name,
            status: s.status,
            responseTime: s.responseTime,
          })),
        }
      )
      
      // Capture critical issues
      if (overallStatus === "critical") {
        captureErrorWithContext("All MCP servers are offline", {
          errorType: 'mcp_critical_failure',
          component: 'MCPHealthMonitor',
          additionalData: {
            servers,
            checkDuration: Date.now() - startTime,
          },
        })
      }
    }
    
    return healthStatus
    
  } catch (error) {
    if (isSentryInitialized()) {
      captureErrorWithContext(error instanceof Error ? error : new Error(String(error)), {
        errorType: 'mcp_health_check_system_failure',
        component: 'MCPHealthMonitor',
        additionalData: {
          checkDuration: Date.now() - startTime,
        },
      })
    }
    
    // Return a critical status with empty servers
    return {
      servers: [],
      overallStatus: "critical",
      lastHealthCheck: new Date(),
    }
  }
}

/**
 * Start periodic MCP health monitoring
 */
export function startMCPHealthMonitoring(intervalMinutes: number = 5): () => void {
  const intervalMs = intervalMinutes * 60 * 1000
  
  // Initial health check
  checkAllMCPServersHealth()
  
  // Set up periodic checks
  const intervalId = setInterval(() => {
    checkAllMCPServersHealth()
  }, intervalMs)
  
  if (isSentryInitialized()) {
    addBreadcrumb(
      `MCP health monitoring started (${intervalMinutes}min intervals)`,
      "system",
      "info",
      { intervalMinutes }
    )
  }
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId)
    if (isSentryInitialized()) {
      addBreadcrumb("MCP health monitoring stopped", "system", "info")
    }
  }
}
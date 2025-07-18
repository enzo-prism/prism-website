"use client"

import * as Sentry from "@sentry/nextjs"

/**
 * Enhanced Sentry utilities for comprehensive error tracking and debugging
 */

export interface ErrorContext {
  errorType: string
  component?: string
  userId?: string
  sessionId?: string
  userAgent?: string
  url?: string
  additionalData?: Record<string, any>
}

export interface PerformanceContext {
  operation: string
  duration?: number
  success: boolean
  metadata?: Record<string, any>
}

/**
 * Capture errors with enhanced context and categorization
 */
export function captureErrorWithContext(
  error: Error | string,
  context: ErrorContext
): string {
  return Sentry.withScope((scope) => {
    // Set error level based on type
    const level = getErrorLevel(context.errorType)
    scope.setLevel(level)

    // Add tags for better categorization
    scope.setTag("error_type", context.errorType)
    if (context.component) {
      scope.setTag("component", context.component)
    }

    // Add user context if available
    if (context.userId) {
      scope.setUser({ id: context.userId })
    }

    // Add additional context
    scope.setContext("error_details", {
      userAgent: context.userAgent || (typeof window !== "undefined" ? window.navigator.userAgent : "unknown"),
      url: context.url || (typeof window !== "undefined" ? window.location.href : "unknown"),
      timestamp: new Date().toISOString(),
      ...context.additionalData,
    })

    // Capture the error
    if (typeof error === "string") {
      return Sentry.captureMessage(error, level)
    } else {
      return Sentry.captureException(error)
    }
  })
}

/**
 * Add breadcrumb for user actions and system events
 */
export function addBreadcrumb(
  message: string,
  category: string = "user",
  level: Sentry.SeverityLevel = "info",
  data?: Record<string, any>
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data: {
      timestamp: new Date().toISOString(),
      ...data,
    },
  })
}

/**
 * Start a performance transaction (simplified for newer Sentry versions)
 */
export function startTransaction(
  name: string,
  operation: string = "navigation"
): any {
  try {
    // For newer Sentry versions, use spans instead of transactions
    return Sentry.startSpan({
      name,
      op: operation,
    }, () => {
      // Return span-like object for compatibility
      return {
        name,
        operation,
        setData: (key: string, value: any) => Sentry.setTag(key, String(value)),
        finish: () => {},
      }
    })
  } catch {
    // Fallback for compatibility
    return {
      name,
      operation,
      setData: () => {},
      finish: () => {},
    }
  }
}

/**
 * Track custom performance metrics
 */
export function trackPerformance(context: PerformanceContext): void {
  Sentry.withScope((scope) => {
    scope.setTag("operation", context.operation)
    scope.setTag("success", context.success.toString())

    if (context.duration) {
      scope.setContext("performance", {
        operation: context.operation,
        duration: context.duration,
        success: context.success,
        ...context.metadata,
      })

      // Also send as measurement
      Sentry.setMeasurement(`${context.operation}_duration`, context.duration, "millisecond")
    }

    const message = `${context.operation} ${context.success ? "completed" : "failed"}`
    Sentry.captureMessage(message, context.success ? "info" : "warning")
  })
}

/**
 * Set user context for the session
 */
export function setUserContext(userId: string, email?: string, additionalData?: Record<string, any>): void {
  Sentry.setUser({
    id: userId,
    email,
    ...additionalData,
  })
}

/**
 * Add tags for better error categorization
 */
export function setContextTags(tags: Record<string, string>): void {
  Object.entries(tags).forEach(([key, value]) => {
    Sentry.setTag(key, value)
  })
}

/**
 * Clear all context (useful for user logout)
 */
export function clearContext(): void {
  try {
    // Clear user context
    Sentry.setUser(null)
    // Clear tags and other context
    Sentry.setContext("user", null)
  } catch {
    // Ignore errors in clearing context
  }
}

/**
 * Get error level based on error type
 */
function getErrorLevel(errorType: string): Sentry.SeverityLevel {
  const criticalErrors = ["js_error", "unhandled_promise_rejection", "build_error", "api_error"]
  const warningErrors = ["image_load_error", "validation_error", "user_error"]
  
  if (criticalErrors.includes(errorType)) {
    return "error"
  } else if (warningErrors.includes(errorType)) {
    return "warning"
  } else {
    return "info"
  }
}

/**
 * Check if Sentry is properly initialized
 */
export function isSentryInitialized(): boolean {
  try {
    // Check if Sentry is available and has been initialized
    return typeof Sentry !== "undefined" && typeof Sentry.captureException === "function"
  } catch {
    return false
  }
}

/**
 * Manually flush Sentry (useful before page unload)
 */
export async function flushSentry(timeout: number = 2000): Promise<boolean> {
  try {
    return await Sentry.flush(timeout)
  } catch {
    return false
  }
}

/**
 * Capture MCP server status and errors
 */
export function captureMCPError(serverName: string, error: Error | string, context?: Record<string, any>): void {
  captureErrorWithContext(
    typeof error === "string" ? new Error(error) : error,
    {
      errorType: "mcp_server_error",
      component: `mcp_${serverName}`,
      additionalData: {
        serverName,
        ...context,
      },
    }
  )
}

/**
 * Track MCP server health status
 */
export function trackMCPHealth(serverName: string, isHealthy: boolean, responseTime?: number): void {
  addBreadcrumb(
    `MCP ${serverName} health check: ${isHealthy ? "healthy" : "unhealthy"}`,
    "mcp",
    isHealthy ? "info" : "error",
    {
      serverName,
      isHealthy,
      responseTime,
    }
  )

  if (!isHealthy) {
    captureErrorWithContext(
      `MCP server ${serverName} health check failed`,
      {
        errorType: "mcp_health_check_failed",
        component: `mcp_${serverName}`,
        additionalData: {
          serverName,
          responseTime,
        },
      }
    )
  }
}
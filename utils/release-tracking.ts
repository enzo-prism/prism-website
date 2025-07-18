"use client"

import * as Sentry from "@sentry/nextjs"
import { addBreadcrumb, isSentryInitialized } from "./sentry-helpers"
import { SpanStatusCode } from '@sentry/types'

export interface ReleaseInfo {
  version: string
  environment: string
  commit?: string
  deployedAt: Date
  previousVersion?: string
}

/**
 * Create a new release in Sentry
 */
export function createSentryRelease(releaseInfo: ReleaseInfo): void {
  if (!isSentryInitialized()) return
  
  // Set the release context
  Sentry.setTag("release", releaseInfo.version)
  Sentry.setTag("environment", releaseInfo.environment)
  Sentry.setContext("release", {
    version: releaseInfo.version,
    environment: releaseInfo.environment,
    commit: releaseInfo.commit,
    deployedAt: releaseInfo.deployedAt.toISOString(),
    previousVersion: releaseInfo.previousVersion,
  })
  
  addBreadcrumb(
    `Release ${releaseInfo.version} deployed to ${releaseInfo.environment}`,
    "release",
    "info",
    {
      version: releaseInfo.version,
      environment: releaseInfo.environment,
      commit: releaseInfo.commit,
      deployedAt: releaseInfo.deployedAt.toISOString(),
    }
  )
}

/**
 * Track deployment success or failure
 */
export function trackDeployment(
  version: string,
  environment: string,
  success: boolean,
  error?: Error,
  metadata?: Record<string, any>
): void {
  if (!isSentryInitialized()) return
  
  const deploymentData = {
    version,
    environment,
    success,
    timestamp: new Date().toISOString(),
    ...metadata,
  }
  
  if (success) {
    addBreadcrumb(
      `Deployment ${version} to ${environment} succeeded`,
      "deployment",
      "info",
      deploymentData
    )
    
    // Track successful deployment as a transaction
    Sentry.startSpan({
      name: `Deployment Success: ${version}`,
      op: "deployment",
    }, (span) => {
      if (span) {
        span.setAttribute("description", `Successful deployment of ${version} to ${environment}`)
        span.setAttributes(deploymentData)
        span.setStatus({ code: SpanStatusCode.OK })
      }
    })
  } else {
    addBreadcrumb(
      `Deployment ${version} to ${environment} failed`,
      "deployment",
      "error",
      {
        ...deploymentData,
        error: error?.message,
        stack: error?.stack,
      }
    )
    
    // Capture deployment failure as an error
    Sentry.withScope((scope) => {
      scope.setTag("deployment_failed", true)
      scope.setTag("version", version)
      scope.setTag("environment", environment)
      scope.setContext("deployment", deploymentData)
      
      if (error) {
        Sentry.captureException(error)
      } else {
        Sentry.captureMessage(`Deployment ${version} failed in ${environment}`, "error")
      }
    })
  }
}

/**
 * Get current release information from environment variables
 */
export function getCurrentReleaseInfo(): ReleaseInfo | null {
  // Try to get release information from various sources
  const version = 
    process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || // Vercel
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || // Vercel (public)
    process.env.GITHUB_SHA?.substring(0, 7) || // GitHub Actions
    process.env.COMMIT_REF?.substring(0, 7) || // Netlify
    process.env.npm_package_version || // Package.json version
    "unknown"
  
  const environment = 
    process.env.VERCEL_ENV || // Vercel
    process.env.NODE_ENV || // General
    process.env.ENVIRONMENT || // Custom
    "unknown"
  
  const commit = 
    process.env.VERCEL_GIT_COMMIT_SHA || // Vercel
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || // Vercel (public)
    process.env.GITHUB_SHA || // GitHub Actions
    process.env.COMMIT_REF // Netlify
  
  if (version === "unknown" && environment === "unknown") {
    return null
  }
  
  return {
    version,
    environment,
    commit,
    deployedAt: new Date(),
  }
}

/**
 * Initialize release tracking for the current deployment
 */
export function initializeReleaseTracking(): void {
  if (!isSentryInitialized()) return
  
  const releaseInfo = getCurrentReleaseInfo()
  
  if (releaseInfo) {
    createSentryRelease(releaseInfo)
    
    // Track this as a successful deployment
    trackDeployment(releaseInfo.version, releaseInfo.environment, true, undefined, {
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      platform: typeof window !== "undefined" ? window.navigator.platform : undefined,
      timestamp: releaseInfo.deployedAt.toISOString(),
    })
    
    addBreadcrumb(
      "Release tracking initialized",
      "system",
      "info",
      {
        version: releaseInfo.version,
        environment: releaseInfo.environment,
      }
    )
  } else {
    addBreadcrumb(
      "Release tracking skipped - no release info available",
      "system",
      "warning"
    )
  }
}

/**
 * Track feature flag changes or rollouts
 */
export function trackFeatureFlag(
  flagName: string,
  enabled: boolean,
  userId?: string,
  metadata?: Record<string, any>
): void {
  if (!isSentryInitialized()) return
  
  addBreadcrumb(
    `Feature flag ${flagName}: ${enabled ? "enabled" : "disabled"}`,
    "feature_flag",
    "info",
    {
      flagName,
      enabled,
      userId,
      ...metadata,
    }
  )
  
  // Set feature flag as tag for filtering
  Sentry.setTag(`feature.${flagName}`, enabled ? "on" : "off")
}

/**
 * Track migration or database schema changes
 */
export function trackMigration(
  migrationName: string,
  success: boolean,
  duration?: number,
  error?: Error
): void {
  if (!isSentryInitialized()) return
  
  const migrationData = {
    migrationName,
    success,
    duration,
    timestamp: new Date().toISOString(),
  }
  
  if (success) {
    addBreadcrumb(
      `Migration ${migrationName} completed successfully`,
      "migration",
      "info",
      migrationData
    )
  } else {
    addBreadcrumb(
      `Migration ${migrationName} failed`,
      "migration",
      "error",
      {
        ...migrationData,
        error: error?.message,
        stack: error?.stack,
      }
    )
    
    if (error) {
      Sentry.withScope((scope) => {
        scope.setTag("migration_failed", true)
        scope.setTag("migration_name", migrationName)
        scope.setContext("migration", migrationData)
        Sentry.captureException(error)
      })
    }
  }
}

/**
 * Track A/B test assignments and results
 */
export function trackABTest(
  testName: string,
  variant: string,
  userId?: string,
  conversionEvent?: string
): void {
  if (!isSentryInitialized()) return
  
  addBreadcrumb(
    `A/B Test ${testName}: assigned variant ${variant}`,
    "ab_test",
    "info",
    {
      testName,
      variant,
      userId,
      conversionEvent,
    }
  )
  
  // Set A/B test as tags for filtering and analysis
  Sentry.setTag(`ab_test.${testName}`, variant)
  Sentry.setContext("ab_tests", {
    [testName]: {
      variant,
      assignedAt: new Date().toISOString(),
    },
  })
}
/**
 * Image System Diagnostic Script
 *
 * Runs comprehensive checks on the entire image handling system
 * to identify and report issues, performance problems, and optimization opportunities.
 */

import { performComprehensiveImageAudit } from "../utils/image-audit-comprehensive"
import { imageMonitor } from "../utils/image-monitoring"
import { imagePathResolver } from "../utils/image-path-resolver"

interface DiagnosticReport {
  timestamp: string
  systemHealth: "healthy" | "warning" | "critical"
  auditResults: any
  monitoringReport: any
  pathValidation: any
  recommendations: string[]
  criticalIssues: string[]
}

/**
 * Run comprehensive image system diagnostic
 */
export async function runImageSystemDiagnostic(): Promise<DiagnosticReport> {
  console.log("🔍 Starting comprehensive image system diagnostic...")

  const timestamp = new Date().toISOString()
  const report: DiagnosticReport = {
    timestamp,
    systemHealth: "healthy",
    auditResults: null,
    monitoringReport: null,
    pathValidation: null,
    recommendations: [],
    criticalIssues: [],
  }

  try {
    // 1. Run comprehensive audit
    console.log("📊 Running image audit...")
    report.auditResults = await performComprehensiveImageAudit()

    // 2. Get monitoring report
    console.log("📈 Generating monitoring report...")
    report.monitoringReport = imageMonitor.generateHealthReport()

    // 3. Validate all known image paths
    console.log("🔗 Validating image paths...")
    const knownPaths = [
      "/practice-transitions-institute-mobile.png",
      "/olympic-bootworks-mobile.png",
      "/exquisite-dentistry-mobile.png",
      "/dr-christopher-wong-mobile.png",
      "/town-centre-dental-mobile.png",
      "/laguna-beach-dental-arts-mobile.png",
      "/coast-periodontics-mobile.png",
      "/belize-kids-mobile.png",
    ]

    report.pathValidation = imagePathResolver.batchResolve(knownPaths)

    // 4. Analyze results and determine system health
    console.log("🏥 Analyzing system health...")

    // Check for critical issues
    if (report.auditResults.criticalIssues.length > 0) {
      report.criticalIssues.push(...report.auditResults.criticalIssues)
    }

    if (report.monitoringReport.errorRate > 10) {
      report.criticalIssues.push(`High error rate: ${report.monitoringReport.errorRate.toFixed(1)}%`)
    }

    // Check path validation issues
    Object.entries(report.pathValidation).forEach(([path, result]: [string, any]) => {
      if (!result.isValid) {
        report.criticalIssues.push(`Invalid path: ${path} - ${result.errors.join(", ")}`)
      }
    })

    // Determine overall health
    if (report.criticalIssues.length > 0) {
      report.systemHealth = "critical"
    } else if (
      report.auditResults.unoptimizedImages > 5 ||
      report.monitoringReport.errorRate > 5 ||
      report.monitoringReport.averageLoadTime > 2000
    ) {
      report.systemHealth = "warning"
    }

    // 5. Generate recommendations
    console.log("💡 Generating recommendations...")

    // Audit recommendations
    report.recommendations.push(...report.auditResults.recommendations)

    // Monitoring recommendations
    report.recommendations.push(...report.monitoringReport.recommendations)

    // Path optimization recommendations
    Object.entries(report.pathValidation).forEach(([path, result]: [string, any]) => {
      const pathRecommendations = imagePathResolver.getOptimizationRecommendations(path)
      report.recommendations.push(...pathRecommendations.map((rec) => `${path}: ${rec}`))
    })

    // System-level recommendations
    if (report.systemHealth === "critical") {
      report.recommendations.unshift("🚨 CRITICAL: Address all critical issues immediately")
    }

    if (report.monitoringReport.averageLoadTime > 1500) {
      report.recommendations.push("Consider implementing image preloading for critical images")
    }

    // Remove duplicates
    report.recommendations = [...new Set(report.recommendations)]
  } catch (error) {
    console.error("❌ Diagnostic failed:", error)
    report.systemHealth = "critical"
    report.criticalIssues.push(`Diagnostic error: ${error}`)
  }

  // 6. Output results
  console.log("\n📋 DIAGNOSTIC REPORT")
  console.log("===================")
  console.log(`🕐 Timestamp: ${report.timestamp}`)
  console.log(`🏥 System Health: ${report.systemHealth.toUpperCase()}`)
  console.log(`📊 Total Images: ${report.auditResults?.totalImages || 0}`)
  console.log(`✅ Valid Images: ${report.auditResults?.validImages || 0}`)
  console.log(`❌ Failed Images: ${report.auditResults?.brokenImages || 0}`)
  console.log(`📈 Error Rate: ${report.monitoringReport?.errorRate?.toFixed(1) || 0}%`)
  console.log(`⏱️  Avg Load Time: ${report.monitoringReport?.averageLoadTime?.toFixed(0) || 0}ms`)

  if (report.criticalIssues.length > 0) {
    console.log("\n🚨 CRITICAL ISSUES:")
    report.criticalIssues.forEach((issue) => console.log(`   • ${issue}`))
  }

  if (report.recommendations.length > 0) {
    console.log("\n💡 RECOMMENDATIONS:")
    report.recommendations.slice(0, 10).forEach((rec) => console.log(`   • ${rec}`))

    if (report.recommendations.length > 10) {
      console.log(`   ... and ${report.recommendations.length - 10} more`)
    }
  }

  console.log("\n✅ Diagnostic complete!")

  return report
}

// Run diagnostic if called directly
if (typeof window === "undefined" && require.main === module) {
  runImageSystemDiagnostic()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Diagnostic failed:", error)
      process.exit(1)
    })
}

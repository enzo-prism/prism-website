/**
 * Deployment Verification Script
 *
 * This script verifies that your Next.js configuration is properly set up for
 * image optimization and that all required environment variables are present.
 *
 * Usage: npx ts-node scripts/verify-deployment.ts
 */

import fs from "fs"
import path from "path"

// Configuration
const CONFIG_FILE = path.join(process.cwd(), "next.config.mjs")
const ENV_FILE = path.join(process.cwd(), ".env.local")

// Results tracking
const issues: string[] = []

// Check Next.js configuration
function checkNextConfig() {
  console.log("📝 Checking Next.js configuration...")

  try {
    const configContent = fs.readFileSync(CONFIG_FILE, "utf8")

    // Check for images configuration
    if (!configContent.includes("images:")) {
      issues.push("❌ No images configuration found in next.config.mjs")
    }

    // Check for remotePatterns
    if (!configContent.includes("remotePatterns:")) {
      issues.push("❌ No remotePatterns configuration found in next.config.mjs")
    }

    // Check for common domains
    const commonDomains = ["vercel.com", "blob.v0.dev", "images.unsplash.com"]
    for (const domain of commonDomains) {
      if (!configContent.includes(domain)) {
        issues.push(`⚠️ Common domain "${domain}" not found in remotePatterns`)
      }
    }

    // Check for output configuration
    if (!configContent.includes("output:")) {
      issues.push('⚠️ No output configuration found in next.config.mjs (recommended: output: "standalone")')
    }

    // Check for image optimization settings
    if (!configContent.includes("deviceSizes:")) {
      issues.push("⚠️ No deviceSizes configuration found in next.config.mjs")
    }

    if (!configContent.includes("imageSizes:")) {
      issues.push("⚠️ No imageSizes configuration found in next.config.mjs")
    }

    if (!configContent.includes("formats:")) {
      issues.push("⚠️ No formats configuration found in next.config.mjs")
    }
  } catch (error) {
    issues.push("❌ Could not read next.config.mjs file")
  }
}

// Check for required environment variables
function checkEnvironmentVariables() {
  console.log("🔑 Checking environment variables...")

  const requiredVars = ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_VERCEL_URL"]

  try {
    if (fs.existsSync(ENV_FILE)) {
      const envContent = fs.readFileSync(ENV_FILE, "utf8")

      for (const variable of requiredVars) {
        if (!envContent.includes(variable)) {
          issues.push(`⚠️ Environment variable ${variable} not found in .env.local`)
        }
      }
    } else {
      issues.push("⚠️ No .env.local file found")
    }
  } catch (error) {
    issues.push("❌ Could not read .env.local file")
  }

  // Check process.env for production deployment
  for (const variable of requiredVars) {
    if (!process.env[variable]) {
      issues.push(`⚠️ Environment variable ${variable} not found in process.env`)
    }
  }
}

// Check for image components usage
function checkImageComponentsUsage() {
  console.log("🖼️ Checking image components usage...")

  const componentsDir = path.join(process.cwd(), "components")
  const appDir = path.join(process.cwd(), "app")

  try {
    // Check if we have a standardized image component
    const hasStandardImageComponent =
      fs.existsSync(path.join(componentsDir, "core-image.tsx")) ||
      fs.existsSync(path.join(componentsDir, "enhanced-image.tsx")) ||
      fs.existsSync(path.join(componentsDir, "optimized-image.tsx"))

    if (!hasStandardImageComponent) {
      issues.push("⚠️ No standardized image component found (recommended: components/core-image.tsx)")
    }

    // Check for direct img tag usage (which should be avoided)
    const checkForImgTags = (dir: string) => {
      const files = fs.readdirSync(dir, { withFileTypes: true })

      for (const file of files) {
        const fullPath = path.join(dir, file.name)

        if (file.isDirectory()) {
          checkForImgTags(fullPath)
        } else if (file.name.endsWith(".tsx") || file.name.endsWith(".jsx")) {
          const content = fs.readFileSync(fullPath, "utf8")

          if (content.includes("<img ") && !content.includes("eslint-disable")) {
            issues.push(`⚠️ Direct <img> tag usage found in ${fullPath} (use Next.js Image component instead)`)
          }
        }
      }
    }

    checkForImgTags(componentsDir)
    checkForImgTags(appDir)
  } catch (error) {
    issues.push("❌ Error checking image components usage")
  }
}

// Main function
async function main() {
  console.log("🚀 Starting deployment verification...")

  checkNextConfig()
  checkEnvironmentVariables()
  checkImageComponentsUsage()

  // Print results
  console.log("\n📊 Verification Results:")

  if (issues.length === 0) {
    console.log("✅ All checks passed! Your configuration looks good for deployment.")
  } else {
    console.log(`❌ Found ${issues.length} issues that may affect your deployment:`)
    issues.forEach((issue) => console.log(`  ${issue}`))

    console.log("\n🔧 Recommendations:")
    console.log("  1. Fix the issues listed above")
    console.log("  2. Run the image verification script: npx ts-node scripts/verify-images.ts")
    console.log("  3. Test your deployment in a staging environment before going to production")

    process.exit(1)
  }
}

// Run the script
main().catch((error) => {
  console.error("Error running deployment verification:", error)
  process.exit(1)
})

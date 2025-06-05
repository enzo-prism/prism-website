/**
 * Image Verification Script
 *
 * This script scans the project for image references and verifies they follow best practices
 */

import fs from "fs"
import path from "path"
import { validateImageConfig } from "../utils/image-audit"

// Configuration
const SRC_DIR = path.join(process.cwd(), "app")
const COMPONENTS_DIR = path.join(process.cwd(), "components")
const PUBLIC_DIR = path.join(process.cwd(), "public")

// Results tracking
const results = {
  totalImagesFound: 0,
  validImages: 0,
  warningImages: 0,
  invalidImages: 0,
  issues: [] as { file: string; src: string; issues: string[] }[],
}

// Check if a local image exists
function localImageExists(imagePath: string): boolean {
  const fullPath = path.join(PUBLIC_DIR, imagePath.startsWith("/") ? imagePath.slice(1) : imagePath)
  return fs.existsSync(fullPath)
}

// Extract image references from a file
function extractImageReferences(
  filePath: string,
  content: string,
): {
  src: string
  width?: number | string
  height?: number | string
  priority?: boolean
  loading?: "lazy" | "eager"
  alt?: string
}[] {
  const images: any[] = []

  // Match Next.js Image component props
  const imageComponentRegex = /<(?:Image|CoreImage)[^>]*src=["']([^"']+)["'][^>]*>/g
  let match

  while ((match = imageComponentRegex.exec(content)) !== null) {
    const fullMatch = match[0]
    const src = match[1]

    // Extract other props
    const widthMatch = fullMatch.match(/width=\{?(\d+)\}?/)
    const heightMatch = fullMatch.match(/height=\{?(\d+)\}?/)
    const altMatch = fullMatch.match(/alt=["']([^"']*)["']/)
    const priorityMatch = fullMatch.match(/priority(?:=\{true\})?/)
    const loadingMatch = fullMatch.match(/loading=["']([^"']*)["']/)

    images.push({
      src,
      width: widthMatch ? Number.parseInt(widthMatch[1], 10) : undefined,
      height: heightMatch ? Number.parseInt(heightMatch[1], 10) : undefined,
      alt: altMatch ? altMatch[1] : undefined,
      priority: priorityMatch !== null,
      loading: loadingMatch ? (loadingMatch[1] as "lazy" | "eager") : undefined,
    })
  }

  return images
}

// Process a file to check image references
async function processFile(filePath: string): Promise<void> {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const images = extractImageReferences(filePath, content)

    results.totalImagesFound += images.length

    for (const img of images) {
      const audit = validateImageConfig(img.src, img.width, img.height, img.priority, img.loading, img.alt)

      if (audit.status === "valid") {
        results.validImages++
      } else if (audit.status === "warning") {
        results.warningImages++
      } else {
        results.invalidImages++
        results.issues.push({
          file: filePath,
          src: img.src,
          issues: audit.issues,
        })
      }

      // Check if local image exists
      if (img.src.startsWith("/") && !localImageExists(img.src)) {
        results.issues.push({
          file: filePath,
          src: img.src,
          issues: ["Local image file does not exist"],
        })
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
  }
}

// Recursively scan directories for files to check
async function scanDirectory(dir: string, fileExtensions: string[]): Promise<string[]> {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        files.push(...(await scanDirectory(fullPath, fileExtensions)))
      }
    } else if (fileExtensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath)
    }
  }

  return files
}

// Main function
async function main() {
  console.log("🔍 Scanning project for image references...")

  // Scan source files
  const fileExtensions = [".js", ".jsx", ".ts", ".tsx"]
  const srcFiles = await scanDirectory(SRC_DIR, fileExtensions)
  const componentFiles = await scanDirectory(COMPONENTS_DIR, fileExtensions)
  const allFiles = [...srcFiles, ...componentFiles]

  console.log(`Found ${allFiles.length} files to check.`)

  // Process each file
  for (const file of allFiles) {
    await processFile(file)
  }

  // Print results
  console.log("\n📊 Image Verification Results:")
  console.log(`Total images found: ${results.totalImagesFound}`)
  console.log(`Valid images: ${results.validImages}`)
  console.log(`Images with warnings: ${results.warningImages}`)
  console.log(`Invalid images: ${results.invalidImages}`)

  if (results.issues.length > 0) {
    console.log("\n❌ Issues found:")
    results.issues.forEach((issue) => {
      console.log(`\nFile: ${issue.file}`)
      console.log(`Image: ${issue.src}`)
      console.log("Issues:")
      issue.issues.forEach((i) => console.log(`  - ${i}`))
    })
  }

  // Final summary
  if (results.invalidImages === 0) {
    console.log("\n✅ All images follow best practices!")
  } else {
    console.log("\n⚠️ Some images need attention. Please fix the issues before deploying.")
    process.exit(1)
  }
}

// Run the script
main().catch((error) => {
  console.error("Error running image verification:", error)
  process.exit(1)
})

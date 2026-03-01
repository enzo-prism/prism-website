import fs from "node:fs"
import path from "node:path"

import {
  PRICING_CONTEXT_RULES,
  PRICING_STRICT_FILES,
  collectPricingConsistencyViolations,
} from "../lib/pricing-consistency"

const TARGET_FILES = [
  ...PRICING_STRICT_FILES,
  ...Object.keys(PRICING_CONTEXT_RULES),
] as const

function fail(message: string): never {
  console.error(`\n❌ ${message}\n`)
  process.exit(1)
}

function main() {
  console.log("🔎 Verifying pricing consistency across canonical surfaces...")

  const missingFiles = TARGET_FILES.filter((relativePath) => !fs.existsSync(path.join(process.cwd(), relativePath)))
  if (missingFiles.length > 0) {
    fail(`Missing expected pricing files:\n${missingFiles.map((file) => `- ${file}`).join("\n")}`)
  }

  const violations = TARGET_FILES.flatMap((relativePath) => {
    const absolutePath = path.join(process.cwd(), relativePath)
    const content = fs.readFileSync(absolutePath, "utf8")
    return collectPricingConsistencyViolations(relativePath, content)
  })

  if (violations.length > 0) {
    console.error("Pricing consistency violations detected:")
    for (const violation of violations) {
      const location = `${violation.filePath}:${violation.line}`
      const excerpt = violation.excerpt ? `\n    ${violation.excerpt}` : ""
      console.error(`- ${location} — ${violation.label}${excerpt}`)
    }
    fail("Resolve pricing conflicts before deploying.")
  }

  console.log("✅ Pricing consistency check passed.")
}

main()

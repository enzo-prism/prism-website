import fs from "node:fs/promises"
import path from "node:path"

import { buildLlmsFull } from "@/lib/llms-full"

// Built once per deploy: every source it reads ships with the deployment.
export const dynamic = "force-static"

export async function GET() {
  const llmsTxt = await fs.readFile(path.join(process.cwd(), "public", "llms.txt"), "utf8")
  return new Response(await buildLlmsFull(llmsTxt, new Date()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  })
}

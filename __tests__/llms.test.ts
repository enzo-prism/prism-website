import fs from "node:fs"
import path from "node:path"

describe("llms.txt", () => {
  it("references canonical on-site URLs and avoids noindex or off-site detours", () => {
    const llms = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8")

    expect(llms).toContain("https://www.design-prism.com/pricing")
    expect(llms).toContain("https://www.design-prism.com/podcast")

    expect(llms).not.toContain("https://www.design-prism.com/hottest-content")
    expect(llms).not.toContain("https://www.design-prism.com/offers")
    expect(llms).not.toContain("https://www.design-prism.com/growth")
    expect(llms).not.toContain("podcasts.apple.com")
  })
})

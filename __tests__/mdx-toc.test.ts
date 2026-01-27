import { getMdxToc } from "../lib/mdx-toc"

describe("mdx toc extraction", () => {
  test("extracts markdown headings and mdx JSX headings", async () => {
    const content = `
# Title

## Alpha
### Beta

<h2 className="text-2xl">Gamma Heading</h2>
<h3 id="custom-id">Custom</h3>
`

    await expect(getMdxToc(content)).resolves.toEqual([
      { id: "alpha", label: "Alpha", level: 2 },
      { id: "beta", label: "Beta", level: 3 },
      { id: "gamma-heading", label: "Gamma Heading", level: 2 },
      { id: "custom-id", label: "Custom", level: 3 },
    ])
  })
})

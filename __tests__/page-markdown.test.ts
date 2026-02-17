import { buildPageMarkdownFromDocument } from "@/lib/page-markdown"

describe("page markdown copy helper", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
    document.title = ""
  })

  it("converts page content to markdown and appends media/link URLs", async () => {
    document.body.innerHTML = `
      <main>
        <h1>About Prism</h1>
        <p>
          We design growth systems. <a href="/contact">Contact us</a> to learn more.
        </p>
        <img src="/images/hero.png" alt="Prism hero" />
        <video poster="/images/poster.jpg">
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>
        <iframe src="https://www.youtube.com/embed/abc123" title="Prism story"></iframe>
      </main>
    `

    const markdown = await buildPageMarkdownFromDocument(document, {
      baseUrl: "https://www.design-prism.com/about",
    })

    expect(markdown).toContain("# About Prism")
    expect(markdown).toContain(
      "Source: [https://www.design-prism.com/about](https://www.design-prism.com/about)",
    )
    expect(markdown).toContain(
      "[Contact us](https://www.design-prism.com/contact)",
    )
    expect(markdown).toContain(
      "![Prism hero](https://www.design-prism.com/images/hero.png)",
    )
    expect(markdown).toContain(
      "[Video source](https://www.design-prism.com/videos/intro.mp4)",
    )
    expect(markdown).toContain(
      "[Embedded content: Prism story](https://www.youtube.com/embed/abc123)",
    )
    expect(markdown).toContain("## Page links")
    expect(markdown).toContain("## Image links")
    expect(markdown).toContain("## Video and embed links")
  })

  it("removes markdown control elements from copied output", async () => {
    document.body.innerHTML = `
      <main>
        <div data-copy-markdown-control>Copy page markdown</div>
        <h1>Services</h1>
        <p>Execution-focused services for local businesses.</p>
      </main>
    `

    const markdown = await buildPageMarkdownFromDocument(document, {
      baseUrl: "https://www.design-prism.com/services",
    })

    expect(markdown).toContain("# Services")
    expect(markdown).not.toContain("Copy page markdown")
  })
})

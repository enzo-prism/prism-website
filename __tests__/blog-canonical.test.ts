jest.mock("server-only", () => ({}), { virtual: true })

jest.mock("@/lib/mdx-data", () => ({
  // One featured post plus 30 in the grid: three pages of 12.
  getAllPosts: jest.fn(async () =>
    Array.from({ length: 31 }, (_, index) => ({
      slug: `post-${index}`,
      title: `Post ${index}`,
      description: "",
      date: "2026-01-01",
      category: "marketing",
      image: "",
    })),
  ),
}))

import { generateMetadata } from "@/app/blog/page"

async function canonicalFor(searchParams: Record<string, string>) {
  const metadata = await generateMetadata({ searchParams: Promise.resolve(searchParams) })
  return String(metadata.alternates?.canonical)
}

describe("blog page canonical", () => {
  test("page one canonicalizes to /blog", async () => {
    expect(await canonicalFor({})).toBe("https://www.design-prism.com/blog")
    expect(await canonicalFor({ page: "1" })).toBe("https://www.design-prism.com/blog")
  })

  test("later pages canonicalize to themselves", async () => {
    expect(await canonicalFor({ page: "2" })).toBe("https://www.design-prism.com/blog?page=2")
  })

  test("out-of-range pages and search queries fall back to a real listing", async () => {
    expect(await canonicalFor({ page: "99" })).toBe("https://www.design-prism.com/blog?page=3")
    expect(await canonicalFor({ page: "abc" })).toBe("https://www.design-prism.com/blog")
    expect(await canonicalFor({ q: "seo" })).toBe("https://www.design-prism.com/blog")
  })

  test("later pages get their own title", async () => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve({ page: "2" }) })
    expect(JSON.stringify(metadata.title)).toContain("page 2")
  })
})

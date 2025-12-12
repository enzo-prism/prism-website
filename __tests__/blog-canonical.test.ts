jest.mock("server-only", () => ({}), { virtual: true })

import { metadata } from "@/app/blog/page"

describe('blog page canonical', () => {
  test("exports canonical link in metadata", () => {
    const canonical = metadata.alternates?.canonical
    expect(String(canonical)).toBe("https://www.design-prism.com/blog")
  })
})

import fs from "fs/promises"
import matter from "gray-matter"
import path from "path"
import "server-only"

export type BlogFrontmatter = {
  title: string
  h1Title?: string
  author: string
  description: string
  date: string
  category: string
  categorySlug: string
  image?: string
  gradientClass: string
  showHeroImage?: boolean
  openGraph?: Record<string, any>
  twitter?: Record<string, any>
  canonical?: string
  howTo?: {
    title: string
    description: string
    totalTime?: string
    steps: { title: string; text: string }[]
    supplies?: string[]
    tools?: string[]
  }
}

const BLOG_PATH = path.join(process.cwd(), "content", "blog")
const PUBLIC_PATH = path.join(process.cwd(), "public")

const CODEX_REGEX = /\bcode?x\b/gi
const DEFAULT_CATEGORY_SLUG = "general"

function normalizeCodexWord(value: string) {
  return value.replace(CODEX_REGEX, match =>
    match.charAt(0) === match.charAt(0).toLowerCase() ? "codex" : "Codex",
  )
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || DEFAULT_CATEGORY_SLUG
  )
}

function normalizeCodexCasing<T>(value: T): T {
  if (typeof value === "string") {
    return normalizeCodexWord(value) as T
  }

  if (Array.isArray(value)) {
    return value.map(item => normalizeCodexCasing(item)) as unknown as T
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [key, normalizeCodexCasing(val)]),
    ) as T
  }

  return value
}

const INVALID_IMAGE_VALUES = new Set(["", "null", "undefined", "none", "false"])

function isExternalImageUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

function isApiImageRoute(value: string) {
  return value.startsWith("/api/")
}

function getPublicAssetPath(imagePath: string) {
  const normalizedPath = imagePath.split(/[?#]/, 1)[0]
  return path.join(PUBLIC_PATH, normalizedPath.replace(/^\/+/, ""))
}

async function resolveFrontmatterImage(imageValue: unknown, slug: string): Promise<string | undefined> {
  if (typeof imageValue !== "string") return undefined

  const trimmedImage = imageValue.trim()
  if (INVALID_IMAGE_VALUES.has(trimmedImage.toLowerCase())) return undefined

  if (isExternalImageUrl(trimmedImage) || isApiImageRoute(trimmedImage)) {
    return trimmedImage
  }

  if (!trimmedImage.startsWith("/")) {
    return trimmedImage
  }

  const publicAssetPath = getPublicAssetPath(trimmedImage)

  try {
    await fs.access(publicAssetPath)
    return trimmedImage
  } catch {
    console.warn(
      `[MDXLib] Post "${slug}" references missing image "${trimmedImage}". Falling back to gradient placeholder.`,
    )
    return undefined
  }
}

export async function getPost(
  slug: string,
): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    const normalizedData = normalizeCodexCasing(data)
    const normalizedContent = normalizeCodexWord(content)

    if (!normalizedData.title || !normalizedData.description || !normalizedData.date || !normalizedData.category) {
      console.error(`[MDXLib] Post "${slug}" missing required fields:`, {
        title: !!normalizedData.title,
        description: !!normalizedData.description,
        date: !!normalizedData.date,
        category: !!normalizedData.category,
      })
      return null
    }

    const rawAuthor = normalizedData.author ?? normalizedData.openGraph?.authors?.[0] ?? "Prism Team"
    const author =
      typeof rawAuthor === "string" && rawAuthor.trim().length > 0 ? rawAuthor.trim() : "Prism Team"

    const image = await resolveFrontmatterImage(normalizedData.image, slug)

    const frontmatter: BlogFrontmatter = {
      title: normalizedData.title,
      h1Title: normalizedData.h1Title,
      author,
      description: normalizedData.description,
      date: normalizedData.date,
      category: normalizedData.category.trim(),
      categorySlug: slugify(normalizedData.category.trim()),
      image,
      gradientClass:
        normalizedData.gradientClass ||
        "bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30",
      showHeroImage: typeof normalizedData.showHeroImage === "boolean" ? normalizedData.showHeroImage : true,
      openGraph: normalizedData.openGraph,
      twitter: normalizedData.twitter,
      canonical: normalizedData.canonical,
      howTo: normalizedData.howTo,
    }

    return { frontmatter, content: normalizedContent }
  } catch (error: unknown) {
    console.error(`[MDXLib] Failed to get post "${slug}" from "${filePath}":`, error)
    return null
  }
}

export async function getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  try {
    const files = await fs.readdir(BLOG_PATH)
    const mdxFiles = files.filter(fileName => fileName.endsWith(".mdx"))
    if (mdxFiles.length === 0) {
      console.warn(`[MDXLib] No .mdx files found in ${BLOG_PATH}`)
      return []
    }

    const postsData = await Promise.all(
      mdxFiles.map(async fileName => {
        const slug = fileName.replace(/\.mdx$/, "")
        const post = await getPost(slug)
        return post ? { slug, ...post.frontmatter } : null
      }),
    )

    const validPosts = postsData.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>
    if (validPosts.length === 0 && mdxFiles.length > 0) {
      console.warn(
        `[MDXLib] MDX files were found in ${BLOG_PATH}, but no valid posts could be processed. Check getPost errors above.`,
      )
    }

    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error: unknown) {
    console.error(`[MDXLib] Failed to get all posts from "${BLOG_PATH}":`, error)
    return null
  }
}

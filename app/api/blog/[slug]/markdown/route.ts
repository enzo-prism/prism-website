import { canonicalUrl } from '@/lib/canonical'
import { getPost, getPostMarkdownSource } from '@/lib/mdx-data'

export const revalidate = 3600

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const [post, markdownSource] = await Promise.all([
    getPost(slug),
    getPostMarkdownSource(slug),
  ])

  if (!post || !markdownSource) {
    return new Response('Blog post not found', { status: 404 })
  }

  return new Response(markdownSource, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Keep source copies readable without competing with the HTML article.
      'X-Robots-Tag': 'noindex, follow',
      Link: `<${canonicalUrl(post.frontmatter.canonical || `/blog/${slug}`)}>; rel="canonical"`,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

import { getPostMarkdownSource } from '@/lib/mdx-data'

export const revalidate = 3600

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const markdownSource = await getPostMarkdownSource(slug)

  if (!markdownSource) {
    return new Response('Blog post not found', { status: 404 })
  }

  return new Response(markdownSource, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

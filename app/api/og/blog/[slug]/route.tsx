import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getPostMetadataForOG } from '@/lib/mdx-edge'
import { parseTailwindGradient } from '@/utils/tailwind-to-css'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params since they're async in Next.js 15
    const { slug } = await params
    
    // Get the blog post metadata
    const postMetadata = getPostMetadataForOG(slug)
    
    if (!postMetadata) {
      return new Response('Blog post not found', { status: 404 })
    }
    
    // Parse the gradient class to CSS
    const gradient = parseTailwindGradient(postMetadata.gradientClass)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: gradient,
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Top section with category and date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {/* Category badge */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  fontSize: '18px',
                  textTransform: 'lowercase',
                  fontWeight: 500,
                }}
              >
                {postMetadata.category}
              </div>
            </div>
          </div>

          {/* Middle section with title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: 1,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'rgba(0, 0, 0, 0.9)',
                textTransform: 'lowercase',
                margin: 0,
                maxWidth: '90%',
              }}
            >
              {postMetadata.title}
            </h1>
          </div>

          {/* Bottom section with branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.9)',
                textTransform: 'lowercase',
              }}
            >
              prism
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'lowercase',
              }}
            >
              design-prism.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Cache for 1 year (same as the existing image optimization)
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
    // Return a fallback error image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, rgb(165, 180, 252), rgb(196, 181, 253), rgb(125, 211, 252))',
            fontSize: '32px',
            fontWeight: 700,
            color: 'rgba(0, 0, 0, 0.9)',
            textTransform: 'lowercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          prism blog
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
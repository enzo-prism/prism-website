import { getTikTokVideoId } from '@/lib/library/tiktok'

describe('getTikTokVideoId', () => {
  it('accepts a canonical TikTok video URL', () => {
    expect(
      getTikTokVideoId(
        'https://www.tiktok.com/@the_design_prism/video/1234567890',
      ),
    ).toBe('1234567890')
  })

  it.each([
    'https://evil.example/@the_design_prism/video/1234567890',
    'javascript:alert(1)',
    'https://www.tiktok.com/@the_design_prism/photo/1234567890',
  ])('rejects unsafe or unsupported URLs: %s', (url) => {
    expect(getTikTokVideoId(url)).toBeNull()
  })
})

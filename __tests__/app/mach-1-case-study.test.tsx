import { existsSync } from 'node:fs'
import path from 'node:path'

import { render, screen, within } from '@testing-library/react'

import Mach1CaseStudyPage, { metadata } from '@/app/case-studies/mach-1/page'
import { MACH1_LAUNCH, MACH1_STACK } from '@/components/case-studies/mach-1/content'
import { HOMEPAGE_CASE_STUDIES } from '@/components/home/homepage-content'
import { getCaptureSize } from '@/components/home/stories/capture-sizes'
import { STORY_BANDS } from '@/components/home/stories/StoryPanel'
import { CASE_STUDIES } from '@/lib/case-study-data'

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <header data-testid="navbar-mock" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="footer-mock" />
  },
}))

const publicFile = (src: string) =>
  existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, '')))

describe('Mach 1 case study', () => {
  it('tells the launch and the growth stack on top of the shared template', () => {
    render(<Mach1CaseStudyPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Mach 1' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: MACH1_LAUNCH.title }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: MACH1_STACK.title }),
    ).toBeInTheDocument()
    for (const tool of MACH1_STACK.tools) {
      expect(
        screen.getByRole('heading', { level: 3, name: tool.title }),
      ).toBeInTheDocument()
    }
    expect(
      screen.getByRole('heading', { level: 2, name: 'what changed.' }),
    ).toBeInTheDocument()
  })

  it('draws the private tools as labeled illustrations, never as captures', () => {
    render(<Mach1CaseStudyPage />)

    for (const tool of MACH1_STACK.tools) {
      const scenes = screen.getAllByRole('img', { name: tool.sceneLabel, hidden: true })
      expect(scenes.length).toBeGreaterThanOrEqual(1)
      expect(tool.sceneLabel).toMatch(/^Illustration: /)
      for (const scene of scenes) {
        expect(within(scene).getByText('Illustrative')).toBeInTheDocument()
        expect(scene.querySelector('img')).toBeNull()
      }
    }
    expect(document.body).toHaveTextContent(MACH1_STACK.note)
  })

  it('links each featured page to the live site and ships every asset', () => {
    render(<Mach1CaseStudyPage />)

    for (const page of MACH1_LAUNCH.pages) {
      const link = screen.getByRole('link', { name: new RegExp(page.title) })
      expect(link).toHaveAttribute('href', `https://${page.path}`)
      expect(link).toHaveAttribute('target', '_blank')
      expect(publicFile(page.src)).toBe(true)
    }
    for (const src of [
      '/case-studies/mach-1-home-desktop.jpg',
      '/case-studies/mach-1-home-mobile.jpg',
      '/case-studies/mach-1/site-film-desktop.mp4',
      '/case-studies/mach-1/site-film-mobile.mp4',
      '/case-studies/mach-1/site-film-mobile-poster.jpg',
      '/clients/logos/mach-1.png',
    ]) {
      expect(publicFile(src)).toBe(true)
    }
  })

  it('shares its own approved card as the link preview', () => {
    const og = metadata.openGraph?.images
    const first = Array.isArray(og) ? og[0] : og
    expect(first).toMatchObject({ url: '/case-studies/mach-1/og.jpg', width: 1200, height: 630 })
    expect(metadata.twitter?.images).toEqual(['/case-studies/mach-1/og.jpg'])
    expect(publicFile('/case-studies/mach-1/og.jpg')).toBe(true)
  })

  it('keeps the copy in house style', () => {
    const copy = JSON.stringify([
      MACH1_LAUNCH,
      MACH1_STACK,
      CASE_STUDIES.find((study) => study.slug === 'mach-1'),
    ])
    expect(copy).not.toMatch(/—|–/)
    expect(copy).not.toMatch(
      /\b(unlock|elevate|seamless|world-class|cutting-edge|revolutionary|game-changing|supercharge)/i,
    )
    for (const title of [MACH1_LAUNCH.title, MACH1_STACK.title, ...MACH1_STACK.tools.map((tool) => tool.title)]) {
      expect(title).toBe(title.toLowerCase())
      expect(title.endsWith('.')).toBe(true)
    }
  })
})

describe('homepage story deck', () => {
  it('gives every featured story its own band and measured captures', () => {
    const stories = HOMEPAGE_CASE_STUDIES.stories
    expect(stories.map((story) => story.slug)).toEqual([...HOMEPAGE_CASE_STUDIES.slugs])
    expect(STORY_BANDS.length).toBeGreaterThanOrEqual(stories.length)
    expect(stories.at(-1)?.slug).toBe('mach-1')
    for (const story of stories) {
      for (const [src, kind] of [
        [story.desktopImage, 'desktop'],
        [story.mobileImage, 'mobile'],
      ] as const) {
        expect(publicFile(src)).toBe(true)
        expect(getCaptureSize(src, kind).width).toBe(kind === 'desktop' ? 1280 : 600)
      }
    }
  })
})

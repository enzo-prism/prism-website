import { render, screen } from '@testing-library/react'

import ClientPage from '@/app/client-page'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
    [key: string]: unknown
  }) {
    return (
      <a
        href={typeof href === 'string' ? href : (href?.pathname ?? '')}
        {...props}
      >
        {children}
      </a>
    )
  },
}))

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <nav data-testid="mock-navbar" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="mock-footer" />
  },
}))

jest.mock('@/components/home/DeferredAsciiHeroBackdrop', () => ({
  __esModule: true,
  default: function MockDeferredAsciiHeroBackdrop() {
    return <div data-testid="home-hero-ascii-backdrop" />
  },
}))

describe('ClientPage homepage flow', () => {
  it('renders the expanded homepage section headings in order', () => {
    render(<ClientPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /growth, handled for you\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /you have a business to run/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /ai tools, handled for you\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /you run the business\. we handle the growth\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /what we take care of for you/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /why business owners choose prism/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^how it works$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /real businesses need real results/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /questions business owners usually ask/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /stop worrying about tech\. start growing with prism\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders icon-backed problem blocks and handle pills', () => {
    render(<ClientPage />)

    const problemPoints = screen.getAllByTestId('home-problem-point')
    const stackItems = screen.getAllByTestId('home-problem-stack-item')

    expect(problemPoints).toHaveLength(3)
    expect(stackItems).toHaveLength(6)
    expect(
      problemPoints.every((point) => point.querySelector('img')),
    ).toBeTruthy()
    expect(stackItems.every((item) => item.querySelector('img'))).toBeTruthy()
    expect(
      new Set(
        stackItems.map((item) =>
          item.querySelector('img')?.getAttribute('src'),
        ),
      ).size,
    ).toBe(6)
  })

  it('renders the AI tool logo matrix with high-quality SVG assets', () => {
    render(<ClientPage />)

    const toolCards = screen.getAllByTestId('home-ai-tool-card')

    expect(toolCards).toHaveLength(6)
    expect(screen.getByAltText(/codex logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/codex.svg',
    )
    expect(screen.getByAltText(/claude code logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/claude.svg',
    )
    expect(screen.getByAltText(/gemini logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/gemini.svg',
    )
    expect(screen.getByAltText(/openclaw logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/openclaw.svg',
    )
    expect(screen.getByAltText(/grok logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/grok.svg',
    )
    expect(screen.getByAltText(/cursor logo/i)).toHaveAttribute(
      'src',
      '/logos/ai-tools/cursor.svg',
    )
  })
})

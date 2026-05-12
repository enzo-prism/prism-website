import { render, screen } from '@testing-library/react'

import Breadcrumbs from '@/components/breadcrumbs'

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

describe('Breadcrumbs', () => {
  it('renders an accessible breadcrumb trail with readable dark-system styling', () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { name: 'home', url: '/' },
          { name: 'blog', url: '/blog' },
          { name: 'AI growth stack', url: '/blog/ai-growth-stack' },
        ]}
      />,
    )

    const breadcrumbNav = screen.getByRole('navigation', {
      name: 'Breadcrumb',
    })

    expect(breadcrumbNav).toHaveClass('text-muted-foreground')
    expect(breadcrumbNav.className).not.toContain(
      'text-[rgba(15,23,42,0.56)]',
    )
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.queryByText(/^home$/i)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'blog' })).toHaveAttribute(
      'href',
      '/blog',
    )
    expect(screen.getByText('AI growth stack')).toHaveAttribute(
      'aria-current',
      'page',
    )

    const schema = container.querySelector(
      'script[type="application/ld+json"]',
    )
    expect(schema).toBeTruthy()
    expect(JSON.parse(schema?.textContent ?? '{}')).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          item: 'https://www.design-prism.com/',
        }),
        expect.objectContaining({
          name: 'blog',
          item: 'https://www.design-prism.com/blog',
        }),
        expect.objectContaining({
          name: 'AI growth stack',
          item: 'https://www.design-prism.com/blog/ai-growth-stack',
        }),
      ]),
    })
  })

  it('keeps child links on current color so route-level overrides still apply', () => {
    render(
      <Breadcrumbs
        className="text-[#b8afa2]"
        items={[
          { name: 'home', url: '/' },
          { name: 'case studies', url: '/case-studies' },
          {
            name: 'Mataria Dental Group',
            url: '/case-studies/mataria-dental-group',
          },
        ]}
      />,
    )

    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' }),
    ).toHaveClass('text-[#b8afa2]')
    expect(screen.getByRole('link', { name: 'case studies' })).toHaveClass(
      'text-current',
    )
  })
})

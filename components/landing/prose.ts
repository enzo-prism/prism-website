/**
 * Long-form reading styles for the dark system (blog posts, legal pages, SEO
 * explainers). Authored as descendant utilities instead of the Tailwind
 * `prose` plugin so nothing in globals.css (`.dark .prose`, `.prose-blog`)
 * can override them, and so MDX components keep their own classes.
 *
 * Measure: wrap the content in `max-w-[68ch]` (or the article column).
 */
export const proseClassName = [
  // base
  'text-[1.0625rem] leading-[1.8] tracking-[-0.006em] text-foreground/[0.82] sm:text-[1.125rem]',
  '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
  // paragraphs
  '[&_p]:my-6 [&_p]:text-pretty',
  // headings
  '[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-28 [&_:is(h1,h2,h3,h4,h5,h6)]:text-balance [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:text-foreground',
  '[&_h1]:mb-5 [&_h1]:mt-14 [&_h1]:text-[clamp(1.85rem,1.5rem+1.4vw,2.5rem)] [&_h1]:leading-[1.1] [&_h1]:tracking-[-0.035em]',
  '[&_h2]:mb-5 [&_h2]:mt-16 [&_h2]:text-[clamp(1.5rem,1.3rem+0.9vw,2rem)] [&_h2]:leading-[1.15] [&_h2]:tracking-[-0.03em]',
  '[&_h3]:mb-4 [&_h3]:mt-11 [&_h3]:text-[clamp(1.2rem,1.12rem+0.4vw,1.4rem)] [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.02em]',
  '[&_h4]:mb-3 [&_h4]:mt-9 [&_h4]:text-[1.075rem] [&_h4]:leading-snug [&_h4]:tracking-[-0.015em]',
  '[&_h5]:mb-3 [&_h5]:mt-8 [&_h5]:text-base',
  '[&_h6]:mb-3 [&_h6]:mt-8 [&_h6]:text-sm [&_h6]:text-muted-foreground',
  // links (MDX CTA buttons opt out with .mdx-cta)
  '[&_a:not(.mdx-cta)]:font-medium [&_a:not(.mdx-cta)]:text-foreground [&_a:not(.mdx-cta)]:underline [&_a:not(.mdx-cta)]:decoration-white/25 [&_a:not(.mdx-cta)]:decoration-1 [&_a:not(.mdx-cta)]:underline-offset-[5px] [&_a:not(.mdx-cta)]:transition-colors',
  '[&_a:not(.mdx-cta):hover]:decoration-white/70 [&_a:not(.mdx-cta)]:rounded-[2px] [&_a:not(.mdx-cta):focus-visible]:outline-none [&_a:not(.mdx-cta):focus-visible]:ring-[3px] [&_a:not(.mdx-cta):focus-visible]:ring-ring/50',
  // emphasis
  '[&_strong]:font-semibold [&_strong]:text-foreground [&_b]:font-semibold [&_b]:text-foreground [&_em]:text-foreground/90',
  // lists
  '[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6',
  '[&_li]:my-2.5 [&_li]:pl-1.5 [&_li::marker]:text-subtle [&_ol>li::marker]:font-medium [&_ol>li::marker]:tabular-nums',
  '[&_li>p]:my-2 [&_li_ul]:my-2 [&_li_ol]:my-2',
  // blockquote
  '[&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-6 [&_blockquote]:text-[1.15em] [&_blockquote]:leading-[1.6] [&_blockquote]:tracking-[-0.015em] [&_blockquote]:text-foreground',
  '[&_blockquote_p]:my-3',
  // code
  '[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:border [&_:not(pre)>code]:border-white/[0.08] [&_:not(pre)>code]:bg-white/[0.06] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em] [&_:not(pre)>code]:text-foreground',
  '[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/[0.08] [&_pre]:bg-card [&_pre]:p-5 [&_pre]:font-mono [&_pre]:text-[0.875rem] [&_pre]:leading-relaxed [&_pre]:text-foreground/90',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit',
  // media
  '[&_img]:my-10 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-white/[0.08]',
  '[&_figure]:my-10 [&_figure_img]:my-0 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-subtle',
  '[&_iframe]:max-w-full',
  // rules
  '[&_hr]:my-14 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-white/[0.1]',
  // tables (wrap in a scroll container on small screens)
  '[&_table]:my-10 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-[0.95rem] sm:[&_table]:table',
  '[&_thead]:border-b [&_thead]:border-white/15',
  '[&_th]:px-3 [&_th]:py-3 [&_th]:text-left [&_th]:align-bottom [&_th]:font-mono [&_th]:text-[11px] [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:text-subtle',
  '[&_td]:border-b [&_td]:border-white/[0.08] [&_td]:px-3 [&_td]:py-3 [&_td]:align-top',
].join(' ')

export default proseClassName

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Canonical reference**
> README.md + AGENTS.md define the authoritative rules for this repo. Treat this file as supplemental; if anything conflicts, follow those files and update this doc.

## Project Overview

Next.js App Router marketing website for Prism's dental growth systems: websites, SEO/AI search, reviews, ads, tracking, photography, proof, pricing, and the Growth Dashboard to Light Audit funnel. The site is synced with v0.dev and deployed on Vercel through GitHub Actions.

## Essential Commands

```bash
# Development
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm typecheck        # TypeScript checking
pnpm test             # Jest test suite

# Single test
pnpm test -- __tests__/path/to/test.ts
pnpm test -- --testNamePattern="pattern"

# Diagnostics
pnpm diagnose:images  # Image system check
pnpm verify:deploy    # Pre-deployment validation
pnpm seo:inventory     # Render route metadata inventory
pnpm seo:lint          # Validate SEO/search-surface rules
pnpm verify:pricing-consistency

# Case study assets
node scripts/capture-case-study-screenshots.mjs [slug ...]  # Playwright capture of <slug>-home-{desktop,mobile}.jpg

# Git sync (v0.dev/Cursor/Claude coordination)
pnpm git:status       # Check sync health
pnpm git:cleanup      # Clean stale branches
```

## Architecture

### Data Flow
1. **Rendering**: Server Components (default) → Client hydration → Interactive features
2. **Content**: MDX files (`/content/blog/`) → gray-matter → next-mdx-remote → Dynamic imports
3. **Forms**: Formspree + `useFormValidation` hook → Client-side fetch → Thank-you routes
4. **Images**: Custom Image component → Next.js optimization → Retry logic → Fallbacks

### Server vs Client Components
- Server Components by default (no "use client" directive)
- Client Components only for interactivity (onClick, useState, useEffect)
- Form submissions use client-side fetch inside Client Components
- Dynamic imports for heavy client components

### Key Files
| Purpose | Location |
|---------|----------|
| Project map | `docs/project-overview.md` |
| Search visibility | `lib/seo/search-visibility.ts` |
| Canonical pricing | `lib/pricing-model.ts` |
| Public ElevenLabs widget | `lib/elevenlabs-widget.ts`, `components/global-elevenlabs-widget.tsx` |
| Image guidance | `docs/image-best-practices.md`, `docs/image-configuration.md` |
| Case study template | `components/case-study-minimal.tsx`, `components/case-studies/CaseStudyVisualHero.tsx`, `lib/case-study-data.ts` |
| MDX processing | `/lib/mdx.tsx` |
| Image utilities | `/utils/image-utils.ts` |
| Form validation hook | `/hooks/use-form-validation.ts` |
| MDX mock for tests | `__mocks__/mdxremote.js` |

## Critical Patterns

**TypeScript**
- Path alias: `@/*` maps to project root
- Strict mode - avoid `any` types
- Use type imports: `import type { ... }`

**Components**
- Use existing UI components from `/components/ui`
- Use `next/image` for simple route-local images and `CoreImage` for shared marketing surfaces that need fallback/analytics behavior
- Mobile components in `/components/mobile/`
- GPU-accelerated animations only (transform, opacity)

**Documentation**
- Update existing `/docs/*.md` files when changing flows
- Do not create new top-level docs without approval

## Environment Variables

All env vars are optional with sensible fallbacks; none are strictly required for local dev. `NEXT_PUBLIC_BASE_URL` (canonical host for metadata/OG/RSS) is the most impactful. The authoritative reference — Formspree form endpoints, ElevenLabs widget config, Instagram/TikTok tokens, and deploy-check URLs — lives in `.env.example` and [`docs/environment-setup.md`](docs/environment-setup.md). Copy `.env.example` to `.env.local` and fill only what your workflow touches.

## Quick Debugging

| Issue | Solution |
|-------|----------|
| Module not found | `pnpm install` |
| Type errors | `pnpm typecheck` |
| Image failures | `pnpm diagnose:images` |
| Test failures | Check `__mocks__/mdxremote.js` |
| Git sync issues | `pnpm git:status` |

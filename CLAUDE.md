# CLAUDE.md

> **Canonical reference**  
> README.md + AGENTS.md define the authoritative rules for this repo (tooling, architecture, documentation, env vars). Treat this file as supplemental; if anything here conflicts with README/AGENTS, follow those files and update this doc.

## Project Overview
**Prism Website** - A Next.js 15.2.4 marketing website for a design/development agency, automatically synced with v0.dev and deployed on Vercel.

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server (port 3000)
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript type checking
pnpm test         # Run all tests

# Running specific tests
pnpm test -- __tests__/path/to/test.ts
pnpm test -- --testNamePattern="pattern"
pnpm test -- --watch

# Diagnostics
pnpm diagnose:images  # Image system diagnostics
pnpm verify:deploy    # Pre-deployment checks

# MCP Server Management
pnpm mcp:health      # Check MCP server status
pnpm mcp:validate    # Validate MCP configuration

# Git Sync (v0.dev/Cursor/Claude coordination)
pnpm git:status      # Check sync health
pnpm git:cleanup     # Clean stale branches
```

## High-Level Architecture

### Core Application Flow
1. **Page Rendering**: Server Components (default) → Client hydration → Interactive features
2. **Content Pipeline**: MDX files → gray-matter parsing → next-mdx-remote rendering → Dynamic imports
3. **Form Processing**: Formspree endpoints + `useFormValidation` hook → Client-side fetch + redirect → Thank-you routes (Supabase writes happen in `/api/prism-leads` when configured)
4. **Error Handling**: Try/catch → Sentry capture → Error boundaries with fallback UI
5. **Image Loading**: Custom Image component → Next.js optimization → Retry logic → Fallbacks

### Key Architectural Patterns

**Server vs Client Components**
- Server Components by default (no "use client" directive)
- Client Components for interactivity (onClick, useState, useEffect)
- Form submissions use client-side fetch logic (Formspree + redirects) inside Client Components; keep SSR deterministic elsewhere
- Dynamic imports for heavy client components

**Image Optimization System**
- Custom Image component (`/components/image.tsx`) with error handling and retry logic
- Automatic WebP/AVIF conversion, 1-year cache TTL
- Image utilities in `/utils/image-utils.ts`
- Run `pnpm diagnose:images` for diagnostics

**Content Management**
- MDX blog posts in `/content/blog/` with front matter
- Processing via `/lib/mdx.tsx` with security controls
- Dynamic imports for heavy MDX components
- SEO optimization with canonical URLs

**Testing Strategy**
- Jest with ts-jest preset, jsdom environment
- MDX mocked via `__mocks__/mdxremote.js`
- Tests in `__tests__/` directory
- Path aliases work in tests (`@/*`)

**Mobile-First Development**
- Mobile components in `/components/mobile/`
- Device detection hook: `/hooks/use-mobile.tsx`
- Touch targets minimum 44px
- GPU-accelerated animations only

**Git Sync Management**
- Automatic sync between v0.dev, Cursor, and Claude Code
- Branch cleanup for stale branches
- See `/docs/git-sync-management.md` for details

## Critical Patterns

**Development Rules**
- Update existing docs (README/AGENTS or a relevant `/docs/*.md`) whenever you change flows or add functionality; do not create new top-level docs without approval.
- Prefer editing existing components/utilities over creating duplicates.
- Stay scoped to the requested change.

**TypeScript**
- Path alias: `@/*` maps to root
- Strict mode - avoid `any` types
- Use type imports: `import type { ... }`

**Components**
- Use existing UI components from `/components/ui`
- Always use the custom Image component from `/components/image.tsx`
- Implement loading and error states
- Hardware-accelerated animations only

**Required Environment Variables**
See `.env.example` / `docs/environment-setup.md` for the complete list. The critical values today are:
```bash
NEXT_PUBLIC_BASE_URL=                # canonical host
SUPABASE_URL=                        # Supabase project URL (required for lead storage)
SUPABASE_SERVICE_ROLE_KEY=           # Supabase service role key
NEXT_PUBLIC_SUPABASE_URL=            # browser-safe Supabase URL (optional mirror)
RESEND_API_KEY=                      # Email notifications (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=       # Optional GA override
```

## Blog Post Structure

MDX posts in `/content/blog/` require front matter with: title, description, date, category, image, gradientClass, and full openGraph metadata.

## Key Files to Know

**Configuration**
- `next.config.mjs` - Next.js + Sentry config
- `jest.config.ts` - Test configuration
- `middleware.ts` - URL redirects and analytics

**Core Utilities**
- `/components/image.tsx` - Custom Image component (always use this)
- `/lib/mdx.tsx` - MDX processing with security
- `/utils/image-utils.ts` - Image optimization helpers

**Testing**
- `__mocks__/mdxremote.js` - MDX mock for tests
- Tests use patterns: `*.test.ts`, `*.spec.ts`, `*.test.tsx`

## Quick Debugging

**Common Issues**
- Module not found: Run `pnpm install`
- Type errors: Run `pnpm typecheck`
- Image failures: Check the custom Image component, run `pnpm diagnose:images`
- Test failures: Verify MDX mock is working
- Git sync issues: Run `pnpm git:status` and follow recommendations

**v0.dev Deployment**
- Project: https://v0.dev/chat/projects/8xmj81uf3fc
- Changes sync automatically to this repo
- Vercel deploys from main branch

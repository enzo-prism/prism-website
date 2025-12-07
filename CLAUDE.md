# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Canonical reference**
> README.md + AGENTS.md define the authoritative rules for this repo. Treat this file as supplemental; if anything conflicts, follow those files and update this doc.

## Project Overview

Next.js 15 marketing website for Prism design agency, synced with v0.dev and deployed on Vercel.

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
pnpm diag:supabase    # Supabase connectivity check

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
| Custom Image component | `/components/image.tsx` (always use this) |
| MDX processing | `/lib/mdx.tsx` |
| Image utilities | `/utils/image-utils.ts` |
| Form validation hook | `/hooks/useFormValidation` |
| MDX mock for tests | `__mocks__/mdxremote.js` |

## Critical Patterns

**TypeScript**
- Path alias: `@/*` maps to project root
- Strict mode - avoid `any` types
- Use type imports: `import type { ... }`

**Components**
- Use existing UI components from `/components/ui`
- Always use custom Image component from `/components/image.tsx`
- Mobile components in `/components/mobile/`
- GPU-accelerated animations only (transform, opacity)

**Documentation**
- Update existing `/docs/*.md` files when changing flows
- Do not create new top-level docs without approval

## Environment Variables

Required variables (see `.env.example`):
```bash
NEXT_PUBLIC_BASE_URL=              # Canonical host
SUPABASE_URL=                      # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=         # Supabase service role key
RESEND_API_KEY=                    # Email notifications (optional)
```

## Quick Debugging

| Issue | Solution |
|-------|----------|
| Module not found | `pnpm install` |
| Type errors | `pnpm typecheck` |
| Image failures | `pnpm diagnose:images` |
| Test failures | Check `__mocks__/mdxremote.js` |
| Supabase issues | `pnpm diag:supabase` |
| Git sync issues | `pnpm git:status` |

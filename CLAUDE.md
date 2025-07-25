# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Prism Website** - A Next.js 15.2.4 marketing website for a design/development agency, automatically synced with v0.dev and deployed on Vercel.

## Tech Stack
- **Framework**: Next.js 15.2.4 with App Router, TypeScript 5
- **Styling**: Tailwind CSS 3.4.17, shadcn/ui components
- **Content**: MDX blog posts with gray-matter
- **Forms**: React Hook Form + Zod validation → Server actions → Supabase
- **Monitoring**: Sentry (org: `prism-m0`, project: `prism-website`)
- **Testing**: Jest with ts-jest, Testing Library
- **Animation**: Framer Motion 12.23.6

## Essential Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm test             # Run all tests

# Running specific tests
npm test -- __tests__/path/to/test.ts
npm test -- --testNamePattern="pattern"
npm test -- --watch

# Diagnostics
npm run diagnose:images  # Image system diagnostics
npm run verify:deploy    # Pre-deployment checks

# MCP Server Management
npm run mcp:health      # Check MCP server status
npm run mcp:validate    # Validate MCP configuration

# Git Sync (v0.dev/Cursor/Claude coordination)
npm run git:status      # Check sync health
npm run git:cleanup     # Clean stale branches
```

## High-Level Architecture

### Core Application Flow
1. **Page Rendering**: Server Components (default) → Client hydration → Interactive features
2. **Content Pipeline**: MDX files → gray-matter parsing → next-mdx-remote rendering → Dynamic imports
3. **Form Processing**: React Hook Form + Zod → Server actions → Supabase storage
4. **Error Handling**: Try/catch → Sentry capture → Error boundaries with fallback UI
5. **Image Loading**: Custom Image component → Next.js optimization → Retry logic → Fallbacks

### Key Architectural Patterns

**Server vs Client Components**
- Server Components by default (no "use client" directive)
- Client Components for interactivity (onClick, useState, useEffect)
- Form submissions use server actions
- Dynamic imports for heavy client components

**Image Optimization System**
- Custom Image component (`/components/image.tsx`) with error handling and retry logic
- Automatic WebP/AVIF conversion, 1-year cache TTL
- Image utilities in `/utils/image-utils.ts`
- Run `npm run diagnose:images` for diagnostics

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

## MCP Server Integration

**Available Servers:**
- **GitHub** (`mcp__github`) - Repository management, requires `GITHUB_PERSONAL_ACCESS_TOKEN`
- **Supabase** (`mcp__supabase`) - Read-only DB access, project: `ibjqwvkcjdgdifujfnpb`
- **Sentry** (`mcp__sentry`) - Error monitoring, org: `prism-m0`
- **Figma** (`mcp__figma`) - Design files, port 3845

Docker alternative available in `.mcp.docker.json` for isolated environments.

## Critical Patterns

**Development Rules**
- NEVER create files unless absolutely necessary - prefer editing existing files
- NEVER proactively create documentation files (*.md) unless explicitly requested
- NEVER add comments to code unless explicitly requested
- Do what has been asked; nothing more, nothing less

**TypeScript**
- Path alias: `@/*` maps to root
- Strict mode - avoid `any` types
- Use type imports: `import type { ... }`

**Components**
- Use existing UI components from `/components/ui`
- Always use custom Image component from `/components/image.tsx`
- Implement loading and error states
- Hardware-accelerated animations only

**Required Environment Variables**
```bash
GITHUB_PERSONAL_ACCESS_TOKEN=    # MCP GitHub
SUPABASE_ACCESS_TOKEN=          # MCP Supabase
RESEND_API_KEY=                 # Email service
NEXT_PUBLIC_POSTHOG_KEY=        # Analytics
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
- Module not found: Run `npm install`
- Type errors: Run `npm run typecheck`
- Image failures: Check custom Image component, run `npm run diagnose:images`
- Test failures: Verify MDX mock is working

**v0.dev Deployment**
- Project: https://v0.dev/chat/projects/8xmj81uf3fc
- Changes sync automatically to this repo
- Vercel deploys from main branch
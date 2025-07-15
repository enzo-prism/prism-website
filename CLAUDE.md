# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Prism Website** - A Next.js 15.2.4 application built with v0.dev and deployed on Vercel. This is a modern marketing/portfolio website for a design and development agency with comprehensive error monitoring and MCP server integrations.

**Important**: This repository is automatically synced with v0.dev deployments. Changes made on v0.dev are pushed to this repository automatically.

## Tech Stack
- **Framework**: Next.js 15.2.4 with React 19 and App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion
- **Content**: MDX for blog posts with gray-matter
- **Database**: Supabase (project ref: `ibjqwvkcjdgdifujfnpb`)
- **Monitoring**: Sentry (org: `prism-m0`, project: `prism-website`)
- **Testing**: Jest with TypeScript and Testing Library
- **Deployment**: Vercel

## Essential Commands

```bash
# Development
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test            # Run Jest tests

# MCP Server Management
npm run mcp:setup    # Setup MCP servers
npm run mcp:health   # Check MCP server health
npm run mcp:validate # Validate MCP configuration

# Running a single test
npm test -- path/to/test.spec.ts
npm test -- --watch  # Run tests in watch mode
```

## High-Level Architecture

### Directory Structure
- `/app` - Next.js app router pages using file-based routing
  - `/api/store-email` - Email storage API endpoint
  - `/blog/[slug]` - Dynamic blog post routes
  - `/case-studies/[slug]` - Dynamic case study routes
  - Individual route folders (about, services, contact, etc.) with page.tsx files
- `/components` - React components following atomic design principles
  - `/ui` - Base UI components (shadcn/ui)
  - Feature-specific component directories
  - Client-side interactive components marked with "use client"
- `/content/blog` - MDX blog posts with front matter metadata
- `/lib` - Core utilities and configurations
  - MDX processing utilities
  - Constants and shared logic
- `/utils` - Helper functions and shared logic
  - Image optimization and monitoring
  - Analytics tracking
  - Scroll optimization
- `/public` - Static assets (images optimized for web)
- `/types` - TypeScript type definitions
- `/__tests__` - Test files co-located with source

### Key Architectural Patterns

1. **Image Optimization System**
   - Enhanced Next.js Image component with error handling
   - Automatic WebP/AVIF conversion
   - 1-year cache TTL for optimized images
   - Comprehensive monitoring and fallbacks

2. **Content Management**
   - MDX-based blog system with dynamic imports
   - SEO-optimized with canonical URLs and metadata
   - Related content suggestions algorithm
   - Social sharing integration

3. **Error Boundaries & Monitoring**
   - Sentry integration across client/server/edge
   - Custom error boundaries with fallback UI
   - Performance tracking and analytics
   - Redirect tracking in middleware

4. **Form Handling**
   - React Hook Form for complex forms
   - Zod schemas for validation
   - Server-side form processing
   - Progressive enhancement

## MCP Server Integration

### Available MCP Servers

1. **GitHub** (`mcp__github`)
   - Repository and issue management
   - Code search and PR operations
   - Requires: `GITHUB_PERSONAL_ACCESS_TOKEN`

2. **Supabase** (`mcp__supabase`)
   - Read-only database access
   - Schema inspection and queries
   - Project: `ibjqwvkcjdgdifujfnpb`
   - Requires: `SUPABASE_ACCESS_TOKEN`

3. **Sentry** (`mcp__sentry`)
   - Error monitoring and debugging
   - Performance tracking
   - Organization: `prism-m0`
   - Requires: Sentry auth

4. **Figma** (`mcp__figma`)
   - Design file access
   - Asset extraction
   - Requires: Local server on port 3845

### MCP Usage Guidelines
- Always check MCP server health before operations
- Use read-only Supabase access for safety
- Batch operations when possible to avoid rate limits
- Monitor errors via Sentry after deployments

## Development Patterns

### Key Development Rules
- **NEVER create files unless absolutely necessary** - always prefer editing existing files
- **NEVER proactively create documentation files** (*.md, README) unless explicitly requested
- **Do what has been asked; nothing more, nothing less**

### TypeScript Conventions
- Path aliases configured: `@/*` maps to root
- Strict mode enabled - avoid `any` types
- Use type imports: `import type { ... }`
- Co-locate types with components

### Component Patterns
- Use existing UI components from `/components/ui`
- Follow compound component pattern for complex UIs
- Implement proper loading and error states
- Use Framer Motion for animations

### Testing Approach
- Jest configured with TypeScript support (ts-jest preset)
- MDX remote mocked for testing
- Test files in `__tests__` directory
- Test environment: jsdom for React component testing
- Setup file: jest.setup.ts for test configuration
- Focus on user interactions and edge cases

### Performance Considerations
- Use dynamic imports for code splitting
- Implement proper image optimization
- Hardware-accelerated animations only
- Monitor bundle size impacts

## Security & Environment

### Required Environment Variables
```bash
# MCP Server Tokens
GITHUB_PERSONAL_ACCESS_TOKEN=
SUPABASE_ACCESS_TOKEN=

# Sentry (auto-configured by Vercel)
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
```

### Security Best Practices
- Never commit `.env` files
- Use service role tokens appropriately
- SVG files served with CSP headers
- Sanitize user inputs in forms

## Common Development Tasks

### Working with Blog Posts
1. Create MDX file in `/content/blog/`
2. Add front matter with required fields
3. Use dynamic imports for heavy components
4. Test SEO metadata generation

### Adding New Pages
1. Create route in `/app` directory
2. Implement loading and error states
3. Add to sitemap if public-facing
4. Set up proper metadata exports

### Debugging Production Issues
1. Check Sentry MCP for error details
2. Review deployment logs on Vercel
3. Use source maps for stack traces
4. Monitor performance metrics

### Implementing Design Changes
1. Reference Figma MCP for specifications
2. Use existing design tokens
3. Follow responsive design patterns
4. Test across breakpoints

## v0.dev Integration & Deployment

### Project Links
- **v0.dev Project**: https://v0.dev/chat/projects/8xmj81uf3fc
- **Vercel Deployment**: https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design

### Deployment Flow
1. Changes made in v0.dev are automatically synced to this repository
2. Vercel deploys the latest version from this repository
3. Monitor deployment status and errors via Sentry MCP
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Prism Website** (package name: `my-v0-project`) - A Next.js 15.2.4 application built with v0.dev and deployed on Vercel. This is a modern marketing/portfolio website for a design and development agency with comprehensive error monitoring and MCP server integrations.

**Important**: This repository is automatically synced with v0.dev deployments. Changes made on v0.dev are pushed to this repository automatically.

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Claude Code (for enhanced development workflow with MCP servers)

### Quick Start
```bash
# Clone and install
git clone <repository-url>
cd prism-website
npm install

# Set up environment variables
cp .env.example .env.local  # Then add your tokens

# Start development
npm run dev
```

## Tech Stack
- **Framework**: Next.js 15.2.4 with React 19.1.0 and App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form with Zod 3.24.1 validation
- **Animation**: Framer Motion 12.23.6
- **Content**: MDX for blog posts with gray-matter
- **Database**: Supabase (project ref: `ibjqwvkcjdgdifujfnpb`)
- **Monitoring**: Sentry 9.40.0 (org: `prism-m0`, project: `prism-website`)
- **Testing**: Jest 29.7.0 with TypeScript and Testing Library
- **Deployment**: Vercel
- **Analytics**: PostHog integration
- **Email**: Resend for transactional emails

## Essential Commands

```bash
# Development
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm test            # Run Jest tests
npm run format       # Format code with Prettier

# MCP Server Management
npm run mcp:setup       # Setup MCP servers
npm run mcp:health      # Check MCP server health
npm run mcp:test-github # Test GitHub MCP server specifically
npm run mcp:validate    # Validate MCP configuration

# Running a single test
npm test -- path/to/test.spec.ts
npm test -- --watch  # Run tests in watch mode

# Running a single test by pattern
npm test -- --testNamePattern="test name"

# Coverage report
npm test -- --coverage

# Debug mode
npm test -- --detectOpenHandles

# Diagnostics and Verification
npm run diagnose:images  # Run image system diagnostics
npm run verify:deploy    # Verify deployment readiness
npm run verify:images    # Verify all images in public directory

# Mobile Testing & Optimization
node scripts/mobile-testing-suite.js  # Run comprehensive mobile tests
node scripts/mobile-optimization-check.js  # Check mobile optimization

# Additional Scripts
python scripts/update-notion-tasks.py  # Update Notion tasks (requires NOTION_API_TOKEN env var)
node scripts/test-github-mcp.js        # Test GitHub MCP server
node scripts/mcp-health-check.js       # Check all MCP servers health

# Additional useful commands
npm run analyze      # Analyze bundle size
npm run check-updates # Check for dependency updates
```

## High-Level Architecture

### Directory Structure
- `/app` - Next.js app router pages using file-based routing
  - `/api/store-email` - Email storage API endpoint
  - `/api/og` - Open Graph image generation endpoint
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
- `/scripts` - Build and maintenance scripts
  - MCP server setup and health checks
  - Image system diagnostics
  - Deployment verification

### Key Architectural Patterns

1. **Server Components vs Client Components**
   - Server Components by default (no "use client" directive)
   - Client Components for interactivity (onClick, useState, useEffect)
   - Form submissions use server actions
   - Dynamic imports for heavy client components

2. **Image Optimization System**
   - Enhanced Next.js Image component with error handling
   - Automatic WebP/AVIF conversion
   - 1-year cache TTL for optimized images
   - Comprehensive monitoring and fallbacks
   - Custom image processing utilities in `/utils/image.ts`
   - Diagnostic script available: `npm run diagnose:images`

3. **Content Management**
   - MDX-based blog system with dynamic imports
   - SEO-optimized with canonical URLs and metadata
   - Related content suggestions algorithm
   - Social sharing integration
   - Blog posts stored in `/content/blog/` with front matter

4. **Error Boundaries & Monitoring**
   - Sentry integration across client/server/edge
   - Custom error boundaries with fallback UI
   - Performance tracking and analytics
   - Redirect tracking in middleware
   - Automatic error capture with source maps

5. **Form Handling**
   - React Hook Form for complex forms
   - Zod schemas for validation
   - Server-side form processing
   - Progressive enhancement
   - Email storage via Supabase integration

6. **Routing & Middleware**
   - App Router with file-based routing
   - Middleware for URL redirects and analytics
   - Dynamic routes for content (blog, case studies)
   - API routes under `/app/api/`
   - Automatic trailing slash handling

7. **Mobile-First Development**
   - Dedicated mobile components in `/components/mobile/`
   - Mobile-specific hooks for device detection and accessibility
   - Performance optimizations for touch interactions
   - GPU acceleration utilities for smooth animations
   - Comprehensive mobile testing suite
   - Touch target optimization (44px minimum)

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

### MCP Docker Alternative
- Docker configuration available in `.mcp.docker.json`
- GitHub MCP can run in Docker: `ghcr.io/github/github-mcp-server`
- Useful for isolated environments or permission issues

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
- MDX remote mocked for testing (see `__mocks__/mdxremote.js`)
- Test files in `__tests__` directory
- Test environment: jsdom for React component testing
- Setup file: jest.setup.ts for test configuration
- TypeScript config: tsconfig.jest.json for test-specific settings
- Focus on user interactions and edge cases
- Module path mapping configured for `@/*` imports
- Transform configuration for next-mdx-remote module

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

# Additional Services
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### Security Best Practices
- Never commit `.env` files
- Use service role tokens appropriately
- SVG files served with CSP headers
- Sanitize user inputs in forms
- **CRITICAL**: Never hardcode API tokens in scripts - always use environment variables
- Sentry trace sampling is set to 100% - consider reducing for production

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

### Mobile Development
1. Use mobile-specific components from `/components/mobile/`
2. Implement `use-mobile` hook for device detection
3. Ensure touch targets are at least 44px
4. Test with mobile testing suite: `node scripts/mobile-testing-suite.js`
5. Use GPU acceleration utilities for animations
6. Optimize scroll performance with `-webkit-overflow-scrolling: touch`

## v0.dev Integration & Deployment

### Project Links
- **v0.dev Project**: https://v0.dev/chat/projects/8xmj81uf3fc
- **Vercel Deployment**: https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design

### Deployment Flow
1. Changes made in v0.dev are automatically synced to this repository
2. Vercel automatically deploys from the main branch (no manual CI/CD configuration needed)
3. Monitor deployment status and errors via Sentry MCP
4. Verify deployment readiness with: `npm run verify:deploy`

## Code Style & Conventions

### Import Organization
- Group imports: React/Next.js first, then external libraries, then local imports
- Use type imports where possible: `import type { ... }`
- Absolute imports using `@/` path alias

### Component File Structure
```typescript
// 1. Imports
// 2. Type definitions
// 3. Component definition
// 4. Default export
```

### Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `optimizeImage.ts`)
- Routes: kebab-case (e.g., `/case-studies/[slug]`)
- Test files: `*.test.ts`, `*.spec.ts`, or `*.test.tsx` for React components

### Comment Policy
- **NEVER add comments to code unless explicitly requested**
- Code should be self-documenting through clear naming and structure
- Only add comments when the user specifically asks for them

## MCP Server Troubleshooting

### Verification Commands
```bash
# Test GitHub connectivity
npm run mcp:health -- github

# Test Supabase connection
npm run mcp:health -- supabase

# Validate all MCP configurations
npm run mcp:validate
```

### Common Issues
- **Token errors**: Ensure tokens are set in `.env.local`
- **Connection timeouts**: Check network connectivity and firewall settings
- **Permission errors**: Verify token scopes match required permissions

## Important Configuration Files

- `next.config.mjs` - Next.js configuration with Sentry integration and image optimization
- `tsconfig.json` - TypeScript config with strict mode and path aliases
- `tailwind.config.ts` - Tailwind CSS with custom theme and animations
- `jest.config.ts` - Jest configuration with ts-jest preset
- `middleware.ts` - URL redirects and analytics tracking
- `.env.example` - Template for required environment variables
- `.mcp.json` - MCP server configuration (standard npm-based)
- `.mcp.docker.json` - Docker-based MCP configuration for GitHub server
- `.vscode/settings.json` - VS Code/Cursor IDE configuration with TypeScript, ESLint, and Tailwind IntelliSense
- `MCP_SETUP.md` - Detailed MCP server setup instructions
- `package.json` - Dependencies and scripts (check for available commands)
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `jest.setup.ts` - Jest test environment setup
- `sentry.edge.config.ts` - Sentry edge runtime configuration

## Special Files and Patterns

### Mock Files for Testing
- `__mocks__/mdxremote.js` - Mocks next-mdx-remote for Jest tests
- Test files follow patterns: `*.test.ts`, `*.spec.ts`, `*.test.tsx`

### Key Utility Files
- `/utils/image.ts` - Core image component with error handling
- `/utils/image-optimization.ts` - Image processing utilities
- `/utils/analytics.ts` - PostHog analytics wrapper
- `/utils/sentry-helpers.ts` - Sentry error tracking utilities
- `/lib/mdx.tsx` - MDX processing and blog post loading
- `/utils/mobile-performance.ts` - Mobile performance optimization utilities
- `/hooks/use-mobile.tsx` - Mobile device detection hook
- `/hooks/use-mobile-accessibility.tsx` - Mobile accessibility features

### Blog Post Structure
Blog posts in `/content/blog/` require specific front matter:
```yaml
---
title: "Post Title"
publishedAt: "2025-07-01"
summary: "Brief description"
author: "Author Name"
category: "design" | "development" | "creative"
image: "/blog/image.jpg"
featured: true | false
---
```

## Important Reminders

- **Do what has been asked; nothing more, nothing less**
- **NEVER create files unless they're absolutely necessary** for achieving your goal
- **ALWAYS prefer editing an existing file** to creating a new one
- **NEVER proactively create documentation files** (*.md) or README files - only create documentation files if explicitly requested by the User
- **NEVER add comments to code unless explicitly requested**
- **NEVER add emojis to files unless the user explicitly requests them**

## Commonly Used Commands Summary

```bash
# Quick development workflow
npm run dev          # Start dev server on port 3000
npm run lint         # Check code quality
npm run typecheck    # Validate TypeScript types
npm test            # Run all tests

# Test specific file or pattern
npm test -- __tests__/utils/image.test.ts
npm test -- --testNamePattern="optimizeImage"

# Before deploying
npm run verify:deploy    # Check deployment readiness
npm run diagnose:images  # Verify image system health
```

## Critical Architecture Understanding

### Next.js App Router Structure
The application uses Next.js 15's App Router, which means:
- Routes are defined by folder structure in `/app`
- Each route folder needs a `page.tsx` file to be accessible
- Layouts (`layout.tsx`) wrap child routes automatically
- Server Components are the default (no "use client" needed)
- Metadata is exported from page files for SEO

### Component Architecture
1. **Server Components** (default):
   - Can fetch data directly
   - Render on the server
   - Better performance and SEO
   
2. **Client Components** ("use client"):
   - Required for interactivity (useState, useEffect, onClick)
   - Located primarily in `/components` directory
   - Should be kept as small as possible

### Data Flow
1. **Static Content**: MDX files in `/content/blog/`
2. **Dynamic Data**: Supabase integration for email storage
3. **Forms**: Server actions for processing
4. **Analytics**: PostHog client-side tracking
5. **Errors**: Sentry captures across all environments

### Performance Optimization Strategy
1. **Images**: Custom optimization pipeline with monitoring
2. **Code Splitting**: Dynamic imports for heavy components
3. **Caching**: 1-year TTL for optimized assets
4. **Animations**: Hardware-accelerated only (transform, opacity)
5. **Bundle Size**: Monitor imports and tree-shaking

## Common Gotchas and Patterns

### Image Handling
- Always use the custom `Image` component from `/utils/image.ts` instead of Next.js Image directly
- Images require `alt` text for accessibility
- Public images should be placed in `/public/` subdirectories organized by feature

### Form Submissions
- Forms use server actions (not API routes) for processing
- Always validate with Zod schemas on both client and server
- Email storage happens through Supabase integration

### MDX Content
- Blog posts must have valid front matter or they won't load
- Use `getBlogPosts()` from `/lib/mdx.tsx` to load posts
- Dynamic imports for heavy components in MDX content

### Testing Patterns
- Mock next-mdx-remote using the provided mock file
- Use `@testing-library/react` for component testing
- Test files should be co-located in `__tests__` directory

### Environment-Specific Behavior
- Sentry only captures errors in production
- PostHog analytics disabled in development
- MCP servers require proper token configuration
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
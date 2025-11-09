# Prism website design

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8xmj81uf3fc)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design](https://vercel.com/enzo-design-prisms-projects/v0-prism-website-design)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/8xmj81uf3fc](https://v0.dev/chat/projects/8xmj81uf3fc)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Claude Code (for enhanced development workflow)

### MCP Server Integration
This project is configured with MCP (Model Context Protocol) servers for enhanced Claude Code functionality:

- **GitHub**: Repository management and collaboration
- **Supabase**: Database operations and analytics  
- **Sentry**: Error monitoring and debugging
- **Figma**: Design collaboration and asset management

### Quick Start
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: `cp .env.example .env`
4. Fill in your API tokens in `.env`
5. Start development server: `npm run dev`

For detailed MCP server setup and usage, see [MCP_SETUP.md](./MCP_SETUP.md).

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Documentation

Reference guides live in [`/docs`](./docs):

- [Blog Content Architecture](./docs/blog-content-architecture.md) — MDX frontmatter, category taxonomy, RSS feed, and related posts.
- [Blog Styling Guide](./docs/blog-styling-guide.md) — Markdown/MDX formatting expectations.
- [Blog Performance Optimization](./docs/blog-performance-optimization.md) — GPU and layout tuning notes.

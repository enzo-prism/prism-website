# Claude Code Project Context

## Project Overview
**Prism Website** - A Next.js-based website built with v0.dev and deployed on Vercel. This is a modern React application with TypeScript, comprehensive error monitoring, and enhanced development workflow through MCP server integrations.

## Tech Stack
- **Framework**: Next.js 15.2.4 with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Monitoring**: Sentry
- **Database**: Supabase
- **Design**: Figma integration

## MCP Server Capabilities

### GitHub MCP Server
**Purpose**: Repository management and collaboration
**Capabilities**:
- Create, read, update issues and pull requests
- Search repositories and code
- Manage branches and commits
- Access repository metadata and statistics
- Review and comment on PRs

**Common Use Cases**:
- Creating issues for bugs or features
- Searching for specific code patterns
- Reviewing PR changes and providing feedback
- Checking repository status and recent activity

### Supabase MCP Server
**Purpose**: Database operations and management
**Capabilities**:
- Read-only database queries
- Schema inspection
- Table data analysis
- Query optimization insights
- Database health monitoring

**Project Context**:
- Project ref: `ibjqwvkcjdgdifujfnpb`
- Configured in read-only mode for safety
- Access via service role token

**Common Use Cases**:
- Analyzing user data patterns
- Debugging database-related issues
- Generating reports from stored data
- Optimizing database queries

### Sentry MCP Server
**Purpose**: Error monitoring and debugging
**Capabilities**:
- View recent errors and exceptions
- Analyze error trends and patterns
- Access stack traces and error context
- Monitor performance metrics
- Manage issue status and resolution

**Project Context**:
- Organization: `prism-m0`
- Project: `prism-website`
- Comprehensive error tracking for client/server/edge

**Common Use Cases**:
- Investigating production errors
- Monitoring application performance
- Tracking error resolution progress
- Analyzing user impact of issues

### Figma MCP Server
**Purpose**: Design collaboration and asset management
**Capabilities**:
- Access design files and components
- Extract design tokens and assets
- Review design specifications
- Track design system usage

**Setup Note**: Requires local Figma MCP server running on port 3845

**Common Use Cases**:
- Implementing designs accurately
- Extracting design tokens for CSS
- Reviewing design specifications
- Ensuring design-development consistency

## Development Workflow

### Commands & Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Key Directories
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/docs` - Project documentation
- `/public` - Static assets

### Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in required tokens:
   - `GITHUB_PERSONAL_ACCESS_TOKEN`
   - `SUPABASE_ACCESS_TOKEN`
3. Ensure Figma MCP server is running locally (if needed)

## Best Practices for Claude Code

### When to Use Each MCP Server
- **GitHub**: For any repository operations, issue management, or code collaboration
- **Supabase**: For database queries, data analysis, or backend debugging
- **Sentry**: For error investigation, performance monitoring, or production debugging
- **Figma**: For design implementation, asset extraction, or design system work

### Development Guidelines
- Always run `npm run lint` before committing
- Use TypeScript strictly - avoid `any` types
- Follow existing component patterns
- Test changes with `npm test`
- Monitor errors via Sentry MCP after deployments

### Security Notes
- All MCP servers use environment variables for authentication
- Supabase is configured in read-only mode
- Never commit actual tokens to version control
- Use MCP servers responsibly to avoid API rate limits

## Common Tasks

### Adding New Features
1. Use GitHub MCP to create/assign issues
2. Check Figma MCP for design specifications
3. Implement with proper TypeScript typing
4. Test thoroughly with Jest
5. Monitor via Sentry MCP after deployment

### Debugging Issues
1. Check Sentry MCP for error details and stack traces
2. Use Supabase MCP to investigate data-related issues
3. Use GitHub MCP to search for similar issues or solutions
4. Update issue status via GitHub MCP when resolved

### Performance Optimization
1. Use Sentry MCP to identify performance bottlenecks
2. Analyze database queries via Supabase MCP
3. Optimize based on real user data
4. Monitor improvements via Sentry MCP

This context should help Claude Code provide more targeted and effective assistance for this project.
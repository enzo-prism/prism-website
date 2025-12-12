# Sentry Integration Setup Guide

## Overview
This project is configured with Sentry for comprehensive error monitoring, performance tracking, and debugging support. The setup includes both client and server-side monitoring with MCP server integration for enhanced development workflow.

## Configuration Details

### Project Information
- **Sentry Organization**: `prism-m0`
- **Project Name**: `prism-website`
- **Project Slug**: `prism-website`
- **DSN**: `https://68c104f36835243619e583be41896f33@o4508365743325184.ingest.us.sentry.io/4509559921049600`

### Files Added/Modified

#### Configuration Files
- `instrumentation.ts` - Main instrumentation file for server and edge runtime
- `instrumentation-client.ts` - Client-side Sentry initialization
- `sentry.server.config.ts` - Server-side Sentry configuration
- `sentry.edge.config.ts` - Edge runtime Sentry configuration
- `.env.local` - Environment variables for local development
- `next.config.mjs` - Updated with Sentry webpack plugin integration

#### Error Handling
- `app/global-error.tsx` - Global error boundary with Sentry integration

## Features Enabled

### Error Tracking
- Client-side JavaScript errors
- Server-side Node.js errors
- Edge runtime errors
- React rendering errors via global error boundary

### Performance Monitoring
- 100% trace sampling in development
- Automatic performance tracking
- Core Web Vitals monitoring

### Session Replay
- 10% session sampling
- 100% error session capture
- Privacy-focused with text/media masking

### Additional Features
- Source map uploads for better stack traces
- Automatic Vercel Cron Monitor integration
- Ad-blocker circumvention via tunneling route (`/monitoring`)

## MCP Server Integration

The project is configured to work with the Sentry MCP server for enhanced development workflow:

### Available MCP Commands
- View and manage issues directly from development environment
- Access error details and stack traces
- Update issue status and assignments
- Monitor project health and performance

### MCP Configuration
The Sentry MCP server is configured in `~/.cursor/mcp.json`:
```json
{
  "Sentry": {
    "command": "npx",
    "args": ["-y", "mcp-remote@latest", "https://mcp.sentry.dev/mcp"]
  }
}
```

## Environment Variables

### Required for Production
```bash
SENTRY_DSN=https://68c104f36835243619e583be41896f33@o4508365743325184.ingest.us.sentry.io/4509559921049600
SENTRY_ORG=prism-m0
SENTRY_PROJECT=prism-website
```

### Optional Environment Variables
```bash
# Suppress specific warnings
SENTRY_SUPPRESS_INSTRUMENTATION_FILE_WARNING=1
SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING=1

# Authentication token for source map uploads (production only)
SENTRY_AUTH_TOKEN=your_auth_token_here
```

## Development Workflow

### Testing Error Tracking
To test that Sentry is working correctly:

1. **Client-side error test**: Add a button that throws an error
2. **Server-side error test**: Create an API route that throws an error
3. **Build error test**: Run `pnpm build` to ensure source maps upload correctly

### Using MCP Commands
From your development environment, you can:
- Check recent issues: Use MCP to find issues in the project
- Monitor performance: View transaction data and performance metrics
- Debug errors: Get detailed error information with stack traces

### Error Resolution Workflow
1. **Error Detection**: Sentry automatically captures and reports errors
2. **Investigation**: Use MCP commands to get error details and context
3. **Resolution**: Fix the error in code
4. **Verification**: Use MCP to mark issues as resolved and monitor for recurrence

## Troubleshooting

### Common Issues

1. **Build warnings about deprecated files**
   - Modern configuration uses `instrumentation.ts` and `instrumentation-client.ts`
   - Legacy `sentry.*.config.ts` files can be deleted if no longer used

2. **Source maps not uploading**
   - Ensure `SENTRY_AUTH_TOKEN` is set in production environment
   - Check that the organization and project slugs are correct

3. **MCP server not responding**
   - Verify MCP configuration in `~/.cursor/mcp.json`
   - Ensure network connectivity to `https://mcp.sentry.dev/mcp`

### Debugging Steps
1. Check console for Sentry initialization messages
2. Verify environment variables are loaded correctly
3. Test with intentional errors to confirm error reporting
4. Use MCP commands to verify connection to Sentry API

## Best Practices

### Error Handling
- Always use the global error boundary for React rendering errors
- Implement specific error boundaries for critical components
- Log context information with errors using Sentry's context APIs

### Performance Monitoring
- Adjust trace sampling rates based on traffic volume
- Use custom transactions for critical business logic
- Monitor Core Web Vitals for user experience insights

### Privacy and Security
- Session replay is currently disabled to keep bundles small; if you re-enable it, review privacy settings first
- Ensure sensitive data is not logged in error contexts
- Use Sentry's data scrubbing features for compliance

## Next Steps

1. **Add custom error boundaries** for specific components
2. **Implement performance monitoring** for critical user flows
3. **Set up alerts** in Sentry dashboard for critical errors
4. **Configure release tracking** for deployment monitoring
5. **Add custom instrumentation** for business-specific metrics

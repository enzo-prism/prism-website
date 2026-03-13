# MCP Server Setup for Claude Code

This repo only needs a small MCP story today. For normal Prism website work, the useful servers are GitHub, Sentry, and optionally Figma.

Supabase is not part of the current Prism website runtime or canonical workflow. If a future project in this repo needs a database MCP again, document it as a fresh addition instead of assuming old Supabase setup notes still apply.

## Active MCP surfaces

### GitHub MCP Server
- repository browsing
- issues / pull requests
- commit history and code search

### Sentry MCP Server
- production error review
- stack traces and issue trends
- release health debugging

### Figma MCP Server (optional)
- design inspection
- token/spec extraction
- design-to-code support

## Quick setup

1. Copy the env template if you need local overrides:
   ```bash
   cp .env.example .env.local
   ```
2. Add the tokens you actually use.
3. Verify MCP health:
   ```bash
   pnpm mcp:health
   pnpm mcp:validate
   ```

## GitHub token setup

Create a fine-grained GitHub personal access token with repo read access plus issue / pull request permissions, then store it in `.env.local`:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

## Figma note

If you use the local Figma MCP server, make sure it is running before asking for Figma context. If you do not use Figma in a given session, it is fine to leave that server disconnected.

## Useful checks

```bash
pnpm mcp:health
pnpm mcp:validate
pnpm mcp:test-github
```

## Cursor / VS Code note

This repo includes editor settings for MCP-aware workflows in `.vscode/settings.json`. Keep those settings aligned with the actual servers you use; do not leave stale references to optional tools that the project no longer relies on.

## Troubleshooting

- If GitHub MCP fails, verify the token is present and still valid.
- If Figma MCP fails, confirm the local server is running.
- If Sentry MCP fails, re-check the remote endpoint and org/project configuration.
- After changing MCP-related env vars, restart the app/session you use for MCP clients.

## Security

- Never commit live tokens.
- Use the minimum permissions that still let the tool do its job.
- Rotate tokens when people/ownership change.

This setup ensures Claude Code has comprehensive access to your development tools while maintaining security best practices.

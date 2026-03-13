# MCP Server Maintenance & Troubleshooting

Keep MCP maintenance intentionally small for this repo. The Prism website mainly benefits from:

- GitHub MCP
- Sentry MCP
- optional Figma MCP

Supabase is not part of the current Prism website runtime or canonical website workflow. If a future project in this repo adds a database MCP again, document it as a new workflow instead of assuming older Supabase notes still apply.

## Monthly checklist

- Rotate the GitHub token if ownership or permissions changed.
- Run:
  ```bash
  pnpm mcp:health
  pnpm mcp:validate
  ```
- Confirm any optional servers you actively use are still reachable:
  - Sentry
  - Figma (if you run it locally)
- Remove stale MCP config entries when a server is no longer part of the team’s actual workflow.

## Weekly quick check

```bash
pnpm mcp:health
```

Watch for:

- token expiry
- connectivity failures
- stale local config

## Server-specific notes

### GitHub

- Re-check the PAT if repository reads or writes start failing.
- If rate limits show up, narrow the queries before expanding token scope.

### Sentry

- Validate remote connectivity if issue lookups fail.
- Keep org/project identifiers aligned with the current Prism setup.

### Figma

- Only maintain the local Figma MCP server if the team is actively using Figma-driven implementation work.
- If it is not being used, disable or remove the local config instead of leaving a broken endpoint around.

## Troubleshooting

### MCP server not responding

1. Run `pnpm mcp:health`.
2. Confirm the relevant token or local endpoint still exists.
3. Restart the app/session using the MCP config.

### GitHub auth failures

1. Re-check `GITHUB_PERSONAL_ACCESS_TOKEN`.
2. Verify the token still has the repo permissions you expect.
3. Retry with `pnpm mcp:test-github`.

### Figma local connection refused

1. Confirm the local Figma MCP server is running.
2. If you are not using Figma right now, disable that server entry instead of carrying a broken local dependency.

## Debug helpers

```bash
pnpm mcp:health
pnpm mcp:validate
pnpm mcp:test-github
python -m json.tool .mcp.json
```

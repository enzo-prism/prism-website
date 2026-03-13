# MCP Server Workflows & Usage Examples

This file focuses on the MCP flows Prism still actively benefits from during website work: GitHub, Sentry, and optional Figma.

## Core workflows

### Feature work

1. Planning and tracking
   - Use GitHub MCP to inspect open issues, related PRs, and recent commits.
2. Design implementation
   - Use Figma MCP when the task starts from a design file or component spec.
3. Release follow-through
   - Use Sentry MCP to understand current production risk before or after shipping.

### Bug investigation

1. Find the issue
   - Start with Sentry MCP for current production failures.
2. Trace the code
   - Use GitHub MCP to inspect the relevant files, diffs, and recent changes.
3. Confirm the fix
   - Re-check Sentry after the change ships or after a preview is validated.

### Release confidence

1. Use GitHub MCP to review the branch, PR, and recent merge history.
2. Use Sentry MCP to check for fresh regressions or elevated issue volume.
3. Use Figma MCP only if the release includes design-sensitive UI work.

## Useful prompt patterns

### GitHub

```text
"Show me the latest PRs that need review"
"What changed on main today?"
"Search the repo for where this component is used"
"Summarize the last failed deploy-related commit"
```

### Sentry

```text
"What are the top production errors today?"
"Show me the latest stack trace for this issue"
"Did error volume spike after the last deploy?"
```

### Figma

```text
"Pull the specs for this component from Figma"
"What spacing and typography does this design use?"
"Generate design context for this node"
```

## Scope reminder

This repo does not have a canonical database MCP workflow anymore. If a future project in this codebase needs a data or schema MCP again, add fresh documentation for that use case instead of assuming the older Supabase examples still apply.

## Best practices

1. Be specific in MCP asks.
2. Prefer GitHub plus local code inspection for implementation questions.
3. Use Sentry for production truth, not guesswork.
4. Treat optional/local servers like Figma as opt-in, not always-on requirements.

# MCP Server Setup for Claude Code

This project is configured with MCP (Model Context Protocol) servers for enhanced Claude Code functionality.

## Available MCP Servers

### GitHub MCP Server
**Purpose**: Repository management and collaboration
- View and manage issues, pull requests, and repositories
- Search code across the organization
- Access commit history and branch information
- Manage project boards and discussions

### Supabase MCP Server  
**Purpose**: Database operations and analytics
- Execute read-only database queries
- Inspect table schemas and relationships
- Analyze data patterns and generate insights
- Monitor database performance and health

### Sentry MCP Server
**Purpose**: Error monitoring and debugging
- View recent errors and exceptions
- Analyze error trends and user impact
- Access detailed stack traces and context
- Monitor application performance metrics

### Figma MCP Server
**Purpose**: Design collaboration and asset management
- Access design files and component libraries
- Extract design tokens and CSS specifications
- Review design handoffs and specifications
- Ensure design-development consistency

## Detailed Setup Instructions

### 1. Environment Variables Setup

First, copy the example environment file:
```bash
cp .env.example .env
```

### 2. Token Generation & Configuration

#### GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/personal-access-tokens/new)
2. Create a **Fine-grained personal access token** with:
   - **Resource owner**: Your organization or personal account
   - **Repository access**: All repositories (or selected repositories)
   - **Permissions**:
     - Repository permissions: Contents (Read), Issues (Read/Write), Pull requests (Read/Write), Metadata (Read)
     - Account permissions: None needed
3. Copy the token and add to `.env`:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
   ```

#### Supabase Access Token
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `ibjqwvkcjdgdifujfnpb`
3. Navigate to **Settings > API**
4. Copy the **service_role** key (not the anon key)
5. Add to `.env`:
   ```bash
   SUPABASE_ACCESS_TOKEN=sbp_your_token_here
   ```

#### Figma Setup (Optional)
The Figma MCP server requires a local server running. To set up:
1. Install the Figma MCP server locally
2. Start the server on port 3845
3. Ensure it's running before using Claude Code

### 3. Verification & Testing

#### Test MCP Server Connectivity
Run these commands to verify your setup:

```bash
# Test GitHub connection
curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
     https://api.github.com/user

# Test Supabase connection  
curl -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
     https://ibjqwvkcjdgdifujfnpb.supabase.co/rest/v1/

# Test Figma connection (if running locally)
curl http://127.0.0.1:3845/health
```

#### Verify Claude Code Integration
1. Open Claude Code in this project directory
2. Ask Claude to list recent GitHub issues - it should access them via MCP
3. Ask Claude to describe your Supabase database schema
4. Ask Claude to check recent Sentry errors

## Usage Examples

### GitHub MCP Server
```
# Example Claude Code interactions:
"Show me the recent issues in this repository"
"Create a new issue for the bug I just described"
"What are the latest pull requests that need review?"
"Search for functions named 'handleAuth' across the codebase"
```

### Supabase MCP Server
```
# Example Claude Code interactions:
"Show me the database schema for the users table"
"How many active users do we have this month?"
"What are the most common error types in our logs table?"
"Analyze the user signup patterns from last week"
```

### Sentry MCP Server
```
# Example Claude Code interactions:
"What are the most recent errors in production?"
"Show me the error rate trend for the past 24 hours"
"What's the stack trace for the latest JavaScript error?"
"How many users were affected by the recent API errors?"
```

### Figma MCP Server
```
# Example Claude Code interactions:
"What are the design tokens for the primary button?"
"Show me the specifications for the new header component"
"Extract the color palette from the design system"
"What are the spacing values used in the mobile layout?"
```

## Troubleshooting

### Common Issues

#### "MCP server not responding"
- **Cause**: Environment variables not properly set
- **Solution**: Verify `.env` file exists and tokens are correct
- **Test**: Run verification commands above

#### "GitHub API rate limit exceeded"
- **Cause**: Too many API calls or token lacks proper permissions
- **Solution**: Wait for rate limit reset or upgrade token permissions
- **Prevention**: Use GitHub Apps instead of personal access tokens for high-usage scenarios

#### "Supabase unauthorized"
- **Cause**: Wrong token type or insufficient permissions
- **Solution**: Ensure you're using the **service_role** key, not the anon key
- **Note**: Service role key has full database access - keep it secure

#### "Figma server connection refused"
- **Cause**: Local Figma MCP server not running
- **Solution**: Start the Figma MCP server on port 3845
- **Alternative**: Comment out Figma server in `.mcp.json` if not needed

#### "Sentry organization not found"
- **Cause**: Sentry MCP server authentication issue
- **Solution**: Verify organization slug is correct in Sentry setup
- **Note**: No additional tokens needed for Sentry MCP server

### Debug Steps
1. Check `.env` file exists and has correct variable names
2. Verify tokens have not expired
3. Test API connectivity using curl commands above
4. Check Claude Code console for detailed error messages
5. Restart Claude Code session after making configuration changes

### Getting Help
- **MCP Server Issues**: Check [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
- **Token Issues**: Refer to service provider documentation (GitHub, Supabase, etc.)
- **Project-Specific**: Check project issues or ask team members

## Security Best Practices

### Environment Variables
- Never commit `.env` files to version control
- Use different tokens for development vs production
- Regularly rotate access tokens
- Use minimal required permissions for each token

### Token Management
- Store tokens securely (use password managers)
- Don't share tokens in chat or documentation
- Use organization-level tokens when possible
- Monitor token usage and access logs

### MCP Server Security
- Supabase is configured in read-only mode for safety
- GitHub token should have minimal required permissions
- Figma server should only run when needed
- Monitor MCP server access logs regularly

This setup ensures Claude Code has comprehensive access to your development tools while maintaining security best practices.
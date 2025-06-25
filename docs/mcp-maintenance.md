# MCP Server Maintenance & Troubleshooting

This document covers maintenance procedures, updates, and troubleshooting for MCP servers in the Prism website project.

## Regular Maintenance Tasks

### 🔄 Monthly Maintenance Checklist

#### Token Management
- [ ] **Rotate GitHub Personal Access Token**
  - Generate new token with same permissions
  - Update `.env` file
  - Test connectivity with `npm run mcp:health`
  - Revoke old token

- [ ] **Review Supabase Access Token**
  - Verify service role key is still active
  - Check for any permission changes
  - Update if needed

- [ ] **Audit MCP Server Usage**
  - Review Claude Code session logs
  - Check for any unauthorized access
  - Monitor API usage patterns

#### Configuration Updates
- [ ] **Update MCP Server Versions**
  - Check for Supabase MCP server updates
  - Update GitHub MCP server image
  - Test Sentry MCP server connectivity

- [ ] **Review Environment Variables**
  - Ensure all required variables are present
  - Check for any new requirements
  - Update `.env.example` if needed

#### Health Monitoring
- [ ] **Run Comprehensive Health Check**
  ```bash
  npm run mcp:validate
  ```

- [ ] **Test All MCP Server Functions**
  - GitHub: Create test issue, list repositories
  - Supabase: Query test data, check schema
  - Sentry: View recent errors, check alerts
  - Figma: Verify local server connectivity (if used)

### 🔧 Weekly Health Checks

Run automated health check:
```bash
# Quick health check
npm run mcp:health

# Full validation
npm run mcp:validate
```

Monitor for:
- API rate limit usage
- Token expiration warnings
- Server connectivity issues
- Performance degradation

## Updating MCP Servers

### GitHub MCP Server Updates

The GitHub MCP server runs in Docker, so updates are automatic when pulling the latest image:

```bash
# Check current version
docker images ghcr.io/github/github-mcp-server

# Pull latest version
docker pull ghcr.io/github/github-mcp-server:latest

# Test updated version
npm run mcp:health
```

### Supabase MCP Server Updates

The Supabase MCP server is installed via NPX with the `@latest` tag:

```bash
# The server auto-updates on each run due to @latest tag
# To check for updates manually:
npm view @supabase/mcp-server-supabase version

# Test after updates
npm run mcp:health
```

### Sentry MCP Server Updates

The Sentry MCP server is remote and automatically maintained:

```bash
# Test connectivity to verify service health
curl -s https://mcp.sentry.dev/mcp

# Run health check
npm run mcp:health
```

### Figma MCP Server Updates

If using the Figma MCP server locally:

```bash
# Update local Figma MCP server (varies by installation method)
# Check Figma documentation for specific update procedures

# Test connectivity
curl http://127.0.0.1:3845/health
```

## Troubleshooting Guide

### 🚨 Common Issues & Solutions

#### Issue: "MCP server not responding"

**Symptoms:**
- Claude Code reports MCP server unavailable
- Health check fails for specific server
- API requests timeout

**Diagnosis:**
```bash
# Run health check to identify failing server
npm run mcp:health

# Test specific connections
curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" https://api.github.com/user
curl -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" https://ibjqwvkcjdgdifujfnpb.supabase.co/rest/v1/
```

**Solutions:**
1. **Check environment variables:**
   ```bash
   # Verify .env file exists and has correct values
   cat .env | grep -E "(GITHUB|SUPABASE)_.*_TOKEN"
   ```

2. **Verify token validity:**
   - GitHub: Check token hasn't expired or been revoked
   - Supabase: Ensure service role key is still active

3. **Restart MCP servers:**
   - Docker GitHub server restarts automatically
   - Supabase server is stateless (NPX-based)
   - Test connectivity after restart

#### Issue: "Rate limit exceeded"

**Symptoms:**
- GitHub API returns 403 status
- Requests fail with rate limit messages
- Temporary service unavailability

**Diagnosis:**
```bash
# Check current rate limit status
curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
     -I https://api.github.com/rate_limit
```

**Solutions:**
1. **Wait for rate limit reset** (check `X-RateLimit-Reset` header)
2. **Optimize query patterns** (be more specific in requests)
3. **Consider GitHub App** for higher rate limits (for heavy usage)

#### Issue: "Authentication failed"

**Symptoms:**
- 401 Unauthorized responses
- Token validation failures
- Permission denied errors

**Diagnosis:**
```bash
# Test token validity
npm run mcp:health

# Check token permissions (GitHub)
curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
     https://api.github.com/user
```

**Solutions:**
1. **Regenerate tokens** with proper permissions
2. **Update environment variables** with new tokens
3. **Verify token scope** matches required permissions

#### Issue: "Figma server connection refused"

**Symptoms:**
- Connection refused to localhost:3845
- Figma MCP server not responding
- Health check fails for Figma

**Diagnosis:**
```bash
# Check if Figma server is running
curl http://127.0.0.1:3845/health
netstat -an | grep 3845
```

**Solutions:**
1. **Start Figma MCP server** on port 3845
2. **Check port availability** (no conflicts)
3. **Disable Figma in .mcp.json** if not needed:
   ```json
   {
     "mcpServers": {
       // Comment out or remove figma section
       // "figma": { "url": "http://127.0.0.1:3845/sse" }
     }
   }
   ```

### 🔍 Advanced Debugging

#### Enable Debug Logging

Add environment variable for verbose logging:
```bash
# Add to .env file
DEBUG=mcp:*
```

#### Monitor API Usage

Track API calls and responses:
```bash
# GitHub API usage
curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
     https://api.github.com/rate_limit

# Supabase connection health
curl -v -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
     https://ibjqwvkcjdgdifujfnpb.supabase.co/rest/v1/
```

#### Validate MCP Configuration

Check `.mcp.json` syntax and structure:
```bash
# Validate JSON syntax
python -m json.tool .mcp.json

# Check required server configurations
node -e "console.log(JSON.stringify(require('./.mcp.json'), null, 2))"
```

## Performance Optimization

### 🚀 Optimization Strategies

#### Query Optimization
- Use specific date ranges instead of open-ended queries
- Apply filters to limit data scope
- Batch related operations together
- Cache results when appropriate

#### Rate Limit Management
- Monitor API usage patterns
- Implement request queuing for high-volume operations
- Use webhooks instead of polling when possible
- Consider upgrading to higher tier plans if needed

#### Connection Pooling
- Reuse connections when possible
- Monitor connection counts
- Close unused connections
- Implement connection retry logic

### 📊 Performance Monitoring

#### Metrics to Track
- API response times
- Error rates and types
- Rate limit utilization
- Connection success rates

#### Monitoring Commands
```bash
# Quick performance check
time npm run mcp:health

# Detailed connection testing
time curl -w "%{time_total}\n" -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" https://api.github.com/user
```

## Backup & Recovery

### 🗄️ Configuration Backup

Regular backup of MCP configuration:
```bash
# Backup MCP configuration
cp .mcp.json .mcp.json.backup
cp .env.example .env.example.backup

# Store in version control (without secrets)
git add .mcp.json .env.example
git commit -m "Backup MCP configuration"
```

### 🔄 Recovery Procedures

#### Configuration Recovery
```bash
# Restore from backup
cp .mcp.json.backup .mcp.json

# Regenerate environment file
cp .env.example .env
# Manually fill in tokens

# Validate recovery
npm run mcp:validate
```

#### Token Recovery
1. **GitHub Token:**
   - Go to GitHub Settings > Personal Access Tokens
   - Generate new token with same permissions
   - Update `.env` file

2. **Supabase Token:**
   - Access Supabase Dashboard
   - Navigate to Settings > API
   - Copy service role key
   - Update `.env` file

## Security Best Practices

### 🔒 Security Checklist

#### Token Security
- [ ] Store tokens in `.env` (never in code)
- [ ] Use minimal required permissions
- [ ] Regularly rotate tokens
- [ ] Monitor token usage logs
- [ ] Revoke unused or compromised tokens

#### Environment Security
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Use different tokens for dev/prod
- [ ] Restrict token access by IP (when possible)
- [ ] Monitor for unauthorized access attempts

#### MCP Server Security
- [ ] Use read-only permissions when possible
- [ ] Monitor API usage for anomalies
- [ ] Keep MCP servers updated
- [ ] Audit access logs regularly

### 🛡️ Incident Response

#### Security Incident Checklist
1. **Immediate Response:**
   - Revoke compromised tokens
   - Change environment variables
   - Check for unauthorized changes

2. **Investigation:**
   - Review access logs
   - Identify scope of compromise
   - Document incident details

3. **Recovery:**
   - Generate new tokens
   - Update all affected systems
   - Verify system integrity

4. **Prevention:**
   - Update security procedures
   - Implement additional monitoring
   - Train team on security practices

This maintenance guide ensures your MCP servers remain secure, performant, and reliable for enhanced Claude Code development workflows.
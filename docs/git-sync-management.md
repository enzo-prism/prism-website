# Git Sync Management System

## Overview

This system solves the recurring git synchronization issues between v0.dev, Cursor IDE, and Claude Code by providing automated monitoring, conflict detection, and intelligent branch management.

## Root Cause Analysis

### The Problem
- **Three-way development conflict**: v0.dev, Cursor, and Claude Code all make changes independently
- **Branch pollution**: 200+ stale feature branches from different tools
- **No coordination**: Tools don't know when others have made changes
- **Manual intervention required**: Constant need to resolve sync conflicts

### The Solution
1. **Real-time sync monitoring** - Detects issues before they become blocking
2. **Intelligent git hooks** - Coordinates between tools automatically  
3. **Automated branch cleanup** - Removes stale branches systematically
4. **Tool-specific workflows** - Each tool has defined responsibilities

## Tools and Scripts

### 1. Git Sync Monitor (`scripts/git-sync-monitor.js`)

**Purpose**: Real-time monitoring of git synchronization health

**Features**:
- Detects commits ahead/behind remote
- Identifies uncommitted changes
- Monitors branch pollution (too many remote branches)
- Generates actionable recommendations
- Creates JSON reports for automation

**Usage**:
```bash
pnpm git:status    # Quick health check
pnpm git:report    # Detailed report
pnpm git:sync      # Fetch and check status
```

**Sample Output**:
```
=== Git Sync Health Report ===
Branch: main
Ahead: 0 | Behind: 0
Clean: ✅
Remote Branches: 25

✅ No sync issues detected

📋 Recommendations:
1. Repository is in sync - safe for multi-tool development
```

### 2. Branch Cleanup System

#### Interactive Cleanup (`scripts/git-branch-cleanup.js`)
- Categorizes branches by tool (Cursor, Codex, v0.dev)
- Identifies merged and stale branches
- Interactive confirmation for safety
- Detailed reporting on cleanup actions

#### Batch Cleanup (`scripts/git-batch-cleanup.sh`)  
- Fast cleanup using native git commands
- Handles large numbers of branches efficiently
- Focuses on merged and very old branches
- Non-interactive for automation

**Usage**:
```bash
pnpm git:cleanup-dry    # Preview what would be deleted
pnpm git:cleanup        # Interactive cleanup
./scripts/git-batch-cleanup.sh    # Fast batch cleanup
```

### 3. Intelligent Git Hooks (`scripts/setup-git-hooks.js`)

**Purpose**: Coordinates between v0.dev, Cursor, and Claude Code workflows

**Hooks Installed**:

#### Pre-commit Hook
- Detects which tool is committing (Cursor/Claude Code/v0.dev)
- Runs sync health checks
- Validates TypeScript for development tools
- Prevents commits when sync issues exist

#### Pre-push Hook
- Warns about repository sync status
- Runs build validation for main branch pushes
- Identifies tool-specific branch pushes

#### Post-merge Hook
- Notifies about dependency changes
- Updates sync status after merges
- Suggests necessary actions

#### Commit-msg Hook
- Auto-adds tool attribution to commits
- Ensures consistent commit message format
- Validates message length

**Installation**:
```bash
pnpm git:hooks-install    # Install hooks
pnpm git:hooks-remove     # Remove hooks
```

## Workflow Coordination

### v0.dev Integration
- Automatically pushes changes to repository
- Commits are detected by tool attribution
- Hooks allow v0.dev commits even if minor sync issues exist
- Branch cleanup excludes recent v0.dev branches

### Cursor IDE Integration
- Creates `cursor/` prefixed branches
- Pre-commit hooks validate TypeScript
- Automatic attribution in commit messages
- Branch cleanup handles old cursor branches

### Claude Code Integration
- Creates `codex/` prefixed branches  
- Comprehensive sync checking before commits
- Detailed error reporting for resolution
- Automatic commit message formatting

## Daily Operations

### Morning Sync Check
```bash
pnpm git:sync
# Review any issues and follow recommendations
```

### Before Starting Work
```bash
pnpm git:status
# Ensure repository is clean and synced
```

### Weekly Maintenance
```bash
pnpm git:cleanup-dry    # Review branches to be cleaned
pnpm git:cleanup        # Clean up stale branches
```

### Emergency Sync Fix
```bash
git fetch origin
git reset --hard origin/main    # WARNING: Loses local changes
pnpm git:status              # Verify clean state
```

## Automation and Monitoring

### Continuous Monitoring
The sync monitor can be run periodically to catch issues early:

```bash
# Add to cron for hourly checks
0 * * * * cd /path/to/project && pnpm git:status >> sync.log 2>&1
```

### CI/CD Integration
Add sync checks to your deployment pipeline:

```yaml
# GitHub Actions example
- name: Check Git Sync Health
  run: pnpm git:status
```

### Slack/Discord Notifications
The JSON reports can be parsed for notifications:

```bash
# Example notification script
ISSUES=$(node scripts/git-sync-monitor.js report | jq '.issues | length')
if [ "$ISSUES" -gt 0 ]; then
    # Send alert to team
fi
```

## Troubleshooting

### Common Issues

#### "Repository not in sync"
```bash
pnpm git:sync
# Follow the recommendations provided
```

#### "Too many remote branches"
```bash
pnpm git:cleanup-dry    # Preview cleanup
pnpm git:cleanup        # Execute cleanup
```

#### "Commits ahead of remote" 
```bash
git push origin main       # Push local changes
# OR
git reset --hard origin/main    # Discard local changes
```

#### "Commits behind remote"
```bash
git pull origin main       # Pull remote changes
```

### Hook Issues

#### Hooks preventing commits
```bash
git commit --no-verify     # Bypass hooks temporarily
# Then fix the underlying sync issue
```

#### Hooks not working
```bash
pnpm git:hooks-remove
pnpm git:hooks-install  # Reinstall hooks
```

## Best Practices

### For Development Teams

1. **Check sync status before starting work**
   ```bash
   pnpm git:sync
   ```

2. **Use appropriate branches**
   - Cursor: `cursor/feature-name`
   - Claude Code: `codex/feature-name`  
   - v0.dev: Automatic branch naming

3. **Regular cleanup**
   - Weekly: `pnpm git:cleanup`
   - Monthly: `./scripts/git-batch-cleanup.sh`

4. **Monitor repository health**
   - Check `git-sync-report.json` for trends
   - Address high-severity issues immediately

### For Tool Configuration

1. **Cursor Settings**
   - Enable git integration
   - Use branch prefixes: `cursor/`

2. **Claude Code Usage**
   - Run sync checks before major changes
   - Use the installed hooks for guidance

3. **v0.dev Integration**
   - Monitor automatic pushes
   - Don't manually edit v0.dev generated branches

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     v0.dev      │    │   Cursor IDE    │    │  Claude Code    │
│   (automated)   │    │   (manual dev)  │    │   (ai assist)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Git Repository (GitHub)                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │    main     │ │   cursor/   │ │   codex/    │ │  v0.dev   │ │
│  │   branch    │ │  branches   │ │  branches   │ │ branches  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Sync Management System                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │    Sync     │ │   Branch    │ │ Git Hooks   │ │   Health  │ │
│  │  Monitor    │ │  Cleanup    │ │ (Coord.)    │ │  Reports  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## File Reference

- `scripts/git-sync-monitor.js` - Main sync monitoring
- `scripts/git-branch-cleanup.js` - Interactive branch cleanup  
- `scripts/git-batch-cleanup.sh` - Fast batch cleanup
- `scripts/setup-git-hooks.js` - Hook installation/management
- `.git/hooks/pre-commit` - Pre-commit coordination
- `.git/hooks/pre-push` - Pre-push validation
- `.git/hooks/post-merge` - Post-merge notifications
- `.git/hooks/commit-msg` - Commit message formatting
- `git-sync-report.json` - Latest sync health report

## Success Metrics

With this system in place, you should see:

- ✅ **Zero surprise conflicts** between tools
- ✅ **Automatic branch cleanup** (sub-50 remote branches)
- ✅ **Clear attribution** of commits by tool
- ✅ **Proactive issue detection** before problems escalate
- ✅ **Seamless switching** between Cursor and Claude Code
- ✅ **Reliable v0.dev integration** without manual intervention

The system provides both immediate fixes and long-term prevention of git synchronization issues in multi-tool development environments.

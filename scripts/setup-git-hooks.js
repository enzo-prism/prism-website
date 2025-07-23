#!/usr/bin/env node

/**
 * Git Hooks Setup - Installs intelligent hooks for multi-tool coordination
 * Coordinates between v0.dev, Cursor, and Claude Code workflows
 */

const fs = require('fs');
const path = require('path');

class GitHooksSetup {
  constructor() {
    this.hooksDir = path.join(process.cwd(), '.git', 'hooks');
    this.scriptsDir = path.join(process.cwd(), 'scripts');
  }

  ensureExecutable(filePath) {
    try {
      fs.chmodSync(filePath, 0o755);
    } catch (error) {
      console.warn(`Could not make ${filePath} executable:`, error.message);
    }
  }

  createPreCommitHook() {
    const hookContent = `#!/bin/sh
# Pre-commit hook for multi-tool git coordination
# Prevents conflicts between v0.dev, Cursor, and Claude Code

set -e

echo "🔍 Running pre-commit checks..."

# Detect which tool is committing
TOOL="unknown"
if [ -n "$CURSOR_SESSION" ] || [ -n "$CURSOR_USER" ]; then
    TOOL="cursor"
elif [ -n "$CLAUDE_CODE" ] || echo "$0" | grep -q "claude"; then
    TOOL="claude-code"
elif git log -1 --pretty=format:"%s" | grep -q "v0\\|automated\\|sync"; then
    TOOL="v0"
fi

echo "📝 Detected tool: $TOOL"

# Check for sync issues
node scripts/git-sync-monitor.js check --quiet || {
    echo "⚠️  Sync issues detected. Run 'npm run git:sync' to resolve."
    exit 1
}

# Tool-specific validations
case "$TOOL" in
    "cursor"|"claude-code")
        # Check for v0.dev conflicts
        if git status --porcelain | grep -q "package.json\\|next.config"; then
            echo "⚠️  Configuration files changed. Ensure compatibility with v0.dev."
        fi
        
        # Validate TypeScript if available
        if command -v npx > /dev/null 2>&1 && [ -f "tsconfig.json" ]; then
            echo "🔧 Running TypeScript check..."
            npx tsc --noEmit --skipLibCheck || {
                echo "❌ TypeScript errors found. Fix before committing."
                exit 1
            }
        fi
        ;;
    "v0")
        echo "🚀 v0.dev automated commit detected"
        ;;
esac

# Run linting if package.json exists
if [ -f "package.json" ] && command -v npm > /dev/null 2>&1; then
    if npm run lint --if-present > /dev/null 2>&1; then
        echo "✅ Linting passed"
    else
        echo "⚠️  Linting issues detected (continuing anyway for v0.dev compatibility)"
    fi
fi

echo "✅ Pre-commit checks completed"
`;

    const hookPath = path.join(this.hooksDir, 'pre-commit');
    fs.writeFileSync(hookPath, hookContent);
    this.ensureExecutable(hookPath);
    console.log('✅ Created pre-commit hook');
  }

  createPrePushHook() {
    const hookContent = `#!/bin/sh
# Pre-push hook for multi-tool git coordination

set -e

echo "🚀 Running pre-push checks..."

# Get branch being pushed
branch=$(git rev-parse --abbrev-ref HEAD)
remote_branch=$2

# Check sync status
echo "🔍 Checking sync status..."
node scripts/git-sync-monitor.js check --quiet || {
    echo "⚠️  Repository not in sync. Consider pulling latest changes first."
    echo "Run 'git pull origin main' if pushing to main branch."
}

# Warn about tool-specific branches
case "$branch" in
    cursor/*)
        echo "📝 Pushing Cursor branch: $branch"
        ;;
    codex/*|claude/*)
        echo "📝 Pushing Claude Code branch: $branch"
        ;;
    main|master)
        echo "🎯 Pushing to main branch"
        
        # Extra validations for main branch
        if [ -f "package.json" ]; then
            echo "🔧 Running build check..."
            if npm run build --if-present > /dev/null 2>&1; then
                echo "✅ Build successful"
            else
                echo "❌ Build failed. Fix issues before pushing to main."
                exit 1
            fi
        fi
        ;;
esac

echo "✅ Pre-push checks completed"
`;

    const hookPath = path.join(this.hooksDir, 'pre-push');
    fs.writeFileSync(hookPath, hookContent);
    this.ensureExecutable(hookPath);
    console.log('✅ Created pre-push hook');
  }

  createPostMergeHook() {
    const hookContent = `#!/bin/sh
# Post-merge hook for multi-tool git coordination

echo "🔄 Post-merge cleanup..."

# Check if package.json changed (might need npm install)
if git diff-tree -r --name-only HEAD@{1} HEAD | grep -q "package.json"; then
    echo "📦 package.json changed, you might want to run 'npm install'"
fi

# Check if dependencies changed
if git diff-tree -r --name-only HEAD@{1} HEAD | grep -q "package-lock.json\\|yarn.lock\\|pnpm-lock.yaml"; then
    echo "🔒 Lock file changed, dependencies may need updating"
fi

# Update sync status
node scripts/git-sync-monitor.js check --quiet > /dev/null 2>&1 || {
    echo "ℹ️  Run 'npm run git:status' to check repository health"
}

echo "✅ Post-merge tasks completed"
`;

    const hookPath = path.join(this.hooksDir, 'post-merge');
    fs.writeFileSync(hookPath, hookContent);
    this.ensureExecutable(hookPath);
    console.log('✅ Created post-merge hook');
  }

  createCommitMsgHook() {
    const hookContent = `#!/bin/sh
# Commit message hook for multi-tool coordination

commit_file=$1
commit_msg=$(cat "$commit_file")

# Skip if this is a merge commit
if git rev-parse --verify HEAD >/dev/null 2>&1; then
    if git diff-index --quiet --cached HEAD --; then
        exit 0
    fi
fi

# Detect tool and add metadata if missing
if ! echo "$commit_msg" | grep -q "Generated with\\|Co-Authored-By"; then
    # Detect which tool is being used
    if [ -n "$CURSOR_SESSION" ] || [ -n "$CURSOR_USER" ]; then
        echo "$commit_msg

🤖 Generated with Cursor

Co-Authored-By: Cursor <cursor@cursor.sh>" > "$commit_file"
    elif [ -n "$CLAUDE_CODE" ] || echo "$0" | grep -q "claude"; then
        echo "$commit_msg

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>" > "$commit_file"
    fi
fi

# Validate commit message format (basic check)
if echo "$commit_msg" | head -n1 | grep -q "^.\\{1,50\\}$"; then
    exit 0
else
    echo "⚠️  Commit message should be 50 characters or less on first line"
fi
`;

    const hookPath = path.join(this.hooksDir, 'commit-msg');
    fs.writeFileSync(hookPath, hookContent);
    this.ensureExecutable(hookPath);
    console.log('✅ Created commit-msg hook');
  }

  setupHooks() {
    console.log('🔧 Setting up git hooks for multi-tool coordination...\n');

    // Ensure hooks directory exists
    if (!fs.existsSync(this.hooksDir)) {
      fs.mkdirSync(this.hooksDir, { recursive: true });
    }

    // Create all hooks
    this.createPreCommitHook();
    this.createPrePushHook();
    this.createPostMergeHook();
    this.createCommitMsgHook();

    console.log('\n✅ Git hooks setup completed!');
    console.log('\n📋 Hooks installed:');
    console.log('  • pre-commit: Sync checks and validation');
    console.log('  • pre-push: Build validation and sync warnings');
    console.log('  • post-merge: Dependency and sync notifications');  
    console.log('  • commit-msg: Tool detection and message formatting');
    
    console.log('\n🎯 These hooks will help coordinate between:');
    console.log('  • v0.dev automated deployments');
    console.log('  • Cursor IDE commits');
    console.log('  • Claude Code commits');
  }

  removeHooks() {
    console.log('🗑️  Removing git hooks...\n');

    const hooks = ['pre-commit', 'pre-push', 'post-merge', 'commit-msg'];
    
    hooks.forEach(hook => {
      const hookPath = path.join(this.hooksDir, hook);
      if (fs.existsSync(hookPath)) {
        fs.unlinkSync(hookPath);
        console.log(`✅ Removed ${hook} hook`);
      }
    });

    console.log('\n✅ Git hooks removed successfully');
  }
}

// CLI usage
if (require.main === module) {
  const command = process.argv[2] || 'install';
  const setup = new GitHooksSetup();

  switch (command) {
    case 'install':
    case 'setup':
      setup.setupHooks();
      break;
    case 'remove':
    case 'uninstall':
      setup.removeHooks();
      break;
    default:
      console.log(`
Git Hooks Setup Tool

Usage: node setup-git-hooks.js [command]

Commands:
  install    Install git hooks (default)
  remove     Remove installed git hooks

The hooks coordinate between v0.dev, Cursor, and Claude Code workflows.
`);
      process.exit(1);
  }
}

module.exports = GitHooksSetup;
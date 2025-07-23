#!/bin/bash

# Git Batch Cleanup - Fast branch cleanup using native git commands
# Designed to handle the 200+ branch cleanup efficiently

set -e

echo "🧹 Starting batch git cleanup..."

# Fetch latest info
echo "📡 Fetching latest branch information..."
git fetch --prune origin

# Get all merged branches (excluding main/master)
echo "🔍 Finding merged branches..."
MERGED_BRANCHES=$(git branch -r --merged origin/main | grep -v "main" | grep -v "master" | grep -v "HEAD" | sed 's/origin\///' | head -50)

if [ -z "$MERGED_BRANCHES" ]; then
    echo "✅ No merged branches found to clean up"
else
    echo "📊 Found $(echo "$MERGED_BRANCHES" | wc -l) merged branches to delete"
    echo "🗑️  Deleting merged branches..."
    
    # Delete branches in batches to avoid timeout
    echo "$MERGED_BRANCHES" | while read -r branch; do
        if [ ! -z "$branch" ]; then
            echo "  Deleting: $branch"
            git push origin --delete "$branch" 2>/dev/null || echo "  ⚠️  Failed to delete: $branch"
        fi
    done
fi

# Clean up old tool-specific branches (older than 60 days)
echo "🔍 Finding old tool-specific branches..."
OLD_CODEX_BRANCHES=$(git for-each-ref --format='%(refname:short) %(committerdate:unix)' refs/remotes/origin/codex/ | \
    awk -v cutoff=$(date -d '60 days ago' +%s) '$2 < cutoff {print $1}' | \
    sed 's/origin\///' | head -20)

OLD_CURSOR_BRANCHES=$(git for-each-ref --format='%(refname:short) %(committerdate:unix)' refs/remotes/origin/cursor/ | \
    awk -v cutoff=$(date -d '60 days ago' +%s) '$2 < cutoff {print $1}' | \
    sed 's/origin\///' | head -20)

# Delete old codex branches
if [ ! -z "$OLD_CODEX_BRANCHES" ]; then
    echo "🗑️  Deleting old codex branches..."
    echo "$OLD_CODEX_BRANCHES" | while read -r branch; do
        if [ ! -z "$branch" ]; then
            echo "  Deleting: $branch"
            git push origin --delete "$branch" 2>/dev/null || echo "  ⚠️  Failed to delete: $branch"
        fi
    done
fi

# Delete old cursor branches  
if [ ! -z "$OLD_CURSOR_BRANCHES" ]; then
    echo "🗑️  Deleting old cursor branches..."
    echo "$OLD_CURSOR_BRANCHES" | while read -r branch; do
        if [ ! -z "$branch" ]; then
            echo "  Deleting: $branch"
            git push origin --delete "$branch" 2>/dev/null || echo "  ⚠️  Failed to delete: $branch"
        fi
    done
fi

# Final cleanup
echo "🔄 Cleaning up local tracking branches..."
git remote prune origin

echo "✅ Batch cleanup completed!"

# Show final status
echo "📊 Final branch count:"
git branch -r | wc -l | xargs echo "  Remote branches:"

echo "
🎉 Git repository cleanup completed!

Next steps:
1. Run 'npm run git:status' to verify sync health
2. The git hooks are now installed and monitoring
3. Use 'npm run git:sync' regularly to maintain sync
"
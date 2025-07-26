# Git Performance Fix Guide

## Issues Identified

1. **Git Sync Monitor fetching on every commit/push** - This was the primary cause of slowness
2. **iCloud Drive location** - Adds file system overhead
3. **Heavy Git hooks** - TypeScript and build checks on every operation
4. **Large binary files** - 116MB pack file with many large images

## Applied Fixes

### 1. ✅ Disabled automatic fetching in git-sync-monitor.js
- The script no longer runs `git fetch origin` on every commit/push
- This eliminates the primary performance bottleneck

### 2. ✅ Made TypeScript checks optional in pre-commit hook
- Set `ENABLE_TSC_CHECK=1` to enable TypeScript checking
- Example: `ENABLE_TSC_CHECK=1 git commit -m "message"`

### 3. ✅ Made build checks optional in pre-push hook  
- Set `ENABLE_BUILD_CHECK=1` to enable build checking
- Example: `ENABLE_BUILD_CHECK=1 git push`

## Recommended Additional Actions

### Option 1: Move Repository Out of iCloud (Recommended)
```bash
# Create a new location for your projects
mkdir -p ~/Projects

# Move the repository
mv "/Users/enzo/Library/Mobile Documents/com~apple~CloudDocs/Cursor Projects 👨🏾‍💻/prism-website" ~/Projects/

# Update your workspace in Cursor
```

### Option 2: Disable Git Hooks Temporarily
```bash
# Rename hooks to disable them
cd .git/hooks
mv pre-commit pre-commit.disabled
mv pre-push pre-push.disabled
mv commit-msg commit-msg.disabled
mv post-merge post-merge.disabled

# To re-enable later:
# mv pre-commit.disabled pre-commit
# etc.
```

### Option 3: Optimize Repository Size
```bash
# Remove large files from history (careful - this rewrites history!)
# First, identify large files:
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '$1=="blob" && $3>1000000 {print $3, $4}' | \
  sort -nr

# Consider using Git LFS for large images
git lfs track "*.png" "*.jpg" "*.jpeg"
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

## Quick Performance Test

Run this to test if commits are faster now:
```bash
echo "test" > test.txt
time git add test.txt
time git commit -m "Performance test"
rm test.txt
git add test.txt
git commit -m "Cleanup test"
```

## Manual Sync When Needed

Since automatic fetching is disabled, manually sync when needed:
```bash
# Fetch latest changes
git fetch origin

# Check sync status
node scripts/git-sync-monitor.js check
```

## Emergency Rollback

If you need to restore original behavior:
```bash
# Restore original git-sync-monitor.js
git checkout HEAD -- scripts/git-sync-monitor.js

# Restore original hooks
git checkout HEAD -- .git/hooks/pre-commit
git checkout HEAD -- .git/hooks/pre-push
```

## Long-term Recommendations

1. **Move project out of iCloud Drive** - This is the single best improvement you can make
2. **Use Git LFS for large images** - Reduces repository size
3. **Run builds/tests in CI/CD** - Not in local Git hooks
4. **Periodic repository maintenance**:
   ```bash
   git gc --aggressive
   git prune
   ```

Your Git operations should now be significantly faster! 🚀 
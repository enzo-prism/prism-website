#!/usr/bin/env node

/**
 * Git Branch Cleanup - Safely removes stale feature branches
 * Handles branches created by Cursor, Codex (Claude Code), and v0.dev
 */

const { execSync } = require('child_process');
const readline = require('readline');

class GitBranchCleanup {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.interactive = options.interactive !== false;
    this.maxAge = options.maxAge || 30; // days
    this.protectedBranches = ['main', 'master', 'develop', 'staging', 'production'];
  }

  executeGitCommand(command, silent = false) {
    try {
      const result = execSync(command, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' });
      return result ? result.trim() : '';
    } catch (error) {
      if (!silent) console.error(`Command failed: ${command}`);
      return null;
    }
  }

  getRemoteBranches() {
    const result = this.executeGitCommand('git branch -r --format="%(refname:short):%(committerdate:unix)"', true);
    if (!result) return [];

    return result.split('\n')
      .filter(Boolean)
      .map(line => {
        const [branch, timestamp] = line.split(':');
        return {
          name: branch,
          lastCommit: new Date(parseInt(timestamp) * 1000),
          ageInDays: Math.floor((Date.now() - parseInt(timestamp) * 1000) / (1000 * 60 * 60 * 24))
        };
      })
      .filter(branch => 
        branch.name !== 'origin/HEAD' && 
        !this.protectedBranches.some(protectedBranch => branch.name.endsWith(protectedBranch))
      );
  }

  categorizeBranches() {
    const branches = this.getRemoteBranches();
    
    const categories = {
      cursor: branches.filter(b => b.name.includes('cursor/')),
      codex: branches.filter(b => b.name.includes('codex/')),
      stale: branches.filter(b => b.ageInDays > this.maxAge),
      merged: [], // Will be populated by checking merge status
      recent: branches.filter(b => b.ageInDays <= 7),
      other: branches.filter(b => 
        !b.name.includes('cursor/') && 
        !b.name.includes('codex/') &&
        !this.protectedBranches.some(protectedBranch => b.name.includes(protectedBranch))
      )
    };

    // Check for merged branches
    categories.merged = branches.filter(branch => {
      const mergeCheck = this.executeGitCommand(
        `git branch -r --merged origin/main | grep "${branch.name.replace('origin/', '')}"`, 
        true
      );
      return mergeCheck && mergeCheck.trim().length > 0;
    });

    return categories;
  }

  async promptUser(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question(question, answer => {
        rl.close();
        resolve(answer.toLowerCase().trim());
      });
    });
  }

  async confirmDeletion(branches, category) {
    if (!this.interactive || branches.length === 0) return true;

    console.log(`\n📋 ${category} branches to delete (${branches.length}):`);
    branches.forEach(branch => {
      console.log(`  - ${branch.name} (${branch.ageInDays} days old)`);
    });

    const answer = await this.promptUser(`\nDelete these ${branches.length} ${category} branches? (y/N): `);
    return answer === 'y' || answer === 'yes';
  }

  deleteBranches(branches, category) {
    if (branches.length === 0) {
      console.log(`✅ No ${category} branches to delete`);
      return;
    }

    console.log(`\n🗑️  Deleting ${branches.length} ${category} branches...`);
    
    let deleted = 0;
    let failed = 0;

    branches.forEach(branch => {
      const remoteBranchName = branch.name.replace('origin/', '');
      
      if (this.dryRun) {
        console.log(`[DRY RUN] Would delete: ${branch.name}`);
        return;
      }

      const success = this.executeGitCommand(`git push origin --delete ${remoteBranchName}`, true);
      if (success !== null) {
        console.log(`  ✅ Deleted: ${branch.name}`);
        deleted++;
      } else {
        console.log(`  ❌ Failed: ${branch.name}`);
        failed++;
      }
    });

    console.log(`\n📊 Results: ${deleted} deleted, ${failed} failed`);
  }

  generateCleanupReport(categories) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_branches: Object.values(categories).flat().length,
        cursor_branches: categories.cursor.length,
        codex_branches: categories.codex.length,
        stale_branches: categories.stale.length,
        merged_branches: categories.merged.length,
        recent_branches: categories.recent.length
      },
      recommendations: []
    };

    // Generate recommendations
    if (categories.stale.length > 10) {
      report.recommendations.push(`Delete ${categories.stale.length} stale branches (older than ${this.maxAge} days)`);
    }

    if (categories.merged.length > 5) {
      report.recommendations.push(`Clean up ${categories.merged.length} merged branches`);
    }

    if (categories.cursor.length > 20) {
      report.recommendations.push(`Review ${categories.cursor.length} Cursor branches for cleanup`);
    }

    if (categories.codex.length > 20) {
      report.recommendations.push(`Review ${categories.codex.length} Codex branches for cleanup`);
    }

    return report;
  }

  async performCleanup() {
    console.log('🔍 Analyzing remote branches...\n');

    // Fetch latest branch information
    this.executeGitCommand('git fetch --prune origin');

    const categories = this.categorizeBranches();
    const report = this.generateCleanupReport(categories);

    // Display summary
    console.log('📊 Branch Analysis Summary:');
    console.log(`  Total remote branches: ${report.summary.total_branches}`);
    console.log(`  Cursor branches: ${report.summary.cursor_branches}`);
    console.log(`  Codex branches: ${report.summary.codex_branches}`);
    console.log(`  Stale branches (>${this.maxAge} days): ${report.summary.stale_branches}`);
    console.log(`  Merged branches: ${report.summary.merged_branches}`);
    console.log(`  Recent branches (<7 days): ${report.summary.recent_branches}`);

    if (this.dryRun) {
      console.log('\n🔍 DRY RUN MODE - No branches will be deleted\n');
    }

    // Clean up different categories
    if (await this.confirmDeletion(categories.merged, 'merged')) {
      this.deleteBranches(categories.merged, 'merged');
    }

    if (await this.confirmDeletion(categories.stale, 'stale')) {
      this.deleteBranches(categories.stale, 'stale');
    }

    // Be more careful with tool-specific branches
    if (categories.cursor.length > 30) {
      const oldCursorBranches = categories.cursor.filter(b => b.ageInDays > 14);
      if (await this.confirmDeletion(oldCursorBranches, 'old Cursor')) {
        this.deleteBranches(oldCursorBranches, 'old Cursor');
      }
    }

    if (categories.codex.length > 30) {
      const oldCodexBranches = categories.codex.filter(b => b.ageInDays > 14);
      if (await this.confirmDeletion(oldCodexBranches, 'old Codex')) {
        this.deleteBranches(oldCodexBranches, 'old Codex');
      }
    }

    console.log('\n✅ Branch cleanup completed!');
    
    // Final cleanup - remove local tracking branches for deleted remotes
    if (!this.dryRun) {
      console.log('\n🔄 Cleaning up local tracking branches...');
      this.executeGitCommand('git remote prune origin');
    }
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    interactive: !args.includes('--no-interactive'),
    maxAge: parseInt(args.find(arg => arg.startsWith('--max-age='))?.split('=')[1]) || 30
  };

  if (args.includes('--help')) {
    console.log(`
Git Branch Cleanup Tool

Usage: node git-branch-cleanup.js [options]

Options:
  --dry-run           Show what would be deleted without actually deleting
  --no-interactive    Skip confirmation prompts (use with caution)
  --max-age=N         Consider branches older than N days as stale (default: 30)
  --help              Show this help message

Examples:
  node git-branch-cleanup.js --dry-run
  node git-branch-cleanup.js --max-age=14
  node git-branch-cleanup.js --no-interactive --max-age=60
`);
    process.exit(0);
  }

  const cleanup = new GitBranchCleanup(options);
  cleanup.performCleanup().catch(error => {
    console.error('Cleanup failed:', error.message);
    process.exit(1);
  });
}

module.exports = GitBranchCleanup;
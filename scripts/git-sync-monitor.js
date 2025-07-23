#!/usr/bin/env node

/**
 * Git Sync Monitor - Detects and reports git synchronization issues
 * Designed to coordinate between v0.dev, Cursor, and Claude Code workflows
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitSyncMonitor {
  constructor() {
    this.reportPath = path.join(process.cwd(), 'git-sync-report.json');
    this.logPath = path.join(process.cwd(), 'scripts', 'logs', 'git-sync.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}\n`;
    
    console.log(`${level}: ${message}`);
    fs.appendFileSync(this.logPath, logEntry);
  }

  executeGitCommand(command) {
    try {
      return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
    } catch (error) {
      this.log(`Git command failed: ${command} - ${error.message}`, 'ERROR');
      return null;
    }
  }

  getCurrentBranch() {
    return this.executeGitCommand('git branch --show-current');
  }

  getCommitsAhead() {
    const result = this.executeGitCommand('git rev-list --count HEAD ^origin/main');
    return result ? parseInt(result) : 0;
  }

  getCommitsBehind() {
    const result = this.executeGitCommand('git rev-list --count origin/main ^HEAD');
    return result ? parseInt(result) : 0;
  }

  getUnstagedChanges() {
    const result = this.executeGitCommand('git diff --name-only');
    return result ? result.split('\n').filter(Boolean) : [];
  }

  getStagedChanges() {
    const result = this.executeGitCommand('git diff --cached --name-only');
    return result ? result.split('\n').filter(Boolean) : [];
  }

  getRemoteBranches() {
    const result = this.executeGitCommand('git branch -r --format="%(refname:short)"');
    return result ? result.split('\n').filter(Boolean) : [];
  }

  getToolSpecificBranches() {
    const branches = this.getRemoteBranches();
    const toolBranches = {
      cursor: branches.filter(b => b.includes('cursor/')),
      codex: branches.filter(b => b.includes('codex/')),
      v0: branches.filter(b => b.includes('v0') || b.includes('feat/') || b.includes('fix/')),
      other: branches.filter(b => 
        !b.includes('cursor/') && 
        !b.includes('codex/') && 
        !b.includes('v0') && 
        !b.includes('feat/') && 
        !b.includes('fix/') &&
        b !== 'origin/main' &&
        b !== 'origin/HEAD'
      )
    };
    return toolBranches;
  }

  getLastCommitInfo() {
    const hash = this.executeGitCommand('git rev-parse HEAD');
    const message = this.executeGitCommand('git log -1 --pretty=format:"%s"');
    const author = this.executeGitCommand('git log -1 --pretty=format:"%an"');
    const date = this.executeGitCommand('git log -1 --pretty=format:"%ai"');
    
    return { hash, message, author, date };
  }

  detectSyncIssues() {
    const issues = [];
    
    // Check if we're ahead of remote
    const ahead = this.getCommitsAhead();
    if (ahead > 0) {
      issues.push({
        type: 'commits_ahead',
        severity: 'medium',
        message: `Local branch is ${ahead} commits ahead of origin/main`,
        suggestion: 'Push local commits or reset to match remote'
      });
    }

    // Check if we're behind remote  
    const behind = this.getCommitsBehind();
    if (behind > 0) {
      issues.push({
        type: 'commits_behind',
        severity: 'medium',
        message: `Local branch is ${behind} commits behind origin/main`,
        suggestion: 'Pull latest changes from remote'
      });
    }

    // Check for uncommitted changes
    const unstaged = this.getUnstagedChanges();
    const staged = this.getStagedChanges();
    
    if (unstaged.length > 0) {
      issues.push({
        type: 'unstaged_changes',
        severity: 'low',
        message: `${unstaged.length} files have unstaged changes: ${unstaged.slice(0, 3).join(', ')}${unstaged.length > 3 ? '...' : ''}`,
        suggestion: 'Stage and commit changes or stash them'
      });
    }

    if (staged.length > 0) {
      issues.push({
        type: 'staged_changes',
        severity: 'low',
        message: `${staged.length} files are staged but not committed: ${staged.slice(0, 3).join(', ')}${staged.length > 3 ? '...' : ''}`,
        suggestion: 'Commit staged changes'
      });
    }

    // Check for excessive branches
    const toolBranches = this.getToolSpecificBranches();
    const totalBranches = Object.values(toolBranches).flat().length;
    
    if (totalBranches > 50) {
      issues.push({
        type: 'branch_pollution',
        severity: 'high',
        message: `${totalBranches} remote branches detected (Cursor: ${toolBranches.cursor.length}, Codex: ${toolBranches.codex.length})`,
        suggestion: 'Run branch cleanup to remove stale branches'
      });
    }

    return issues;
  }

  generateSyncReport() {
    this.log('Generating git sync report...');

    const report = {
      timestamp: new Date().toISOString(),
      branch: this.getCurrentBranch(),
      sync_status: {
        commits_ahead: this.getCommitsAhead(),
        commits_behind: this.getCommitsBehind(),
        is_clean: this.getUnstagedChanges().length === 0 && this.getStagedChanges().length === 0
      },
      changes: {
        unstaged: this.getUnstagedChanges(),
        staged: this.getStagedChanges()
      },
      branches: this.getToolSpecificBranches(),
      last_commit: this.getLastCommitInfo(),
      issues: this.detectSyncIssues(),
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    fs.writeFileSync(this.reportPath, JSON.stringify(report, null, 2));
    this.log(`Report saved to ${this.reportPath}`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    const issues = this.detectSyncIssues();

    if (issues.some(i => i.type === 'commits_ahead' || i.type === 'commits_behind')) {
      recommendations.push('Run git sync to align local and remote branches');
    }

    if (issues.some(i => i.type === 'branch_pollution')) {
      recommendations.push('Execute branch cleanup script to remove stale branches');
    }

    if (issues.some(i => i.type === 'unstaged_changes' || i.type === 'staged_changes')) {
      recommendations.push('Commit or stash pending changes before switching tools');
    }

    if (issues.length === 0) {
      recommendations.push('Repository is in sync - safe for multi-tool development');
    }

    return recommendations;
  }

  printSummary(report) {
    console.log('\n=== Git Sync Health Report ===');
    console.log(`Branch: ${report.branch}`);
    console.log(`Ahead: ${report.sync_status.commits_ahead} | Behind: ${report.sync_status.commits_behind}`);
    console.log(`Clean: ${report.sync_status.is_clean ? '✅' : '❌'}`);
    console.log(`Remote Branches: ${Object.values(report.branches).flat().length}`);
    
    if (report.issues.length > 0) {
      console.log('\n🚨 Issues Detected:');
      report.issues.forEach((issue, index) => {
        const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`${index + 1}. ${icon} ${issue.message}`);
        console.log(`   💡 ${issue.suggestion}`);
      });
    } else {
      console.log('\n✅ No sync issues detected');
    }

    if (report.recommendations.length > 0) {
      console.log('\n📋 Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
  }

  async checkSync() {
    try {
      // Fetch latest from remote
      this.log('Fetching latest changes from remote...');
      this.executeGitCommand('git fetch origin');

      // Generate and display report
      const report = this.generateSyncReport();
      this.printSummary(report);

      // Return exit code based on issues
      const highSeverityIssues = report.issues.filter(i => i.severity === 'high');
      return highSeverityIssues.length > 0 ? 1 : 0;
    } catch (error) {
      this.log(`Sync check failed: ${error.message}`, 'ERROR');
      return 1;
    }
  }
}

// CLI usage
if (require.main === module) {
  const monitor = new GitSyncMonitor();
  
  const command = process.argv[2] || 'check';
  
  switch (command) {
    case 'check':
      monitor.checkSync().then(exitCode => process.exit(exitCode));
      break;
    case 'report':
      const report = monitor.generateSyncReport();
      monitor.printSummary(report);
      break;
    default:
      console.log('Usage: node git-sync-monitor.js [check|report]');
      process.exit(1);
  }
}

module.exports = GitSyncMonitor;
#!/usr/bin/env node

/**
 * MCP Server Setup Script
 * 
 * Interactive setup script for MCP servers in the Prism website project.
 * Guides users through token generation and configuration.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${prompt}${colors.reset}`, resolve);
  });
}

async function setupEnvironmentFile() {
  log('\n📁 Setting up environment file...', 'blue');
  
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      log('Skipping environment file setup.', 'yellow');
      return;
    }
  }
  
  if (!fs.existsSync(envExamplePath)) {
    log('❌ .env.example not found. Creating basic template...', 'red');
    const basicTemplate = `# MCP Server Environment Variables
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
SUPABASE_ACCESS_TOKEN=your_supabase_token_here`;
    
    fs.writeFileSync(envExamplePath, basicTemplate);
    log('✅ Created .env.example', 'green');
  }
  
  // Copy example to .env
  fs.copyFileSync(envExamplePath, envPath);
  log('✅ Created .env from .env.example', 'green');
  log('💡 You still need to fill in your actual tokens!', 'yellow');
}

async function setupGitHubToken() {
  log('\n🐙 GitHub Token Setup', 'blue');
  log('===================', 'blue');
  
  log('To use the GitHub MCP server, you need a Personal Access Token.', 'cyan');
  log('');
  log('Steps to create a GitHub token:', 'bold');
  log('1. Go to: https://github.com/settings/personal-access-tokens/new');
  log('2. Create a Fine-grained personal access token');
  log('3. Set permissions: Contents (Read), Issues (Read/Write), Pull requests (Read/Write), Metadata (Read)');
  log('');
  
  const hasToken = await question('Do you already have a GitHub token? (y/N): ');
  
  if (hasToken.toLowerCase() === 'y') {
    const token = await question('Enter your GitHub token (ghp_...): ');
    if (token && token.startsWith('ghp_')) {
      updateEnvFile('GITHUB_PERSONAL_ACCESS_TOKEN', token);
      log('✅ GitHub token saved', 'green');
      return true;
    } else {
      log('❌ Invalid token format. GitHub tokens start with "ghp_"', 'red');
      return false;
    }
  } else {
    log('💡 Please create a GitHub token and run this script again.', 'yellow');
    return false;
  }
}

async function setupSupabaseToken() {
  log('\n🗄️  Supabase Token Setup', 'blue');
  log('=======================', 'blue');
  
  log('To use the Supabase MCP server, you need the service role key.', 'cyan');
  log('');
  log('Steps to get your Supabase token:', 'bold');
  log('1. Go to: https://supabase.com/dashboard');
  log('2. Select project: ibjqwvkcjdgdifujfnpb');
  log('3. Navigate to Settings > API');
  log('4. Copy the "service_role" key (NOT the anon key)');
  log('');
  
  const hasToken = await question('Do you have your Supabase service role key? (y/N): ');
  
  if (hasToken.toLowerCase() === 'y') {
    const token = await question('Enter your Supabase service role key (sbp_...): ');
    if (token && token.startsWith('sbp_')) {
      updateEnvFile('SUPABASE_ACCESS_TOKEN', token);
      log('✅ Supabase token saved', 'green');
      return true;
    } else {
      log('❌ Invalid token format. Supabase service role keys start with "sbp_"', 'red');
      return false;
    }
  } else {
    log('💡 Please get your Supabase token and run this script again.', 'yellow');
    return false;
  }
}

function updateEnvFile(key, value) {
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    log('❌ .env file not found', 'red');
    return;
  }
  
  let content = fs.readFileSync(envPath, 'utf8');
  const regex = new RegExp(`^${key}=.*$`, 'm');
  
  if (regex.test(content)) {
    // Replace existing value
    content = content.replace(regex, `${key}=${value}`);
  } else {
    // Add new line
    content += `\n${key}=${value}`;
  }
  
  fs.writeFileSync(envPath, content);
}

async function runHealthCheck() {
  log('\n🏥 Running health check...', 'blue');
  
  try {
    execSync('node scripts/mcp-health-check.js', { stdio: 'inherit' });
    return true;
  } catch (error) {
    log('❌ Health check failed. Please fix the issues above.', 'red');
    return false;
  }
}

async function installDependencies() {
  log('\n📦 Checking dependencies...', 'blue');
  
  // Check if dotenv is installed
  try {
    require.resolve('dotenv');
    log('✅ dotenv already installed', 'green');
  } catch (error) {
    log('Installing dotenv...', 'yellow');
    try {
      execSync('npm install dotenv', { stdio: 'inherit' });
      log('✅ dotenv installed', 'green');
    } catch (installError) {
      log('❌ Failed to install dotenv. Please run: npm install dotenv', 'red');
      return false;
    }
  }
  
  return true;
}

async function main() {
  log('🚀 MCP Server Setup Wizard', 'bold');
  log('============================', 'blue');
  log('This script will help you configure MCP servers for Claude Code.\n', 'cyan');
  
  try {
    // Check if we're in the right directory
    if (!fs.existsSync('package.json')) {
      log('❌ This script must be run from the project root directory', 'red');
      process.exit(1);
    }
    
    // Install dependencies
    const depsOk = await installDependencies();
    if (!depsOk) process.exit(1);
    
    // Setup environment file
    await setupEnvironmentFile();
    
    // Setup GitHub token
    const githubOk = await setupGitHubToken();
    
    // Setup Supabase token
    const supabaseOk = await setupSupabaseToken();
    
    // Figma info
    log('\n🎨 Figma MCP Server', 'blue');
    log('==================', 'blue');
    log('The Figma MCP server requires a local server running on port 3845.', 'cyan');
    log('This is optional and only needed if you want design integration.', 'yellow');
    log('No additional setup required for this script.', 'green');
    
    // Sentry info
    log('\n🔍 Sentry MCP Server', 'blue');
    log('===================', 'blue');
    log('The Sentry MCP server is already configured and requires no additional setup.', 'green');
    log('It will work automatically with your existing Sentry project.', 'cyan');
    
    // Run health check if tokens were configured
    if (githubOk && supabaseOk) {
      const healthOk = await runHealthCheck();
      
      if (healthOk) {
        log('\n🎉 Setup Complete!', 'green');
        log('==================', 'green');
        log('Your MCP servers are configured and ready to use with Claude Code.', 'cyan');
        log('');
        log('Next steps:', 'bold');
        log('1. Open Claude Code in this project directory', 'cyan');
        log('2. Ask Claude to list GitHub issues or check Supabase schema', 'cyan');
        log('3. Enjoy enhanced development workflow!', 'cyan');
      } else {
        log('\n⚠️  Setup completed with issues', 'yellow');
        log('Please fix the health check failures above.', 'yellow');
      }
    } else {
      log('\n⚠️  Partial setup completed', 'yellow');
      log('Please configure your tokens and run the health check:', 'yellow');
      log('npm run mcp:health', 'cyan');
    }
    
  } catch (error) {
    log(`\n❌ Setup failed: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}
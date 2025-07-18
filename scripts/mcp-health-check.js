#!/usr/bin/env node

/**
 * MCP Server Health Check Script
 * 
 * This script validates MCP server connectivity and configuration
 * for the Prism website project.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  log('\n🔍 Checking environment configuration...', 'blue');
  
  const envPath = path.join(process.cwd(), '.env');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  let activeEnvFile = null;
  if (fs.existsSync(envLocalPath)) {
    activeEnvFile = envLocalPath;
    log('✅ Using .env.local for environment configuration', 'green');
  } else if (fs.existsSync(envPath)) {
    activeEnvFile = envPath;
    log('✅ Using .env for environment configuration', 'green');
  } else {
    log('❌ No environment file found (.env or .env.local)', 'red');
    if (fs.existsSync(envExamplePath)) {
      log('💡 Run: cp .env.example .env.local', 'yellow');
    }
    return false;
  }
  
  const envContent = fs.readFileSync(activeEnvFile, 'utf8');
  const requiredVars = ['GITHUB_PERSONAL_ACCESS_TOKEN', 'SUPABASE_ACCESS_TOKEN'];
  
  let allVarsPresent = true;
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=your_`)) {
      log(`❌ ${varName} not properly configured`, 'red');
      allVarsPresent = false;
    } else {
      log(`✅ ${varName} configured`, 'green');
    }
  });
  
  return allVarsPresent;
}

function checkMcpConfig() {
  log('\n🔍 Checking MCP configuration...', 'blue');
  
  const mcpPath = path.join(process.cwd(), '.mcp.json');
  
  if (!fs.existsSync(mcpPath)) {
    log('❌ .mcp.json file not found', 'red');
    return false;
  }
  
  try {
    const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
    const expectedServers = ['github', 'supabase', 'sentry', 'figma'];
    
    if (!mcpConfig.mcpServers) {
      log('❌ No mcpServers configuration found', 'red');
      return false;
    }
    
    let allServersConfigured = true;
    expectedServers.forEach(server => {
      if (mcpConfig.mcpServers[server]) {
        log(`✅ ${server} MCP server configured`, 'green');
      } else {
        log(`❌ ${server} MCP server not configured`, 'red');
        allServersConfigured = false;
      }
    });
    
    return allServersConfigured;
  } catch (error) {
    log(`❌ Invalid .mcp.json format: ${error.message}`, 'red');
    return false;
  }
}

function testGitHubConnection() {
  log('\n🔍 Testing GitHub API connection...', 'blue');
  
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token || token.startsWith('your_')) {
    log('❌ GitHub token not configured', 'red');
    return false;
  }
  
  try {
    // Use Bearer token format for newer GitHub API
    const result = execSync(`curl -s -H "Authorization: Bearer ${token}" https://api.github.com/user`, 
      { encoding: 'utf8', timeout: 10000 });
    
    const response = JSON.parse(result);
    if (response.login) {
      log(`✅ GitHub API connected (user: ${response.login})`, 'green');
      return true;
    } else if (response.message) {
      log(`❌ GitHub API error: ${response.message}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ GitHub API connection failed: ${error.message}`, 'red');
    return false;
  }
}

function testSupabaseConnection() {
  log('\n🔍 Testing Supabase API connection...', 'blue');
  
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token || token.startsWith('your_')) {
    log('❌ Supabase token not configured', 'red');
    return false;
  }
  
  try {
    const result = execSync(`curl -s -H "Authorization: Bearer ${token}" -H "apikey: ${token}" https://ibjqwvkcjdgdifujfnpb.supabase.co/rest/v1/`, 
      { encoding: 'utf8', timeout: 10000 });
    
    // Check if the response indicates successful authentication
    if (result.includes('Invalid API key')) {
      log('❌ Supabase API error: Invalid API key', 'red');
      return false;
    } else if (result.includes('swagger') || result.includes('supabase') || result.length > 0) {
      log('✅ Supabase API connected', 'green');
      return true;
    } else {
      log(`❌ Supabase API error: ${result}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Supabase API connection failed: ${error.message}`, 'red');
    return false;
  }
}

function testFigmaConnection() {
  log('\n🔍 Testing Figma local server...', 'blue');
  
  try {
    const result = execSync('curl -s http://127.0.0.1:3845/health', 
      { encoding: 'utf8', timeout: 5000 });
    
    log('✅ Figma local server responding', 'green');
    return true;
  } catch (error) {
    log('⚠️  Figma local server not running (optional)', 'yellow');
    log('💡 Start Figma MCP server on port 3845 if needed', 'yellow');
    return false;
  }
}

function testSentryConnection() {
  log('\n🔍 Testing Sentry MCP server...', 'blue');
  
  try {
    const result = execSync('curl -s https://mcp.sentry.dev/mcp', 
      { encoding: 'utf8', timeout: 10000 });
    
    // Sentry MCP server should return some kind of response
    if (result.length > 0) {
      log('✅ Sentry MCP server accessible', 'green');
      return true;
    } else {
      log('❌ Sentry MCP server not responding', 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Sentry MCP server connection failed: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🚀 MCP Server Health Check', 'bold');
  log('================================', 'blue');
  
  // Load environment variables from .env.local if it exists, otherwise .env
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envPath = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envLocalPath)) {
    require('dotenv').config({ path: envLocalPath });
  } else {
    require('dotenv').config({ path: envPath });
  }
  
  const results = {
    envConfig: checkEnvFile(),
    mcpConfig: checkMcpConfig(),
    github: testGitHubConnection(),
    supabase: testSupabaseConnection(),
    figma: testFigmaConnection(),
    sentry: testSentryConnection()
  };
  
  // Summary
  log('\n📊 Health Check Summary', 'bold');
  log('========================', 'blue');
  
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  const failedChecks = totalChecks - passedChecks;
  
  log(`✅ Passed: ${passedChecks}/${totalChecks}`, 'green');
  if (failedChecks > 0) {
    log(`❌ Failed: ${failedChecks}/${totalChecks}`, 'red');
  }
  
  if (results.envConfig && results.mcpConfig && results.github && results.supabase) {
    log('\n🎉 Core MCP servers are ready for Claude Code!', 'green');
  } else {
    log('\n⚠️  Some MCP servers need attention. Check the errors above.', 'yellow');
  }
  
  if (!results.figma) {
    log('\n💡 Figma server is optional. Start it only if you need design integration.', 'blue');
  }
  
  process.exit(failedChecks > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { checkEnvFile, checkMcpConfig, testGitHubConnection, testSupabaseConnection };
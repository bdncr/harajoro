#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/bdncr/harajoro.git';
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BRANCH = 'gh-pages';

function run(cmd, cwd = process.cwd()) {
  console.log(`[deploy] Running: ${cmd}`);
  try {
    execSync(cmd, { cwd, stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(`[deploy] Command failed: ${cmd}`);
    throw error;
  }
}

function rimraf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function deploy() {
  console.log('[deploy] Starting deployment to GitHub Pages...\n');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`[deploy] ❌ dist directory not found at ${DIST_DIR}`);
    console.error('[deploy] Run "npm run build" first');
    process.exit(1);
  }
  
  const tempDir = path.join(os.tmpdir(), `gh-pages-${Date.now()}`);
  
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log(`[deploy] Using temporary directory: ${tempDir}\n`);
    
    // Initialize git repository
    console.log('[deploy] Initializing git repository...');
    run('git init', tempDir);
    run('git config user.email "deploy-bot@github.com"', tempDir);
    run('git config user.name "Deploy Bot"', tempDir);
    run(`git remote add origin ${REPO_URL}`, tempDir);
    
    // Try to fetch the gh-pages branch if it exists
    console.log('[deploy] Attempting to fetch existing gh-pages branch...');
    try {
      run(`git fetch origin ${BRANCH} --depth=1`, tempDir);
      run(`git checkout -b ${BRANCH} origin/${BRANCH}`, tempDir);
    } catch (e) {
      console.log('[deploy] gh-pages branch does not exist yet, creating new branch...');
      run(`git checkout --orphan ${BRANCH}`, tempDir);
    }
    
    // Clear the directory and copy new files
    console.log('[deploy] Clearing directory and copying build files...');
    const tempFiles = fs.readdirSync(tempDir).filter(f => f !== '.git');
    for (const file of tempFiles) {
      rimraf(path.join(tempDir, file));
    }
    
    copyDir(DIST_DIR, tempDir);
    
    // Commit and push
    console.log('[deploy] Adding files to git...');
    run('git add -A', tempDir);
    
    // Check if there are changes
    let hasChanges = false;
    try {
      execSync('git diff --cached --quiet', { cwd: tempDir, stdio: 'pipe' });
    } catch {
      hasChanges = true;
    }
    
    if (!hasChanges) {
      console.log('[deploy] ✓ No changes to deploy\n');
      return;
    }
    
    console.log('[deploy] Creating commit...');
    const timestamp = new Date().toISOString();
    run(`git commit -m "Deploy to GitHub Pages (${timestamp})"`, tempDir);
    
    console.log('[deploy] Pushing to gh-pages branch...');
    
    // Try using GitHub CLI first (better auth handling on Windows)
    let pushSucceeded = false;
    try {
      // Check if gh CLI is available
      execSync('gh --version', { cwd: tempDir, stdio: 'pipe' });
      
      // Try to get auth token from GitHub CLI
      try {
        const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
        if (token) {
          console.log('[deploy] Using GitHub CLI token for authentication...');
          const urlWithToken = `https://x-access-token:${token}@github.com/bdncr/harajoro.git`;
          run(`git push -f "${urlWithToken}" HEAD:${BRANCH}`, tempDir);
          pushSucceeded = true;
        }
      } catch (e) {
        // Token retrieval failed
      }
    } catch (e) {
      // GitHub CLI not available
    }
    
    if (!pushSucceeded) {
      console.log('[deploy] Attempting standard git push...');
      run(`git push -f origin HEAD:${BRANCH}`, tempDir);
    }
    
    console.log('\n[deploy] ✅ Successfully deployed to GitHub Pages!');
    console.log(`[deploy] Visit: https://www.bdcnr.live/ to see your changes\n`);
    
  } catch (error) {
    console.error('\n[deploy] ❌ Deployment failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Could not read from remote repository')) {
      console.error('\n[deploy] Authentication Error: Git cannot authenticate with GitHub.');
      console.error('[deploy] To fix this, try one of the following:');
      console.error('[deploy] 1. Install GitHub CLI: https://cli.github.com/');
      console.error('[deploy]    Then run: gh auth login');
      console.error('[deploy] 2. Or set up Git credentials:');
      console.error('[deploy]    git config --global credential.helper wincred');
      console.error('[deploy] 3. Or create a personal access token and use it instead of password');
      console.error('[deploy]    https://github.com/settings/tokens');
    }
    
    process.exit(1);
  } finally {
    // Cleanup
    console.log('[deploy] Cleaning up temporary files...');
    rimraf(tempDir);
  }
}

deploy().catch((error) => {
  console.error('[deploy] ❌ Fatal error:', error.message);
  process.exit(1);
});


// release.js
require('dotenv').config(); // load .env

const { execSync } = require('child_process');

// bump version, push, and publish
execSync('npm version patch', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
execSync('npx electron-builder --publish always', { stdio: 'inherit' });

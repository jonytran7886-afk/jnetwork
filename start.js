#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

// Force production environment and port 3000 (AI Studio internal Nginx listens on 8080 and proxies to 3000)
process.env.NODE_ENV = 'production';
process.env.PORT = '3000';

const rawArgs = process.argv.slice(2);
const normalizedArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    normalizedArgs.push('-H', rawArgs[++i] || '0.0.0.0');
  } else if (arg.startsWith('--host=')) {
    normalizedArgs.push('-H', arg.slice(7));
  } else if (arg === '--port') {
    // Skip external port argument (e.g. 8080) to avoid EADDRINUSE conflict with Nginx
    i++;
  } else if (arg.startsWith('--port=')) {
    // Skip
  } else {
    normalizedArgs.push(arg);
  }
}

if (!normalizedArgs.includes('-H')) {
  normalizedArgs.push('-H', '0.0.0.0');
}

// Always bind to port 3000
normalizedArgs.push('-p', '3000');

const localNext = path.resolve(process.cwd(), 'node_modules/.bin/next');
const nextCmd = fs.existsSync(localNext) ? localNext : 'next';

const child = spawn(nextCmd, ['start', ...normalizedArgs], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production', PORT: '3000' },
  shell: process.platform === 'win32',
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

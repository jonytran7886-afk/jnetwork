#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const rawArgs = process.argv.slice(2);
const normalizedArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    normalizedArgs.push('-H');
  } else if (arg.startsWith('--host=')) {
    normalizedArgs.push('-H', arg.slice(7));
  } else {
    normalizedArgs.push(arg);
  }
}

const localNext = path.resolve(process.cwd(), 'node_modules/.bin/next');
const nextCmd = fs.existsSync(localNext) ? localNext : 'next';

const child = spawn(nextCmd, ['dev', ...normalizedArgs], {
  stdio: 'inherit',
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

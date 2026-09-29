import { spawn } from 'node:child_process';

const rawArgs = process.argv.slice(2);
const cleanArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    cleanArgs.push('-H', rawArgs[++i] || '0.0.0.0');
  } else if (arg.startsWith('--host=')) {
    cleanArgs.push('-H', arg.slice(7));
  } else if (arg === '-H' || arg === '--hostname') {
    cleanArgs.push('-H', rawArgs[++i] || '0.0.0.0');
  } else if (arg === '-p' || arg === '--port') {
    cleanArgs.push('-p', rawArgs[++i] || '3000');
  } else if (/^[0-9]+$/.test(arg)) {
    // Drop bare numbers that might be mistakenly parsed as project directories
    continue;
  } else {
    cleanArgs.push(arg);
  }
}

if (!cleanArgs.includes('-p') && !cleanArgs.includes('--port')) {
  cleanArgs.push('-p', '3000');
}
if (!cleanArgs.includes('-H') && !cleanArgs.includes('--hostname')) {
  cleanArgs.push('-H', '0.0.0.0');
}

const child = spawn('./node_modules/.bin/next', ['dev', ...cleanArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const standaloneServer = path.resolve(process.cwd(), '.next/standalone/server.js');

if (fs.existsSync(standaloneServer)) {
  await import(standaloneServer);
} else {
  await import(path.resolve(process.cwd(), 'start.js'));
}

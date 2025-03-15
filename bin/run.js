#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';

// Help information
if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`
  MCP Command Line Tool

  Usage:
    run <command> [options]

  Commands:
    start       Start MCP server (stdin/stdout mode)
    start:http  Start MCP HTTP server
    dev         Start server in development mode (hot reload)
    dev:http    Start HTTP server in development mode (hot reload)
    build       Build project
    help        Show this help message
  `);
  process.exit(0);
}

// Map commands to npm scripts
const scriptMap = {
  'start': 'start',
  'start:http': 'start:http',
  'dev': 'dev',
  'dev:http': 'dev:http',
  'build': 'build',
  'build:http': 'build:http'
};

// Check if command is valid
if (!scriptMap[command]) {
  console.error(`Error: Unknown command "${command}"`);
  console.log('Run "run-command-mcp help" to see available commands');
  process.exit(1);
}

// Run corresponding npm command
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmArgs = ['run', scriptMap[command]];

console.log(`Executing: npm ${npmArgs.join(' ')}`);

const child = spawn(npmCommand, npmArgs, {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code || 0);
}); 
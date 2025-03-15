#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const command = args[0] || 'help';

// 帮助信息
if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`
  MCP 命令行工具

  用法:
    run-command-mcp <命令> [选项]

  命令:
    start       启动 MCP 服务器（标准输入/输出模式）
    start:http  启动 MCP HTTP 服务器
    dev         以开发模式启动服务器（热重载）
    dev:http    以开发模式启动 HTTP 服务器（热重载）
    build       构建项目
    help        显示此帮助信息
  `);
  process.exit(0);
}

// 映射命令到 npm 脚本
const scriptMap = {
  'start': 'start',
  'start:http': 'start:http',
  'dev': 'dev',
  'dev:http': 'dev:http',
  'build': 'build',
  'build:http': 'build:http'
};

// 检查命令是否有效
if (!scriptMap[command]) {
  console.error(`错误: 未知命令 "${command}"`);
  console.log('运行 "run-command-mcp help" 查看可用命令');
  process.exit(1);
}

// 运行对应的 npm 命令
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmArgs = ['run', scriptMap[command]];

console.log(`执行: npm ${npmArgs.join(' ')}`);

const child = spawn(npmCommand, npmArgs, {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code || 0);
}); 
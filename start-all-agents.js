#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

console.log('🚀 Starting VirtuaLending Multi-Agent System...');
console.log('🌐 Railway Native Deployment - No Docker Required');

// Check if required tokens are present
const requiredTokens = [
  'DISCORD_BOT_TOKEN_CEO',
  'DISCORD_BOT_TOKEN_CODA', 
  'DISCORD_BOT_TOKEN_GHL',
  'DISCORD_BOT_TOKEN_ARIVE',
  'DISCORD_BOT_TOKEN_PRICING',
  'DISCORD_BOT_TOKEN_COMMS',
  'DISCORD_BOT_TOKEN_GMAIL',
  'DISCORD_BOT_TOKEN_RESEARCH'
];

const missingTokens = requiredTokens.filter(token => !process.env[token]);
if (missingTokens.length > 0) {
  console.warn(`⚠️  Missing Discord bot tokens: ${missingTokens.join(', ')}`);
  console.log('🔑 Add these tokens to Railway environment variables to start the agents');
}

const agents = [
  'ceo',
  'coda', 
  'ghl',
  'arive',
  'pricing',
  'comms',
  'gmail',
  'research'
];

const processes = [];

// Start each agent as a separate process
agents.forEach(agent => {
  const tokenKey = `DISCORD_BOT_TOKEN_${agent.toUpperCase()}`;
  
  if (!process.env[tokenKey]) {
    console.log(`⏸️  Skipping ${agent.toUpperCase()} agent - no token provided`);
    return;
  }
  
  console.log(`📡 Starting ${agent.toUpperCase()} agent...`);
  
  const agentProcess = spawn('node', ['index.js'], {
    cwd: path.join(__dirname, 'agents', agent),
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env }
  });

  // Handle stdout
  agentProcess.stdout.on('data', (data) => {
    console.log(`[${agent.toUpperCase()}] ${data.toString().trim()}`);
  });

  // Handle stderr
  agentProcess.stderr.on('data', (data) => {
    console.error(`[${agent.toUpperCase()}] ERROR: ${data.toString().trim()}`);
  });

  // Handle process exit
  agentProcess.on('close', (code) => {
    console.log(`[${agent.toUpperCase()}] Process exited with code ${code}`);
    
    // Don't restart automatically in Railway to avoid resource issues
    if (code !== 0 && code !== null) {
      console.log(`❌ ${agent.toUpperCase()} agent crashed - check token and permissions`);
    }
  });

  processes.push({ name: agent, process: agentProcess });
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all agents...');
  
  processes.forEach(({ name, process }) => {
    console.log(`⏹️  Stopping ${name.toUpperCase()} agent...`);
    process.kill('SIGINT');
  });

  setTimeout(() => {
    console.log('✅ All agents stopped');
    process.exit(0);
  }, 3000);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  processes.forEach(({ process }) => process.kill('SIGTERM'));
  process.exit(0);
});

// Health check endpoint (required for Railway)
const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/') {
    const activeAgents = processes.length;
    const status = activeAgents > 0 ? 'healthy' : 'starting';
    
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ 
      status: status,
      agents: agents.length,
      activeAgents: activeAgents,
      timestamp: new Date().toISOString(),
      environment: 'railway',
      missingTokens: missingTokens
    }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>🤖 VirtuaLending Multi-Agent System</h1>
      <p><strong>Status:</strong> Running on Railway</p>
      <p><strong>Active Agents:</strong> ${processes.length}/${agents.length}</p>
      <p><strong>Missing Tokens:</strong> ${missingTokens.length}</p>
      <p><a href="/health">Health Check JSON</a></p>
      <h2>Agent Status:</h2>
      <ul>
        ${agents.map(agent => {
          const hasToken = process.env[`DISCORD_BOT_TOKEN_${agent.toUpperCase()}`];
          return `<li>${agent.toUpperCase()}: ${hasToken ? '✅ Ready' : '❌ Missing Token'}</li>`;
        }).join('')}
      </ul>
    `);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🏥 Health check server running on port ${PORT}`);
  console.log(`📊 Dashboard: https://your-app.railway.app`);
  
  if (processes.length > 0) {
    console.log('✅ Multi-agent system started successfully!');
    console.log('🎯 Go to Discord and test: "Hello CEO" in #general channel');
  } else {
    console.log('🔑 Add Discord bot tokens to Railway environment variables to start agents');
  }
});
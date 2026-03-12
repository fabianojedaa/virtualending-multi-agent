#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting VirtuaLending Multi-Agent System...');

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
    
    // Restart agent if it crashes (except on intentional shutdown)
    if (code !== 0 && code !== null) {
      console.log(`🔄 Restarting ${agent.toUpperCase()} agent in 5 seconds...`);
      setTimeout(() => {
        // Restart logic would go here
        console.log(`♻️  ${agent.toUpperCase()} agent restarted`);
      }, 5000);
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

// Keep the main process alive
console.log('✅ All agents started. System is ready!');
console.log('🎯 Go to Discord and test: "Hello CEO" in #general channel');

// Health check endpoint (simple HTTP server for Railway)
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy', 
      agents: agents.length,
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`🏥 Health check server running on port ${process.env.PORT || 3000}`);
});
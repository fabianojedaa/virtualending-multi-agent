#!/bin/bash
# Setup script for VirtuaLending Multi-Agent System

echo "🚀 Setting up VirtuaLending Multi-Agent System..."

# List of agents to create
AGENTS=("ceo" "coda" "ghl" "arive" "pricing" "comms" "gmail" "research")

# Create agent directories and copy shared files
for agent in "${AGENTS[@]}"; do
  echo "📁 Setting up $agent agent..."
  
  # Create agent directory if it doesn't exist
  mkdir -p "agents/$agent"
  
  # Copy package.json if not exists or if CEO (which we have a custom index.js for)
  if [[ ! -f "agents/$agent/package.json" || "$agent" == "ceo" ]]; then
    cp "agents/shared/package.json" "agents/$agent/package.json"
  fi
  
  # Create index.js if it doesn't exist (except for CEO and Coda which we have custom ones)
  if [[ ! -f "agents/$agent/index.js" && "$agent" != "ceo" && "$agent" != "coda" ]]; then
    cat > "agents/$agent/index.js" << EOF
const BaseAgent = require('../shared/BaseAgent');

class ${agent^}Agent extends BaseAgent {
  constructor() {
    // Channel mapping for $agent agent
    const channelMap = {
      ghl: '1477565867561844736',      // #loan-origination
      arive: '1477565417957359740',    // #approvals  
      pricing: '1477565359862321245',  // #research
      comms: '1477565602309734562',    // #alert
      gmail: '1481041719985442837',    // #gmail
      research: '1481041745415372912'  // #deep-research
    };
    
    super('$agent', channelMap['$agent']);
  }

  getRoleDescription() {
    const descriptions = {
      ghl: 'GoHighLevel integration agent - Handle lead management, client communications, and CRM operations',
      arive: 'ARIVE loan processing agent - Manage loan applications, submissions, and approval workflows',
      pricing: 'Pricing research agent - Analyze rates, search Optimal Blue, and provide pricing guidance',
      comms: 'Communications agent - Manage alerts, notifications, and cross-system communications',
      gmail: 'Gmail operations agent - Handle email management, sending, and inbox processing',
      research: 'Deep research agent - Conduct market analysis, lender research, and data investigation'
    };
    
    return descriptions['$agent'] || 'Specialist agent for VirtuaLending operations';
  }

  onReady() {
    console.log('✅ ${agent^} Agent ready for VirtuaLending operations');
  }
}

// Start the agent
const ${agent}Agent = new ${agent^}Agent();
${agent}Agent.start().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 ${agent^} Agent shutting down...');
  await ${agent}Agent.stop();
  process.exit(0);
});
EOF
  fi
  
  echo "✅ $agent agent ready"
done

echo ""
echo "🎉 All agents set up successfully!"
echo ""
echo "Next steps:"
echo "1. Copy .env.template to .env and add your Discord bot tokens"
echo "2. Run: docker-compose up -d"
echo "3. Check logs: docker-compose logs -f"
echo ""
echo "Agent channels:"
echo "  CEO: #general (1477241100199788629)"
echo "  Coda: #lender-research (1477565950168666153)" 
echo "  GHL: #loan-origination (1477565867561844736)"
echo "  ARIVE: #approvals (1477565417957359740)"
echo "  Pricing: #research (1477565359862321245)"
echo "  Comms: #alert (1477565602309734562)"
echo "  Gmail: #gmail (1481041719985442837)"
echo "  Research: #deep-research (1481041745415372912)"
const BaseAgent = require('../shared/BaseAgent');

class CEOAgent extends BaseAgent {
  constructor() {
    super('ceo', '1477241100199788629'); // #general channel
  }

  getRoleDescription() {
    return `CEO Agent - Executive orchestrator for VirtuaLending operations using Claude Opus for advanced reasoning.
    
    You are the strategic decision-maker and task coordinator. Your role:
    - STRATEGIC OVERSIGHT: Make high-level business decisions and approvals
    - INTELLIGENT DELEGATION: Route tasks to the most appropriate specialist agent
    - WORKFLOW OPTIMIZATION: Identify process improvements and bottlenecks
    - QUALITY ASSURANCE: Ensure specialist outputs meet VirtuaLending standards
    - ESCALATION HANDLING: Manage complex issues requiring executive judgment
    
    Specialist agents at your command:
    - Coda Agent (#lender-research): Lender database, loan pipeline tracking, data analysis
    - GHL Agent (#loan-origination): Lead management, client communications, CRM operations
    - ARIVE Agent (#approvals): Loan application processing, submissions, compliance
    - Pricing Agent (#research): Rate analysis, Optimal Blue pricing, market research
    - Comms Agent (#alert): Notifications, alerts, cross-system communications
    - Gmail Agent (#gmail): Email management, automated responses, inbox processing
    - Research Agent (#deep-research): Market intelligence, lender research, competitive analysis
    
    Decision Framework:
    - Loan processing: ARIVE → Pricing → Coda pipeline
    - Lead management: GHL → Comms coordination  
    - Research tasks: Research → Coda data validation
    - Client communication: Comms → Gmail execution
    
    Use advanced reasoning to optimize task routing and business outcomes.`;
  }

  async handleMessage(message) {
    console.log(`👔 CEO received: ${message.content}`);
    
    // Check if message is delegating to another agent
    const delegation = this.parseDelegation(message.content);
    if (delegation) {
      await this.delegateTask(message, delegation);
      return;
    }

    // Handle as normal AI response
    await super.handleMessage(message);
  }

  parseDelegation(content) {
    const lowerContent = content.toLowerCase();
    
    // Look for delegation patterns
    const patterns = [
      { keywords: ['coda', 'lender', 'database', 'loan tracking'], agent: 'coda', channel: '1477565950168666153' },
      { keywords: ['ghl', 'lead', 'client', 'communication'], agent: 'ghl', channel: '1477565867561844736' },
      { keywords: ['arive', 'application', 'submit', 'processing'], agent: 'arive', channel: '1477565417957359740' },
      { keywords: ['pricing', 'rate', 'optimal blue', 'quote'], agent: 'pricing', channel: '1477565359862321245' },
      { keywords: ['email', 'gmail', 'send', 'communication'], agent: 'gmail', channel: '1481041719985442837' },
      { keywords: ['research', 'investigate', 'analyze', 'study'], agent: 'research', channel: '1481041745415372912' }
    ];

    for (const pattern of patterns) {
      if (pattern.keywords.some(keyword => lowerContent.includes(keyword))) {
        return pattern;
      }
    }

    return null;
  }

  async delegateTask(message, delegation) {
    const guild = this.client.guilds.cache.get(this.guildId);
    const targetChannel = guild.channels.cache.get(delegation.channel);
    
    if (!targetChannel) {
      await message.reply(`❌ Could not find ${delegation.agent} channel for delegation.`);
      return;
    }

    // Send task to appropriate channel
    const delegationMessage = `🎯 **Task from CEO:**\n\n${message.content}\n\n*Original request by: ${message.author.username}*`;
    await targetChannel.send(delegationMessage);

    // Confirm delegation
    await message.reply(`✅ Task delegated to **${delegation.agent.toUpperCase()}** agent in <#${delegation.channel}>`);
  }

  onReady() {
    console.log('👔 CEO Agent ready to coordinate VirtuaLending operations');
  }
}

// Start the agent
const ceoAgent = new CEOAgent();
ceoAgent.start().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('👔 CEO Agent shutting down...');
  await ceoAgent.stop();
  process.exit(0);
});
const { Client, GatewayIntentBits } = require('discord.js');
const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

class BaseAgent {
  constructor(agentId, channelId) {
    this.agentId = agentId;
    this.channelId = channelId;
    this.guildId = process.env.DISCORD_GUILD_ID;
    
    // Discord client setup
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
      ]
    });

    // Anthropic AI setup
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client.once('ready', () => {
      console.log(`✅ ${this.agentId.toUpperCase()} agent online`);
      this.onReady();
    });

    this.client.on('messageCreate', async (message) => {
      // Ignore own messages and messages from other bots
      if (message.author.bot) return;
      
      // Only respond to messages in assigned channel
      if (message.channel.id !== this.channelId) return;

      // Skip if message is just mentioning other users
      if (message.mentions.users.size > 0 && !message.mentions.has(this.client.user.id)) {
        return;
      }

      try {
        await this.handleMessage(message);
      } catch (error) {
        console.error(`❌ ${this.agentId} error:`, error);
        await message.reply('❌ Something went wrong. Please try again.');
      }
    });

    this.client.on('error', console.error);
  }

  async handleMessage(message) {
    console.log(`📩 ${this.agentId} received: ${message.content}`);
    
    // Typing indicator
    await message.channel.sendTyping();

    // Get AI response based on agent role
    const response = await this.getAIResponse(message.content);
    
    // Send response (split if too long)
    if (response.length > 2000) {
      const chunks = this.splitMessage(response);
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } else {
      await message.reply(response);
    }
  }

  async getAIResponse(input) {
    const systemPrompt = this.getSystemPrompt();
    
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: input
        }]
      });

      return response.content[0].text;
    } catch (error) {
      console.error('AI API error:', error);
      return `I'm having trouble processing that request. Please try again or contact support.`;
    }
  }

  getSystemPrompt() {
    return `You are a VirtuaLending ${this.agentId.toUpperCase()} agent. 
    
    VirtuaLending specializes in DSCR (Debt Service Coverage Ratio) loans for real estate investors.
    
    Your role: ${this.getRoleDescription()}
    
    Guidelines:
    - Be professional and efficient
    - Focus on VirtuaLending business needs
    - Use clear, actionable language
    - If you need information from other systems, mention that clearly
    - Keep responses concise but helpful`;
  }

  getRoleDescription() {
    const roles = {
      ceo: 'Main orchestrator - delegate tasks to specialist agents and coordinate operations',
      coda: 'Manage Coda database, lender information, and loan tracking',
      ghl: 'Handle GoHighLevel lead management and client communications', 
      arive: 'Process ARIVE loan applications and submissions',
      pricing: 'Research loan pricing and rates via Optimal Blue',
      comms: 'Manage communications, emails, and notifications',
      gmail: 'Handle Gmail operations and email management',
      research: 'Conduct deep research on lenders, markets, and industry data'
    };
    return roles[this.agentId] || 'Specialist agent for VirtuaLending operations';
  }

  splitMessage(text) {
    const chunks = [];
    const maxLength = 2000;
    
    while (text.length > maxLength) {
      let splitIndex = text.lastIndexOf('\n', maxLength);
      if (splitIndex === -1) splitIndex = maxLength;
      
      chunks.push(text.substring(0, splitIndex));
      text = text.substring(splitIndex);
    }
    
    if (text.length > 0) chunks.push(text);
    return chunks;
  }

  onReady() {
    // Override in subclasses for agent-specific setup
  }

  async start() {
    const token = process.env[`DISCORD_BOT_TOKEN_${this.agentId.toUpperCase()}`];
    if (!token) {
      throw new Error(`Missing Discord bot token for ${this.agentId.toUpperCase()}`);
    }
    
    await this.client.login(token);
  }

  async stop() {
    if (this.client) {
      await this.client.destroy();
    }
  }
}

module.exports = BaseAgent;
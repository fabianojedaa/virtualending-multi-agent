const BaseAgent = require('../shared/BaseAgent');
const axios = require('axios');

class CodaAgent extends BaseAgent {
  constructor() {
    super('coda', '1477565950168666153'); // #lender-research channel
  }

  getRoleDescription() {
    return `Coda Database Agent - Manage VirtuaLending's Coda workspace for lender data and loan tracking.
    
    Responsibilities:
    - Access and update Coda tables (lenders, loans, contacts)
    - Search lender information and guidelines
    - Track loan pipeline and status
    - Generate reports from Coda data
    - Maintain lender relationships and data quality
    
    Available Coda tables:
    - Lenders database with guidelines and contact info
    - Active loans and pipeline tracking
    - Closed loans and performance data
    - Rate sheets and pricing history`;
  }

  async handleMessage(message) {
    console.log(`📊 Coda agent received: ${message.content}`);
    
    // Check for specific Coda operations
    if (await this.handleCodaOperations(message)) {
      return;
    }

    // Handle as normal AI response with Coda context
    await super.handleMessage(message);
  }

  async handleCodaOperations(message) {
    const content = message.content.toLowerCase();
    
    // Search lenders
    if (content.includes('search lender') || content.includes('find lender')) {
      await this.searchLenders(message);
      return true;
    }

    // Get loan status
    if (content.includes('loan status') || content.includes('pipeline')) {
      await this.getLoanStatus(message);
      return true;
    }

    // Add new lender
    if (content.includes('add lender') || content.includes('new lender')) {
      await this.addLender(message);
      return true;
    }

    return false;
  }

  async searchLenders(message) {
    try {
      // In a real implementation, this would query the actual Coda API
      await message.channel.sendTyping();
      
      const mockResults = [
        "🏦 **Active Lenders (Sample Data):**",
        "",
        "• **Prime Lending** - DSCR 1.0+, Max 80% LTV, Rates from 7.25%",
        "• **Velocity Capital** - DSCR 0.75+, Max 75% LTV, Rates from 7.50%", 
        "• **Civic Financial** - DSCR 1.25+, Max 80% LTV, Rates from 7.00%",
        "",
        "📋 *For detailed guidelines and contact info, specify a lender name.*"
      ].join('\n');

      await message.reply(mockResults);
      
    } catch (error) {
      console.error('Coda search error:', error);
      await message.reply('❌ Error searching lenders. Please try again or check Coda directly.');
    }
  }

  async getLoanStatus(message) {
    try {
      await message.channel.sendTyping();
      
      const mockPipeline = [
        "📈 **Current Pipeline Status:**",
        "",
        "🔄 **In Process:** 12 loans ($3.2M volume)",
        "✅ **Approved:** 3 loans ($850K volume)", 
        "⏳ **Pending Docs:** 5 loans ($1.4M volume)",
        "🔍 **Under Review:** 4 loans ($1.0M volume)",
        "",
        "📊 **This Month:** 8 closed ($2.1M), Average: 21 days to close"
      ].join('\n');

      await message.reply(mockPipeline);
      
    } catch (error) {
      console.error('Pipeline status error:', error);
      await message.reply('❌ Error retrieving pipeline status. Please check Coda directly.');
    }
  }

  async addLender(message) {
    await message.reply([
      "➕ **Add New Lender Process:**",
      "",
      "1. Gather lender information:",
      "   • Company name and contact details",
      "   • Loan products and criteria", 
      "   • Rate sheets and guidelines",
      "",
      "2. I can help format this data for Coda entry",
      "3. Please provide the lender details to get started",
      "",
      "💡 *Tip: Include AE contact info and any special requirements*"
    ].join('\n'));
  }

  onReady() {
    console.log('📊 Coda Agent ready - managing lender database and loan pipeline');
  }
}

// Start the agent
const codaAgent = new CodaAgent();
codaAgent.start().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('📊 Coda Agent shutting down...');
  await codaAgent.stop();
  process.exit(0);
});
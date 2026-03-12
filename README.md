# 🤖 VirtuaLending Multi-Agent System

**Cloud-based Discord bot architecture for VirtuaLending operations**

## 🏗️ Architecture

- **8 Specialized AI Agents** running in Docker containers
- **Shared PostgreSQL database** for data persistence  
- **Redis cache** for session management
- **Discord integration** for team communication
- **Cloud deployment** via GitHub Codespaces or any Docker host

## 🤖 Agent Roles

| Agent | Channel | Responsibilities |
|-------|---------|-----------------|
| **CEO** | #general | Orchestrate tasks, delegate to specialists |
| **Coda** | #lender-research | Manage lender database and loan tracking |
| **GHL** | #loan-origination | Handle lead management and client comms |  
| **ARIVE** | #approvals | Process loan applications and submissions |
| **Pricing** | #research | Research rates and pricing via Optimal Blue |
| **Comms** | #alert | Manage notifications and communications |
| **Gmail** | #gmail | Handle email operations and inbox management |
| **Research** | #deep-research | Conduct market and lender research |

## 🚀 Quick Deploy (15 minutes)

### Step 1: Create Discord Bots

1. **Follow:** [CREATE-DISCORD-BOTS.md](CREATE-DISCORD-BOTS.md) 
2. **Create 8 bot applications** in Discord Developer Portal
3. **Save all 8 bot tokens** securely

### Step 2: Deploy to GitHub Codespaces

1. **Fork this repository** to your GitHub account
2. **Go to:** Your forked repository  
3. **Click:** "Code" → "Codespaces" → "Create codespace on main"
4. **Wait 2-3 minutes** for automatic setup

### Step 3: Configure Bot Tokens

1. **In Codespace terminal:**
   ```bash
   cp .env.template .env
   nano .env
   ```

2. **Add your Discord bot tokens:**
   ```env
   DISCORD_BOT_TOKEN_CEO=your_ceo_bot_token_here
   DISCORD_BOT_TOKEN_CODA=your_coda_bot_token_here
   # ... etc for all 8 agents
   ```

3. **Save and close** the file (Ctrl+X, Y, Enter in nano)

### Step 4: Start All Agents

```bash
docker-compose up -d
```

### Step 5: Verify Deployment

```bash
# Check all agents are running
docker-compose ps

# View logs
docker-compose logs -f

# Test in Discord - go to #general and type: "Hello CEO"
```

## 📱 Usage Examples

### CEO Agent (Orchestrator)
```
# In #general channel:
"Price a $500K investment property with 20% down"
"Search for lenders with DSCR under 1.0" 
"Check loan pipeline status"
"Send welcome email to new client John Doe"
```

### Specialist Agents
```
# In #lender-research:
"Search lenders in California with fix-and-flip products"

# In #loan-origination: 
"Update lead status for Michael Smith to qualified"

# In #approvals:
"Submit DSCR application for property at 123 Main St"

# In #research:
"Research Optimal Blue rates for 30-year DSCR loans"
```

## 🔧 Configuration

### Environment Variables
- `DISCORD_GUILD_ID` - Your Discord server ID (1477241099360800803)
- `DISCORD_BOT_TOKEN_*` - Bot tokens for each agent
- `ANTHROPIC_API_KEY` - For AI responses (or OPENAI_API_KEY)
- `CODA_API_TOKEN` - For Coda database access
- `GHL_API_KEY` - For GoHighLevel integration

### Channel Mapping
Edit `docker-compose.yml` to change channel assignments:
```yaml
environment:
  - DISCORD_CHANNEL_ID=your_channel_id_here
```

## 🛠️ Development

### Add New Agent
1. **Copy an existing agent folder**
2. **Modify the role description and logic**  
3. **Add to docker-compose.yml**
4. **Create Discord bot and get token**

### Extend Agent Capabilities
- **Add API integrations** (Coda, GHL, ARIVE, etc.)
- **Implement database operations**
- **Add slash commands** for advanced interactions
- **Connect to external services**

## 🐳 Alternative Deployments

### Cloud VM (DigitalOcean, AWS, etc.)
```bash
# On your cloud server:
git clone https://github.com/your-username/virtualending-agents.git
cd virtualending-agents
cp .env.template .env
# Edit .env with your tokens
docker-compose up -d
```

### Local Development
```bash
# With Docker Desktop/OrbStack:
git clone the-repo
cd virtualending-agents  
./setup-agents.sh
cp .env.template .env
# Edit .env
docker-compose up -d
```

## 📊 Monitoring

```bash
# View all agent logs
docker-compose logs -f

# Check specific agent
docker-compose logs -f agent-ceo

# Restart specific agent  
docker-compose restart agent-coda

# Scale agents (if needed)
docker-compose up -d --scale agent-research=2
```

## 🔐 Security

- **Bot tokens** are stored as environment variables
- **Database** is isolated within Docker network
- **API keys** are not exposed in logs
- **Agents** only respond to assigned channels

## 🆘 Troubleshooting

### Bot Not Responding
1. **Check bot is online** in Discord server members
2. **Verify channel ID** matches agent configuration  
3. **Check logs:** `docker-compose logs agent-name`
4. **Ensure bot has permissions** to read/send messages

### Missing Tokens
1. **Verify .env file** has all required tokens
2. **Check token format** (should start with 'MTI...')  
3. **Recreate bot token** if needed in Developer Portal

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

## 📈 Scaling

- **Horizontal:** Add more agent instances with `--scale`
- **Vertical:** Increase container resources in docker-compose.yml
- **Distribution:** Deploy agents across multiple hosts
- **Load Balancing:** Use nginx for API endpoints

---

**🎯 Ready to revolutionize VirtuaLending operations with AI agents!**
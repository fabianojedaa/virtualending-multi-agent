# 🤖 Create 8 Discord Bot Applications

## Quick Setup (15 minutes)

### Step 1: Go to Discord Developer Portal
**URL:** https://discord.com/developers/applications

### Step 2: Create Each Bot Application

Create these 8 bot applications **one by one**:

1. **VirtuaLending - CEO** (Orchestrator)
2. **VirtuaLending - Coda** (Lender Research)
3. **VirtuaLending - GHL** (Lead Origination)
4. **VirtuaLending - ARIVE** (Application Processing)
5. **VirtuaLending - Pricing** (Rate Research)
6. **VirtuaLending - Comms** (Communications)
7. **VirtuaLending - Gmail** (Email Management)
8. **VirtuaLending - Research** (Deep Research)

### Step 3: For Each Application:

1. **Click "New Application"**
2. **Name:** Use exact names above (e.g., "VirtuaLending - CEO")
3. **Go to "Bot" tab → "Add Bot"**
4. **Enable these Privileged Gateway Intents:**
   - ✅ Message Content Intent
   - ✅ Server Members Intent (if needed)
5. **Copy the Bot Token** (keep this secret!)
6. **Go to "OAuth2" → "URL Generator"**
   - **Scopes:** `bot` + `applications.commands`
   - **Permissions:** Select:
     - View Channels
     - Send Messages
     - Embed Links
     - Attach Files
     - Read Message History
     - Add Reactions
     - Use Slash Commands
7. **Copy the generated invite URL**
8. **Paste invite URL in browser → Select your Discord server**
9. **Authorize the bot**

### Step 4: Save All Tokens

Copy all 8 bot tokens and save them in `.env` file:

```env
DISCORD_BOT_TOKEN_CEO=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_CODA=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_GHL=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_ARIVE=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_PRICING=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_COMMS=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_GMAIL=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_RESEARCH=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
```

### Step 5: Verify Bots in Discord

Check your Discord server - you should see 8 new bots with "OFFLINE" status. They'll come online when you start the multi-agent system.

## Quick Invite URLs (Pre-filled)

Once you create the applications, here are the invite URL templates:

- **CEO:** `https://discord.com/oauth2/authorize?client_id=YOUR_CEO_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **Coda:** `https://discord.com/oauth2/authorize?client_id=YOUR_CODA_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **GHL:** `https://discord.com/oauth2/authorize?client_id=YOUR_GHL_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **ARIVE:** `https://discord.com/oauth2/authorize?client_id=YOUR_ARIVE_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **Pricing:** `https://discord.com/oauth2/authorize?client_id=YOUR_PRICING_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **Comms:** `https://discord.com/oauth2/authorize?client_id=YOUR_COMMS_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **Gmail:** `https://discord.com/oauth2/authorize?client_id=YOUR_GMAIL_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`
- **Research:** `https://discord.com/oauth2/authorize?client_id=YOUR_RESEARCH_CLIENT_ID&scope=bot+applications.commands&permissions=412317243456`

Replace `YOUR_X_CLIENT_ID` with the actual Client ID from each application's "General Information" tab.
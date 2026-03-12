# 🚂 Deploy to Railway - Complete Guide

## ⚡ Quick Deploy (10 minutes)

### Step 1: Create Railway Account (2 minutes)
1. **Go to:** [railway.app](https://railway.app)
2. **Sign up** with GitHub account
3. **Verify** your account

### Step 2: Create Discord Bots (5 minutes)
**If you haven't already:** Follow `CREATE-DISCORD-BOTS.md` to create 8 Discord bots and get their tokens.

### Step 3: Deploy to Railway (3 minutes)

#### Option A: Deploy from GitHub (Recommended)
1. **Push this repo to GitHub** if not already done
2. **Go to Railway dashboard** → "New Project"
3. **Select "Deploy from GitHub repo"**
4. **Choose:** `virtualending-multi-agent` repository
5. **Railway will auto-detect** the Dockerfile and deploy

#### Option B: Deploy from Local
1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```
2. **Login to Railway:**
   ```bash
   railway login
   ```
3. **Deploy from this folder:**
   ```bash
   cd multi-agent-cloud
   railway up
   ```

### Step 4: Add Environment Variables

**In Railway dashboard:**
1. **Go to your project** → "Variables" tab
2. **Add these variables:**

```bash
NODE_ENV=production
DISCORD_GUILD_ID=1477241099360800803

# Add your 8 Discord bot tokens:
DISCORD_BOT_TOKEN_CEO=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_CODA=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_GHL=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_ARIVE=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_PRICING=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_COMMS=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_GMAIL=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...
DISCORD_BOT_TOKEN_RESEARCH=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ...

# Optional - for AI responses:
ANTHROPIC_API_KEY=sk-ant-api03-...
```

3. **Click "Deploy"** to restart with new environment variables

### Step 5: Verify Deployment

1. **Check Railway logs** - should see all 8 agents starting
2. **Go to Discord** → #general channel  
3. **Type:** "Hello CEO"
4. **CEO bot should respond!**

## 🎯 **Expected Log Output:**

```
🚀 Starting VirtuaLending Multi-Agent System...
📡 Starting CEO agent...
📡 Starting CODA agent...
📡 Starting GHL agent...
📡 Starting ARIVE agent...
📡 Starting PRICING agent...
📡 Starting COMMS agent...
📡 Starting GMAIL agent...
📡 Starting RESEARCH agent...

[CEO] ✅ CEO agent online
[CODA] 📊 Coda Agent ready - managing lender database
[GHL] ✅ Ghl Agent ready for VirtuaLending operations
[ARIVE] ✅ Arive Agent ready for VirtuaLending operations
[PRICING] ✅ Pricing Agent ready for VirtuaLending operations
[COMMS] ✅ Comms Agent ready for VirtuaLending operations
[GMAIL] ✅ Gmail Agent ready for VirtuaLending operations
[RESEARCH] ✅ Research Agent ready for VirtuaLending operations

✅ All agents started. System is ready!
🎯 Go to Discord and test: "Hello CEO" in #general channel
🏥 Health check server running on port 3000
```

## 🔧 **Troubleshooting:**

### **Agents Not Responding:**
1. **Check Railway logs** for errors
2. **Verify bot tokens** are correct in Railway variables
3. **Ensure bots are invited** to Discord server with proper permissions
4. **Check bot is online** in Discord server member list

### **Permission Errors:**
1. **Re-invite bots** with correct OAuth2 URLs
2. **Enable Message Content Intent** in Discord Developer Portal
3. **Grant "Send Messages" permission** in Discord channels

### **Deployment Fails:**
1. **Check Dockerfile** builds locally: `docker build -t test .`
2. **Verify all dependencies** in package.json files
3. **Check Railway build logs** for specific errors

## 💰 **Railway Pricing:**

- **Free Tier:** $5 credit monthly (good for testing)
- **Pro Plan:** $5/month + usage (recommended for production)
- **Estimated cost:** ~$8-15/month for 24/7 operation

## 📊 **Monitoring:**

- **Railway Dashboard:** View logs, metrics, deployments
- **Health Check:** `https://your-app.railway.app/health`
- **Discord Activity:** Watch bots come online in server

## 🚀 **Production Tips:**

1. **Set up monitoring** alerts in Railway
2. **Enable auto-restarts** on failures
3. **Monitor bot response times** and accuracy
4. **Scale up** Railway plan if needed for high usage

---

## 🎉 **You're Live!**

Once deployed, your 8 AI agents will be running 24/7, ready to handle VirtuaLending operations through Discord. Test the CEO delegation system and watch your automated lending workflow come to life!
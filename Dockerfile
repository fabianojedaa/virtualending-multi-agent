FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json first for better caching
COPY package.json ./
RUN npm install

# Copy shared agent dependencies
COPY agents/shared/package.json ./agents/shared/
WORKDIR /app/agents/shared
RUN npm install

# Copy all files
WORKDIR /app
COPY . .

# Install dependencies for each agent
RUN for agent in ceo coda ghl arive pricing comms gmail research; do \
      cd agents/$agent && npm install && cd ../..; \
    done

# Expose port for Railway health checks
EXPOSE $PORT

# Start all agents
CMD ["node", "start-all-agents.js"]
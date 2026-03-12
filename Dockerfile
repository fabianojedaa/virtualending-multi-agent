FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy shared agent files
COPY agents/shared/package.json ./shared/
WORKDIR /app/shared
RUN npm install

# Copy all agent files
WORKDIR /app
COPY agents/ ./agents/
COPY start-all-agents.js ./

# Install dependencies in each agent folder
RUN cd agents/ceo && npm install && \
    cd ../coda && npm install && \
    cd ../ghl && npm install && \
    cd ../arive && npm install && \
    cd ../pricing && npm install && \
    cd ../comms && npm install && \
    cd ../gmail && npm install && \
    cd ../research && npm install

# Expose port (not really needed for Discord bots but good practice)
EXPOSE 3000

# Start all agents
CMD ["node", "start-all-agents.js"]
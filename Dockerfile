# Build stage
FROM node:20 AS builder

WORKDIR /app

# Install build dependencies for native modules (bcrypt)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies with retry mechanism
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Dependencies stage - install production dependencies
FROM node:20-slim AS deps

WORKDIR /app

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --omit=dev && \
    npm cache clean --force

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Create a non-root user for security
RUN groupadd -r nodejs && useradd -r -g nodejs nestjs

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json for reference
COPY package.json ./

# Change ownership to non-root user
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]

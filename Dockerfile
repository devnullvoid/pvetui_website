# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy built files from builder stage
COPY --from=builder --chown=node:node /app/dist ./dist

# Install serve package for static file hosting (pinned for reproducibility)
RUN npm install -g serve@14.2.4

# Expose port 3000
EXPOSE 3000

# Basic container health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

# Do not run the web server as root
USER node

# Start serve with proper logging for Dozzle
CMD ["serve", "-s", "dist", "-l", "3000"]

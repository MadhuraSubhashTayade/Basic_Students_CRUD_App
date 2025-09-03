# ---- Base Build Stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# ---- Runtime Stage ----
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy node_modules + app code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose backend port
EXPOSE 8081

# Start the backend server
CMD ["npm", "start"]
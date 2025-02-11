FROM node:20-alpine AS base

# BUILDER
FROM base AS builder

# Set working directory
WORKDIR /app
COPY . .

# Install dependencies and build
RUN npm i
RUN npm run build

# RUNNER
FROM nginx:alpine-slim

COPY --from=builder --chown=nodejs:nodejs /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

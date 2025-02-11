FROM node:20-alpine AS base

# BUILDER
FROM base AS builder

ARG VITE_API_URL=${VITE_API_URL}

# Set working directory
WORKDIR /app
COPY . .

# Install dependencies and build
RUN npm i
RUN VITE_API_URL=${VITE_API_URL} npm run build

# RUNNER
FROM nginx:alpine-slim

COPY --from=builder --chown=nodejs:nodejs /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

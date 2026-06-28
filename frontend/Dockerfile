# syntax=docker/dockerfile:1

# Build stage: install deps and produce the static bundle with Vite
FROM node:22-alpine AS build
WORKDIR /app

# Copy manifests first so `npm ci` is cached unless dependencies change.
COPY package*.json ./
RUN npm ci

COPY . .

# Vite inlines env vars at build time, so the API URL must be set now.
ARG VITE_API_BASE_URL=http://localhost:5050
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Serve stage: hand the built static files to nginx
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

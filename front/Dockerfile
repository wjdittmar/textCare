# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY textcare/ .
RUN npm ci && npm run build

# Production stage
FROM nginx:alpine
# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy build output
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 08

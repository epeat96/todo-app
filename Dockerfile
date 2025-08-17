# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build with production flags
COPY . .
RUN npx ng build --aot --build-optimizer --optimization --output-hashing=all --base-href=/

# ---------- Runtime stage ----------
FROM nginx:alpine
# Copy built Angular files to NGINX html folder
COPY --from=build /app/dist/* /usr/share/nginx/html/
EXPOSE 80

# Default command runs nginx in foreground
CMD ["nginx", "-g", "daemon off;"]


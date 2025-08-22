# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build with production flags
COPY . .
RUN npx ng build --aot --build-optimizer --optimization --output-hashing=all --base-href=/todo-app

# ---------- Runtime stage ----------
FROM nginx:alpine
# Copy built Angular files to NGINX html folder
COPY --from=build /app/dist/* /usr/share/nginx/html/todo-app/

# Remove default site
RUN rm -f /etc/nginx/conf.d/default.conf

# Add your nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Default command runs nginx in foreground
CMD ["nginx", "-g", "daemon off;"]


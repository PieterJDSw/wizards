# Stage 1: Build the Vue.js application
FROM node:lts-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vue.js application for production
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:stable-alpine as production-stage

# Copy the built assets from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for web access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
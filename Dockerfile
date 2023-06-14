# Use official Node.js runtime image as base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json and tsconfig.json files to the working directory
COPY . ./

# Install all dependencies, including development dependencies
RUN npm ci

# Build the project
RUN npm run build

# Remove development dependencies
RUN npm ci --only=production

# Copy the rest of the project files into the working directory

# Expose the port your app runs on
EXPOSE 3000

# Start the application using the compiled files from the dist folder
CMD ["node", "dist/main"]
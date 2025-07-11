# Use official Node.js image as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

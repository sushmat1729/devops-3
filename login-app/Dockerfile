# Use the official Node.js 14 image from Docker Hub as the base image
FROM node:14

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all other project files into the container
COPY . .

# Expose port 3000 for the application to be accessibl
EXPOSE 3000

# Define the command to start the application
CMD ["node", "server.js"]

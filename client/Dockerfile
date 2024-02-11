# Client Side Docker File
# Use a specific version of Node.js
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the source code into the container
COPY . .

# Expose port 5000 (adjust this if you use a different port)
EXPOSE 5000

# Start the application "npm run dev"
CMD ["npm", "run", "dev"]

# To build and run the Docker image called "backend" from the Dockerfile in the current directory.
#   docker build -t client .

# To run the Docker image and connect to port 5000 and name the container "backend-container". The image name is "backend".
#   docker run -p 5173:5173 --name client-container client
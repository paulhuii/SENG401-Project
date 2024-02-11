# Server (backend) Side Docker File
# Use the specific version of Node.js
FROM node:20.10.0

# Create app directory inside the container
WORKDIR /app

# Copy package.json (and package-lock.json, if available) and .env to the app directory
COPY package*.json ./
# COPY .env ./

# Install the 'concurrently' package
# RUN npm install concurrently --save-dev

# Install dependencies
RUN npm install

# Copy the source code to the app directory
# This seems redundant but it is necessary to copy the source code after installing dependencies. Also good for caching.
# The above won't run if package.json and package-lock.json haven't changed, so it's good for speeding up the process.
COPY . .

# Inform Docker that the container is listening on port 5000
EXPOSE 5000 27017 5173 3000

# Start the application "npm run dev"
CMD ["npm", "run", "dev"]


# To build and run the Docker image called "backend" from the Dockerfile in the current directory.
#   docker build -t backend .

# To run the Docker image and connect to port 5000 and name the container "backend-container". The image name is "backend".
# -d means run the container in detached mode (in the background).
#   docker run -d -p 5000:5000 --name backend-container backend

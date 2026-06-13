# DevOps Project 01 - Node.js Docker Containerization

## Project Overview

This project demonstrates how to package a Node.js application into a Docker container so it can run consistently across different environments.

The application was built with Node.js and Express, then containerized using Docker. Docker Compose was also added to simplify running the containerized application with one command.

## Project Goal

The goal of this project is to understand the basics of application containerization and how Docker helps make application deployment easier, portable, and more consistent.

## Tools Used

* Node.js
* Express.js
* Docker
* Docker Compose
* Git
* GitHub
* Visual Studio Code
* PowerShell

## Project Structure

```text
DevOps-Project-01-NodeJS-Docker/
│
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── README.md
└── screenshots/
```

## Application Features

The Node.js application includes:

* A homepage route
* A health check endpoint
* An application information endpoint
* Docker container support
* Docker Compose support
* Docker health check

## Application Routes

### Home Route

```text
/
```

Displays the main web page.

### Health Check Route

```text
/health
```

Returns the health status of the application.

Example response:

```json
{
  "status": "healthy",
  "service": "nodejs-docker-app",
  "uptime": 120.45,
  "timestamp": "2026-06-11T10:00:00.000Z"
}
```

### Info Route

```text
/api/info
```

Returns basic information about the project.

## How to Run the App Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the application

```bash
npm start
```

The app will run on:

```text
http://localhost:3000
```

## Docker Setup

### Build the Docker image

```bash
docker build -t devops-nodejs-docker .
```

### Run the Docker container

```bash
docker run -d -p 3000:3000 --name devops-nodejs-app devops-nodejs-docker
```

The app will be available at:

```text
http://localhost:3000
```

### Check running containers

```bash
docker ps
```

### View container logs

```bash
docker logs devops-nodejs-app
```

### Stop and remove the container

```bash
docker rm -f devops-nodejs-app
```

## Docker Compose Setup

Docker Compose was added to make it easier to run the application using a single command.

### Start the app with Docker Compose

```bash
docker compose up -d --build
```

The app will run on:

```text
http://localhost:3001
```

### Check Compose containers

```bash
docker compose ps
```

### View logs

```bash
docker logs devops-nodejs-app-compose
```

### Stop Compose containers

```bash
docker compose down
```

## Dockerfile Explanation

```dockerfile
FROM node:lts-alpine
```

Uses a lightweight Node.js image as the base image.

```dockerfile
WORKDIR /app
```

Sets the working directory inside the container.

```dockerfile
COPY package*.json ./
```

Copies dependency files into the container.

```dockerfile
RUN npm ci --omit=dev
```

Installs only production dependencies.

```dockerfile
COPY . .
```

Copies the application source code into the container.

```dockerfile
EXPOSE 3000
```

Documents that the application listens on port 3000.

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
```

Adds a Docker health check to confirm that the application is running properly.

```dockerfile
USER node
```

Runs the app as a non-root user for better container security.

```dockerfile
CMD ["node", "server.js"]
```

Starts the Node.js application.

## Docker Compose Explanation

The `docker-compose.yml` file defines the application service.

```yaml
services:
  nodejs-app:
    build: .
    container_name: devops-nodejs-app-compose
    ports:
      - "3001:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
    restart: unless-stopped
```

The port mapping means:

```text
localhost:3001 on the computer maps to port 3000 inside the container.
```

## Screenshots

The `screenshots` folder contains evidence of:

* Docker image build success
* Docker container running
* Application running in the browser
* Health endpoint response
* Docker logs
* Docker Compose running
* Application running with Docker Compose

## What I Learned

Through this project, I learned:

* How to create a basic Node.js Express application
* How to install and manage Node.js dependencies
* How to write a Dockerfile
* How to build a Docker image
* How to run a Docker container
* How Docker port mapping works
* How to add a Docker health check
* How to use Docker Compose
* How to document a DevOps project properly
* How to prepare a containerized application for future CI/CD deployment

## Resume Highlight

This project demonstrates practical knowledge of:

* Containerization
* Docker image creation
* Docker Compose
* Application health checks
* Local deployment workflows
* DevOps documentation

## Author

Adeboye Oluwatoyin

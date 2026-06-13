
# DevOps Project 02 - CI/CD Pipeline with GitHub Actions and Docker Hub

## Project Overview

This project demonstrates a complete CI/CD pipeline for a containerized Node.js application.

The application is built with Node.js and Express, packaged into a Docker image, tested through a health check endpoint, and automatically pushed to Docker Hub using GitHub Actions.

This project builds on the first containerization project by adding automation. Instead of manually building and pushing the Docker image, GitHub Actions now handles the build, test, and image publishing process whenever code is pushed to the main branch.

## Project Goal

The goal of this project is to understand how CI/CD pipelines work in a DevOps workflow.

The pipeline automates the following steps:

1. Checkout source code from GitHub
2. Set up a Node.js environment
3. Install application dependencies
4. Start the application
5. Run a smoke test against the health endpoint
6. Build a Docker image
7. Login to Docker Hub securely using GitHub Secrets
8. Push the Docker image to Docker Hub

## Tools Used

* Node.js
* Express.js
* Docker
* Docker Hub
* GitHub
* GitHub Actions
* Git
* Visual Studio Code
* PowerShell

## Project Structure

```text
DevOps-Project-02-CICD-Pipeline/
│
├── .github/
│   └── workflows/
│       └── docker-ci-cd.yml
│
├── screenshots/
│   ├── github-actions-dockerhub-success.png
│   ├── dockerhub-image-pushed.png
│   ├── published-image-running.png
│   └── published-health-endpoint.png
│
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Application Description

The application is a simple Node.js Express web application.

It contains:

* A homepage route
* A health check endpoint
* An application information endpoint

The app is designed to be containerized with Docker and automatically published to Docker Hub through a GitHub Actions workflow.

## Application Routes

### Home Route

```text
/
```

Displays the main web page for the CI/CD pipeline project.

### Health Check Route

```text
/health
```

Returns the health status of the application.

Example response:

```json
{
  "status": "healthy",
  "service": "nodejs-cicd-app",
  "project": "DevOps Project 02 - CI/CD Pipeline",
  "uptime": 120.45,
  "timestamp": "2026-06-13T10:00:00.000Z"
}
```

### Info Route

```text
/api/info
```

Returns information about the project.

Example response:

```json
{
  "project": "DevOps Project 02 - CI/CD Pipeline",
  "runtime": "Node.js",
  "framework": "Express",
  "ci_cd": "GitHub Actions",
  "registry": "Docker Hub",
  "containerized": true,
  "environment": "development"
}
```

## Running the Application Locally

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

## Running with Docker

### Build the Docker image locally

```bash
docker build -t devops-nodejs-cicd .
```

### Run the Docker container

```bash
docker run -d -p 3000:3000 --name devops-nodejs-cicd-app devops-nodejs-cicd
```

The app will be available at:

```text
http://localhost:3000
```

### Stop and remove the container

```bash
docker rm -f devops-nodejs-cicd-app
```

## Running with Docker Compose

Docker Compose allows the containerized application to be started using one command.

### Start the app with Docker Compose

```bash
docker compose up -d --build
```

The app will run on:

```text
http://localhost:3001
```

### Check running Compose services

```bash
docker compose ps
```

### Stop Compose services

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

Installs production dependencies using the package lock file.

```dockerfile
COPY . .
```

Copies the rest of the application source code into the container.

```dockerfile
EXPOSE 3000
```

Documents that the application listens on port 3000.

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
```

Adds a container health check using the `/health` endpoint.

```dockerfile
USER node
```

Runs the application as a non-root user for better container security.

```dockerfile
CMD ["node", "server.js"]
```

Starts the Node.js application.

## CI/CD Pipeline

The CI/CD workflow is defined in:

```text
.github/workflows/docker-ci-cd.yml
```

The pipeline runs automatically when code is pushed to the `main` branch.

## GitHub Actions Workflow

```yaml
name: Docker CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

env:
  IMAGE_NAME: devops-nodejs-cicd

jobs:
  build-test-and-push:
    name: Build, Test and Push Docker Image
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "lts/*"

      - name: Install dependencies
        run: npm ci

      - name: Run application smoke test
        run: |
          npm start &
          sleep 5
          curl --fail http://localhost:3000/health

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker image locally
        run: docker build -t $IMAGE_NAME:test .

      - name: Login to Docker Hub
        if: github.event_name == 'push'
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image to Docker Hub
        if: github.event_name == 'push'
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:latest
            ${{ secrets.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

## Pipeline Explanation

### Checkout Source Code

The pipeline first checks out the project files from the GitHub repository.

### Set Up Node.js

A Node.js environment is created on the GitHub-hosted runner.

### Install Dependencies

The pipeline installs project dependencies using:

```bash
npm ci
```

This provides a clean and consistent dependency installation based on `package-lock.json`.

### Smoke Test

The application is started and tested through the health endpoint:

```bash
curl --fail http://localhost:3000/health
```

If the health endpoint does not respond successfully, the pipeline fails.

### Docker Build

The Docker image is built inside the GitHub Actions runner.

### Docker Hub Login

Docker Hub authentication is handled securely using GitHub repository secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

The actual values are not stored in the repository.

### Docker Image Push

After a successful build, the image is pushed to Docker Hub with two tags:

```text
latest
commit-sha
```

The `latest` tag is easy to pull and run, while the commit SHA tag helps identify the exact commit that produced the image.

## Docker Hub Image

The published Docker image is available as:

```text
toyin123/devops-nodejs-cicd:latest
```

## Pulling the Published Image

The image can be pulled from Docker Hub using:

```bash
docker pull toyin123/devops-nodejs-cicd:latest
```

## Running the Published Image Locally

```bash
docker run -d -p 5000:3000 --name cicd-published-app toyin123/devops-nodejs-cicd:latest
```

The app will be available at:

```text
http://localhost:5000
```

The health endpoint will be available at:

```text
http://localhost:5000/health
```

## Stopping the Published Image Container

```bash
docker rm -f cicd-published-app
```

## Screenshots

The `screenshots` folder contains evidence of:

* GitHub Actions workflow success
* Docker image pushed to Docker Hub
* Published image pulled and running locally
* Health endpoint response from the published Docker image

## What I Learned

Through this project, I learned how to:

* Create a CI/CD pipeline using GitHub Actions
* Automate Node.js dependency installation
* Run a smoke test in a CI pipeline
* Build Docker images automatically
* Use GitHub Secrets to protect credentials
* Authenticate GitHub Actions with Docker Hub
* Push Docker images to a container registry
* Pull and run a published Docker image locally
* Understand the difference between containerization and CI/CD automation

## Resume Highlight

This project demonstrates practical knowledge of:

* CI/CD pipeline automation
* GitHub Actions workflow configuration
* Docker image build automation
* Docker Hub image publishing
* Secure secrets management
* Application smoke testing
* Container registry workflow

## Author

Adeboye Oluwatoyin

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps CI/CD Pipeline Project</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
          }

          .card {
            background: #1e293b;
            padding: 40px;
            border-radius: 16px;
            max-width: 800px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          }

          h1 {
            color: #38bdf8;
            font-size: 40px;
          }

          h2 {
            color: #facc15;
          }

          p {
            font-size: 18px;
            line-height: 1.6;
          }

          .badge {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 20px;
            background: #22c55e;
            color: #052e16;
            border-radius: 999px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>DevOps CI/CD Pipeline Project</h1>
          <h2>Project 2: GitHub Actions + Docker Hub</h2>
          <p>
            This application is automatically tested, built into a Docker image,
            and pushed to Docker Hub using a GitHub Actions CI/CD pipeline.
          </p>
          <p>
            Tools used: Node.js, Express, Docker, GitHub Actions, Docker Hub, Git, and GitHub.
          </p>
          <div class="badge">CI/CD Pipeline Deployment Successful</div>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "nodejs-cicd-app",
    project: "DevOps Project 02 - CI/CD Pipeline",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/info", (req, res) => {
  res.status(200).json({
    project: "DevOps Project 02 - CI/CD Pipeline by Toyin",
    runtime: "Node.js",
    framework: "Express",
    ci_cd: "GitHub Actions",
    registry: "Docker Hub",
    containerized: true,
    environment: process.env.NODE_ENV || "development"
  });
});

app.listen(PORT, () => {
  console.log(`CI/CD app is running on port ${PORT}`);
});
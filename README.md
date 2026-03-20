# NotesVault – 3-Tier Kubernetes Notes Application

## Project Overview

NotesVault is a full-stack 3-tier application designed to demonstrate modern DevOps and Kubernetes concepts. The application allows users to create, view, and delete notes while showcasing containerization, orchestration, and deployment strategies in a real-world setup.

This project follows a typical microservices-based architecture deployed on Kubernetes using Docker containers.

---

## HomePage

<img width="1456" height="748" alt="Screenshot 2026-03-20 at 5 08 11 PM" src="https://github.com/user-attachments/assets/5caf9ab3-a460-4d98-84c9-7d3e824b41bd" />

---

## Architecture

User (Browser)
↓
Ingress (NGINX Controller)
↓
Frontend (React served via Nginx)
↓
Backend (Node.js + Express API)
↓
MongoDB (Persistent Storage)

---

## Architecture Design

<img width="1756" height="1282" alt="image" src="https://github.com/user-attachments/assets/9ab4b06b-367a-4f91-9f9a-f0b2ffba6007" />

---

## Components

### Frontend
- Built with React
- Served using Nginx inside a container
- Communicates with backend using `/api/notes`
- Handles UI rendering and user interactions

### Backend
- Built with Node.js and Express
- Provides REST APIs for notes
- Connects to MongoDB using Mongoose
- Includes database seeding for Kubernetes concepts

### Database
- MongoDB deployed inside Kubernetes
- Uses Persistent Volume for data persistence
- Stores notes data (title and content)

### Kubernetes Resources
- Deployments for frontend, backend, and MongoDB
- Services for internal communication
- Ingress for external routing
- ConfigMap for environment variables

---

## Tech Stack

Frontend: React, Axios, Nginx
Backend: Node.js, Express
Database: MongoDB
DevOps: Docker, Kubernetes (Kind)
Networking: NGINX Ingress Controller

---

## Project Structure

3tier-k8s-notesvault/
│
├── frontend/
│   ├── Dockerfile
│   └── src/
│
├── backend/
│   ├── Dockerfile
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── index.js
│
├── k8s/
│   ├── mongo/
│   ├── backend/
│   ├── frontend/
│   └── ingress/
│
└── deploy.sh

---

## Features

- Create notes
- View notes
- Delete notes
- Pre-seeded Kubernetes concepts as notes
- Fully containerized application
- Kubernetes-based deployment
- Ingress-based routing

---

## Setup Instructions

### Prerequisites

- Docker
- Kubernetes cluster (Kind / Minikube)
- kubectl
- Node.js (for local testing)

---

### 1. Build Docker Images

docker build -t notes-frontend:latest ./frontend
docker build -t notes-backend:latest ./backend

---

### 2. Load Images into Kind

kind load docker-image notes-frontend:latest --name notesvault
kind load docker-image notes-backend:latest --name notesvault

---

### 3. Deploy to Kubernetes

kubectl apply -f k8s/mongo
kubectl apply -f k8s/backend
kubectl apply -f k8s/frontend
kubectl apply -f k8s/ingress

---

### 4. Access Application

kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8080:80

Open:
http://localhost:8080

---

## Environment Configuration

Backend uses environment variables via ConfigMap:

MONGO_URI = mongodb://mongo-service:27017/notesapp

---

## Database Seeding

- Runs automatically on backend startup
- Inserts Kubernetes concepts if database is empty
- Prevents duplicate data using document count check

---

## Kubernetes Concepts Demonstrated

- Pods
- Deployments
- Services (ClusterIP)
- Ingress
- ConfigMaps
- Persistent Volumes and Claims
- MongoDB stateful storage

---

## Future Improvements

- Authentication (JWT / OAuth)
- Notes editing functionality
- CI/CD pipeline (GitHub Actions / Argo CD)
- Helm chart packaging
- Monitoring (Prometheus + Grafana)
- Logging (ELK / Loki)

---

## Author

Aditya Rudola

This project is built for learning and demonstrating real-world Kubernetes and DevOps workflows.

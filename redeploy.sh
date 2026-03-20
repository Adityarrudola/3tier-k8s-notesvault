#!/bin/bash

set -e

echo "Starting rebuild and deployment"

# Build Docker images
echo "Building backend image"
docker build -t notes-backend:latest ./backend

echo "Building frontend image"
docker build -t notes-frontend:latest ./frontend

# Load images into KIND
echo "Loading images into KIND cluster"
kind load docker-image notes-backend:latest --name notesvault
kind load docker-image notes-frontend:latest --name notesvault

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests"
kubectl apply -f k8s/mongo/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress/

# Restart pods to pick new images
echo "Restarting backend and frontend pods"
kubectl delete pod -l app=backend || true
kubectl delete pod -l app=frontend || true

# Show cluster status
echo "Cluster status"
kubectl get pods
kubectl get svc
kubectl get endpoints

echo "Deployment complete"
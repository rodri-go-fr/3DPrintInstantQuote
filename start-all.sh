#!/bin/bash

echo "🔹 Starting 3D Print Instant Quote System..."

# Start the backend
echo "Starting backend..."
./start-backend.sh

# Start the frontend
echo "Starting frontend..."
./start-frontend.sh

#!/bin/bash

echo "🔹 Starting PrusaSlicer Docker container..."

# Build & start the container
docker compose up -d --build

echo "✅ Container started!"
echo "---------------------"
echo "📋 Container information:"
echo "  - Name: prusa-slicer-container"
echo "  - API: http://localhost:5000"
echo "  - To enter container: docker exec -it prusa-slicer-container bash"
echo "  - To view logs: docker logs prusa-slicer-container"
echo "---------------------"
echo "🔹 To start the frontend, run: make frontend"
echo "   This will auto-detect your environment and run the appropriate command."

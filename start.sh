#!/bin/bash

echo "Starting PrusaSlicer Docker container..."

# Build & start the container
docker compose up -d --build


echo "---------------------"
echo "Container started! Run the following to enter:"
echo "docker exec -it prusa-slicer-container bash"

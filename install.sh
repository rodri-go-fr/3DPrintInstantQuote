#!/bin/bash

echo "🔹 Checking for Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found! Installing..."
    sudo apt update && sudo apt install -y docker.io
fi

echo "🔹 Checking for Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose not found! Installing..."
    sudo apt install -y docker-compose
fi

echo "✅ Dependencies installed!"

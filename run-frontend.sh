#!/bin/bash

echo "Starting frontend development server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js using:"
    echo "  sudo apt update && sudo apt install -y nodejs npm"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    echo "Please install npm using:"
    echo "  sudo apt update && sudo apt install -y npm"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if tailwindcss is installed
if [ ! -d "node_modules/tailwindcss" ]; then
    echo "Installing tailwindcss..."
    npm install tailwindcss postcss autoprefixer
fi

# Start the development server
echo "Starting Next.js development server..."
npm run dev

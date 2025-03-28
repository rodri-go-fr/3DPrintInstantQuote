#!/bin/bash

echo "🔹 Starting frontend development server..."

# Detect environment
if grep -q Microsoft /proc/version 2>/dev/null || grep -q WSL /proc/version 2>/dev/null || [ -d /mnt/c ]; then
    echo "Detected WSL environment"
    echo "For WSL, it's recommended to run the frontend directly on Windows."
    echo "Option 1: Please open a Windows command prompt and run:"
    echo "cd $(wslpath -w "$(pwd)")/frontend && npm run dev"
    echo ""
    echo "Option 2: Use the provided Windows batch file:"
    echo "$(wslpath -w "$(pwd)")/start-frontend.bat"
    exit 0
fi

# Check if running on Windows
if [ "$OS" = "Windows_NT" ]; then
    echo "Detected Windows environment"
    echo "Running Windows batch file..."
    cmd.exe /c "cd frontend && npm run dev"
    exit 0
fi

# Default to Linux
echo "Detected Linux environment"
cd frontend

# Ensure dependencies are installed
echo "Checking dependencies..."
npm install

# Ensure Tailwind CSS is installed
echo "Checking Tailwind CSS..."
npm install tailwindcss postcss autoprefixer

# Start the development server
echo "Starting Next.js development server..."
npx next dev

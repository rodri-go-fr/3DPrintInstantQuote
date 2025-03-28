#!/bin/bash

echo "🔹 Starting PrusaSlicer Docker container..."

# Detect environment
if grep -q Microsoft /proc/version 2>/dev/null || grep -q WSL /proc/version 2>/dev/null || [ -d /mnt/c ]; then
    echo "Detected WSL environment"
    ./wsl-backend.sh
    exit 0
fi

# Check if running on Windows
if [ "$OS" = "Windows_NT" ]; then
    echo "Detected Windows environment"
    cmd.exe /c "windows-backend.bat"
    exit 0
fi

# Default to Linux
echo "Detected Linux environment"
./linux-backend.sh

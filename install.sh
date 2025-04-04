#!/bin/bash

# Function to check and install dependencies on macOS
install_macos_dependencies() {
    echo "🔹 Checking for Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not found! Installing..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi

    echo "🔹 Checking for Docker..."
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker not found! Installing..."
        brew install --cask docker
    fi

    echo "🔹 Checking for Docker Compose..."
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose not found! Installing..."
        brew install docker-compose
    fi

    echo "🔹 Checking for Python3 and venv support..."
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python3 not found! Installing..."
        brew install python
    fi

    echo "🔹 Checking for python3-venv package..."
    if ! python3 -m venv --help &> /dev/null; then
        echo "❌ python3-venv not found! Installing..."
        brew install python
    fi

    echo "🔹 Checking for Node.js and npm..."
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js not found! Installing..."
        brew install node
    fi
}

# Function to check and install dependencies on Linux
install_linux_dependencies() {
    echo "🔹 Checking for Docker..."
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker not found! Installing..."
        sudo apt update && sudo apt install -y docker.io
    fi

    echo "🔹 Checking for Docker Compose..."
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose not found! Installing..."
        sudo apt install -y docker-compose
    fi

    echo "🔹 Checking for Python3 and venv support..."
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python3 not found! Installing..."
        sudo apt update && sudo apt install -y python3 python3-pip
    fi

    echo "🔹 Checking for python3-venv package..."
    if ! dpkg -l | grep -q python3-venv; then
        echo "❌ python3-venv not found! Installing..."
        sudo apt update && sudo apt install -y python3-venv
    fi

    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1-2)
    echo "🔹 Detected Python version: $PYTHON_VERSION"
    if ! dpkg -l | grep -q python$PYTHON_VERSION-venv; then
        echo "❌ python$PYTHON_VERSION-venv not found! Installing..."
        sudo apt update && sudo apt install -y python$PYTHON_VERSION-venv
    fi

    echo "🔹 Checking for Node.js and npm..."
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js not found! Installing..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
}

# Detect the operating system and install dependencies accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🔹 Detected macOS"
    install_macos_dependencies
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🔹 Detected Linux"
    install_linux_dependencies
else
    echo "❌ Unsupported OS: $OSTYPE"
    exit 1
fi

echo "✅ Dependencies installed!"
echo "🔹 To complete setup, run:"
echo "   make setup-venv    - Set up Python virtual environment"
echo "   make install       - Install all dependencies"
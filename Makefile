.PHONY: start stop install restart setup-venv frontend backend clean help

# Python virtual environment settings
VENV_NAME := venv
PYTHON := python3
PIP := pip3

help:
	@echo "Available commands:"
	@echo "  make install       - Install all dependencies (Docker, Python venv, Node.js)"
	@echo "  make setup-venv    - Set up Python virtual environment"
	@echo "  make backend       - Start the backend server"
	@echo "  make frontend      - Start the frontend development server"
	@echo "  make start         - Start both backend and frontend"
	@echo "  make stop          - Stop all services"
	@echo "  make restart       - Restart all services"
	@echo "  make clean         - Remove virtual environment and temporary files"

install:
	@chmod +x install.sh && ./install.sh
	@$(MAKE) setup-venv
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install

setup-venv:
	@echo "Setting up Python virtual environment..."
	@if [ -d "$(VENV_NAME)" ]; then \
		echo "Virtual environment already exists. Removing..."; \
		rm -rf $(VENV_NAME); \
	fi
	@echo "Creating new virtual environment..."
	@$(PYTHON) -m venv $(VENV_NAME) || { \
		echo "Error creating virtual environment. Please ensure python3-venv is installed:"; \
		echo "sudo apt install python3-venv"; \
		echo "or for your specific Python version:"; \
		echo "sudo apt install python3.X-venv (replace X with your version)"; \
		exit 1; \
	}
	@echo "Activating virtual environment and installing dependencies..."
	@. ./$(VENV_NAME)/bin/activate && $(PIP) install --upgrade pip && $(PIP) install -r prusa-slicer-server/requirements.txt
	@echo "Python virtual environment setup complete!"

backend:
	@docker stop prusa-slicer-container 2>/dev/null || true
	@docker rm prusa-slicer-container 2>/dev/null || true
	@./start.sh

frontend:
	@echo "Starting frontend development server..."
	@cd frontend && npx next dev

start: backend
	@echo "Starting all services..."
	@$(MAKE) frontend

stop:
	@echo "Stopping all services..."
	@docker compose down
	@echo "Services stopped."

restart:
	@echo "Restarting services..."
	@docker compose restart
	@echo "Services restarted."

clean:
	@echo "Cleaning up..."
	@rm -rf $(VENV_NAME)
	@echo "Cleanup complete!"

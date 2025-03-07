# 3D Print Instant Quote
Get an instant quote of an uploaded 3d printed object

## 🚀 Purpose
This project automates slicing 3D models using **PrusaSlicer** inside a **Docker container**, allowing easy STL uploads and generating instant G-code.

## 📁 Current Files
- `Dockerfile` → Sets up **PrusaSlicer CLI** inside Docker.
- `docker-compose.yml` → Defines the container setup.
- `start.sh` → Starts the container.
- `install.sh` → Installs dependencies (Docker, Docker Compose).
- `Makefile` → Provides easy commands (`make start`, `make stop`).
- `UserModels/` → Stores uploaded STL files & generated G-code (ignored in Git).

## 🛠️ How to Run
### **1️⃣ Install Dependencies**
make install

2️⃣ Start the Container
make start

3️⃣ Enter the Container (Optional)
make stop
# Updates to 3D Print Instant Quote

## Cross-Platform Compatibility Improvements

The following changes have been made to improve cross-platform compatibility:

1. **Fixed Tailwind CSS Configuration**:
   - Updated `globals.css` to use proper Tailwind directives
   - Fixed PostCSS configuration in `postcss.config.mjs`

2. **Environment-Aware Startup Scripts**:
   - Created platform-specific scripts for both frontend and backend
   - Added auto-detection of the environment (Linux, Windows, WSL)
   - Eliminated dependency on Make for Windows users

3. **Fixed Backend Docker Issues**:
   - Updated Dockerfile to use a Python virtual environment
   - Fixed the "externally-managed-environment" error
   - Added verbose logging for easier debugging

4. **Case-Sensitive Path Fix**:
   - Fixed the volume mapping in `docker-compose.yml` to use the correct case-sensitive path

## How to Run

### All-in-One Startup

To start both backend and frontend with a single command:

**Linux/macOS:**
```bash
./start-all.sh
```

**Windows:**
```
start-all.bat
```

### Backend Only

**Linux/macOS:**
```bash
./start-backend.sh
```

**Windows:**
```
windows-backend.bat
```

### Frontend Only

**Linux/macOS:**
```bash
./start-frontend.sh
```

**Windows:**
```
windows-frontend.bat
```

### For WSL Users

If you're using WSL:
1. Run the backend in WSL: `./wsl-backend.sh`
2. Run the frontend in Windows: `start-frontend.bat`

## Troubleshooting

If you encounter any issues:

1. Check the Docker logs for detailed error messages:
   ```bash
   docker logs prusa-slicer-container
   ```

2. If the Docker container fails to build, try running with verbose output:
   ```bash
   docker compose up --build
   ```

3. For frontend issues, make sure Tailwind CSS is properly installed:
   ```bash
   cd frontend
   npm install tailwindcss postcss autoprefixer
   ```

4. If you're using WSL, make sure Docker is properly installed and running:
   ```bash
   sudo service docker status
   sudo service docker start  # if not running
   ```

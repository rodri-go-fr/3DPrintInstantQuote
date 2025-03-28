# Updates to 3D Print Instant Quote

## Cross-Platform Compatibility Improvements

The following changes have been made to improve cross-platform compatibility:

1. **Fixed Tailwind CSS Configuration**:
   - Updated `globals.css` to use proper Tailwind directives
   - Fixed PostCSS configuration in `postcss.config.mjs`

2. **Environment-Aware Frontend Startup**:
   - Created a new `start-frontend.sh` script that auto-detects the environment (Linux, Windows, WSL)
   - Updated the Makefile to use this script
   - For WSL users, the script provides instructions to run the frontend directly on Windows

3. **Case-Sensitive Path Fix**:
   - Fixed the volume mapping in `docker-compose.yml` to use the correct case-sensitive path

## How to Run

### Backend

```bash
make backend
```

### Frontend

```bash
make frontend
```

This will auto-detect your environment and run the appropriate command.

### For WSL Users

If you're using WSL, the `make frontend` command will detect this and provide instructions to run the frontend directly on Windows. You should open a Windows command prompt and run the command provided by the script.

Alternatively, you can use the provided Windows batch file:
```
start-frontend.bat
```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed:
   ```bash
   make install
   ```

2. If you're using WSL, try running the frontend directly on Windows as instructed by the script.

3. If you're still having issues, you can manually install Tailwind CSS:
   ```bash
   cd frontend
   npm install tailwindcss postcss autoprefixer
   ```

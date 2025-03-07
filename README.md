# 3D Print Instant Quote

## Overview
This project provides an automated system to upload STL files, estimate printing costs, and generate G-code for 3D printing. The backend runs **PrusaSlicer CLI** inside a **Docker container**, and the frontend is built with **Next.js**.

## Features
- Upload STL files through a web interface.
- Get an instant quote based on filament usage ($50/kg).
- Automatically slice models using PrusaSlicer.
- Reject models that exceed the printer’s build volume.
- Supports configurable infill density and automatic supports.

## Project Structure
3DPrintInstantQuote-1/ │── prusa-slicer-server/ # Backend (Flask API + PrusaSlicer) │ ├── Dockerfile │ ├── server.py # Flask API │ ├── slice_model.py # Slicing logic │ ├── requirements.txt # Python dependencies │── frontend/ # Frontend (Next.js) │── UserModels/ # Shared folder for STL & G-code │── docker-compose.yml │── README.md │── Makefile │── start.sh

## Prerequisites
- Docker
- Node.js & npm (for Next.js frontend)

## Installation
1. Clone the repository:
   cd 3DPrintInstantQuote

2. Install dependencies:
    make install
3. Start the backend:
    make start
4. Start the frontend:
    cd frontend
    npm install
    npm run dev
5. Open http://localhost:3000 to use the web interface.

##API Endpoints
Method	Endpoint	Description
POST	/upload	    Uploads STL file and slices it


##Frontend Features
The frontend (Next.js) allows users to:
* Select an STL file and upload it.
* Receive slicing results (filament usage, estimated time, cost).
* View errors if the model is too large.
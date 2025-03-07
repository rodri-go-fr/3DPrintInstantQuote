import subprocess
import sys
import re
import json
import os

# Enable debug mode? (1 = on, 0 = off)
DEBUG = 1

def debug_print(msg):
    if DEBUG:
        print(f"[DEBUG] {msg}")

# Command-line arguments:
# sys.argv[1] = STL filename
# sys.argv[2] = Fill density (default: 15)
# sys.argv[3] = Enable supports (default: 0 = off, 1 = on)

MODEL_FILE = "/app/shared/" + sys.argv[1]  # STL file path
GCODE_FILE = MODEL_FILE.replace(".stl", ".gcode")
PROFILE_FILE = "/app/shared/prusaslicer-config/x1c.ini"
# PROFILE_FILE = "/app/shared/bambuLabx1cwSupportsnPrinterBundle1.ini"

# Get optional arguments
FILL_DENSITY = sys.argv[2] if len(sys.argv) > 2 else "0.15" 
ENABLE_SUPPORTS = "--support-material-auto" if (len(sys.argv) > 3 and sys.argv[3] == "1") else ""

debug_print(f"Using fill density: {FILL_DENSITY}")
debug_print(f"Support material enabled: {ENABLE_SUPPORTS != ''}")

# Maximum build size for Bambu Lab X1C
MAX_DIMENSION = 256.0  # Max print size in mm

# Run PrusaSlicer to get model dimensions
info_cmd = ["prusa-slicer", "--info", MODEL_FILE]
info_result = subprocess.run(info_cmd, capture_output=True, text=True)

# Extract size values
size_match = re.search(r"size_x = (.+?)\nsize_y = (.+?)\nsize_z = (.+?)\n", info_result.stdout)
if size_match:
    size_x, size_y, size_z = map(float, size_match.groups())
    debug_print(f"Model size: X={size_x}mm, Y={size_y}mm, Z={size_z}mm")
    
    # Check if any dimension exceeds the limit
    if size_x > MAX_DIMENSION or size_y > MAX_DIMENSION or size_z > MAX_DIMENSION:
        print(json.dumps({
            "error": "Model is too large to print",
            "size_x": size_x,
            "size_y": size_y,
            "size_z": size_z
        }))
        sys.exit(1)  # Exit script

# Run slicing with custom settings
slicing_cmd = [
    "prusa-slicer", 
    "--load", PROFILE_FILE, 
    "--fill-density", str(FILL_DENSITY),  # Use decimal format
    "--export-gcode",
    "--output", GCODE_FILE
]

# Add support material flags (must be before the STL file)
if ENABLE_SUPPORTS:
    slicing_cmd.append("--support-material")
    slicing_cmd.append("--support-material-auto")

# Finally, add the STL file to be sliced
slicing_cmd.append(MODEL_FILE)

debug_print(f"Slicing command: {' '.join(slicing_cmd)}")

slicing_result = subprocess.run(slicing_cmd, capture_output=True, text=True)

# Check if slicing failed
if slicing_result.returncode != 0:
    debug_print(f"Slicing error: {slicing_result.stderr}")
    print(json.dumps({"error": "Slicing failed"}))
    sys.exit(1)

# Extract filament usage & print time from G-code
filament_used = 0.0
print_time = "Unknown"

with open(GCODE_FILE, "r") as gcode:
    for line in gcode:
        if "; total filament used [g] =" in line:
            filament_used = float(line.split("=")[1].strip())
        elif "; estimated printing time" in line:
            print_time = line.split("=")[1].strip()

debug_print(f"Filament used: {filament_used}g")
debug_print(f"Estimated print time: {print_time}")

sucFlag = True if filament_used>0 else False
# Return JSON response
print(json.dumps({
    "success": sucFlag,
    "filament_used_g": filament_used,
    "estimated_time": print_time
}))

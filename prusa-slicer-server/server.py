from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

UPLOAD_FOLDER = "/app/shared"  # This should match the UserModels/ directory in Docker
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save STL file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Run slicing script
    result = subprocess.run(
        ["python3", "/app/shared/slice_model.py", file.filename, "0.15", "1"],
        capture_output=True,
        text=True
    )

    return jsonify(json.loads(result.stdout))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

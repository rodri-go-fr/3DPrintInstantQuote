from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/slice", methods=["POST"])
def slice_model():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Save STL file
    file_path = f"/app/shared/{file.filename}"
    file.save(file_path)

    # Run slicing script
    result = subprocess.run(["python3", "/app/shared/slice_model.py", file.filename], capture_output=True, text=True)
    
    return jsonify(json.loads(result.stdout))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

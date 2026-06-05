import os
import pickle
import logging
from typing import Tuple, Optional

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables for model and vectorizer
model = None
vectorizer = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'vectorizer.pkl')

def load_assets():
    """Load the machine learning model and vectorizer from pickle files."""
    global model, vectorizer

    try:
        logger.info("Loading model...")
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)

        logger.info("Loading vectorizer...")
        if not os.path.exists(VECTORIZER_PATH):
            raise FileNotFoundError(f"Vectorizer file not found at {VECTORIZER_PATH}")
        with open(VECTORIZER_PATH, 'rb') as f:
            vectorizer = pickle.load(f)

        logger.info("Backend started successfully")
    except Exception as e:
        logger.error(f"Error loading assets: {e}")
        # In a real production app, we might want to exit if assets fail to load
        # For now, we'll let the app start but endpoints will fail gracefully

# Load assets on startup
load_assets()

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "running",
        "service": "Fake News Detection API"
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    """Prediction endpoint."""
    if model is None or vectorizer is None:
        return jsonify({"error": "Model or vectorizer not loaded"}), 500

    data = request.get_json(silent=True)

    # Validation Rules
    if data is None:
        return jsonify({"error": "Invalid JSON request"}), 400

    if 'text' not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    text = data['text']

    if not isinstance(text, str) or not text.strip():
        return jsonify({"error": "Text field cannot be empty"}), 400

    if len(text.strip()) < 20:
        return jsonify({"error": "Text must be at least 20 characters long"}), 400

    try:
        # Transform using vectorizer
        transformed_text = vectorizer.transform([text])

        # Predict using model
        prediction_label = int(model.predict(transformed_text)[0])

        # Generate confidence score
        # Since PassiveAggressiveClassifier doesn't have predict_proba,
        # we use decision_function and map it to a probability-like score.
        # We'll use a simple sigmoid function for this.
        decision_score = model.decision_function(transformed_text)[0]
        confidence = 1 / (1 + np.exp(-abs(decision_score))) * 100

        # Label Mapping: 0 -> Fake News, 1 -> Real News
        prediction_text = "Real News" if prediction_label == 1 else "Fake News"

        return jsonify({
            "prediction": prediction_text,
            "confidence": round(float(confidence), 2)
        }), 200

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Internal server error during prediction"}), 500

@app.errorhandler(400)
def bad_request(e):
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Using host='0.0.0.0' to allow external access if needed, but requirements say localhost:5000
    app.run(host='0.0.0.0', port=5000, debug=False)

import os
import pickle
import logging
from typing import Tuple

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for localhost development

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

# Load assets on startup
load_assets()

def perform_prediction(text: str) -> Tuple[str, float]:
    """
    Transform and predict using the loaded model.
    Label Mapping: 0 -> Fake News, 1 -> Real News
    """
    transformed_text = vectorizer.transform([text])
    prediction_label = int(model.predict(transformed_text)[0])

    # Generate confidence score using decision function
    # PassiveAggressiveClassifier doesn't have predict_proba, so we use decision_function
    decision_score = model.decision_function(transformed_text)[0]
    confidence = 1 / (1 + np.exp(-abs(decision_score))) * 100

    prediction_text = "Real News" if prediction_label == 1 else "Fake News"
    return prediction_text, round(float(confidence), 2)

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "running",
        "service": "Fake News Detection API"
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    """
    Prediction endpoint.
    Expects JSON: {"text": "..."}
    """
    if model is None or vectorizer is None:
        return jsonify({"error": "Model or vectorizer not loaded"}), 500

    data = request.get_json(silent=True)

    # Validation Rules
    if data is None:
        return jsonify({"error": "Invalid JSON or empty request"}), 400

    if 'text' not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    text = data['text']

    if not isinstance(text, str) or len(text.strip()) == 0:
        return jsonify({"error": "Text field cannot be empty"}), 400

    if len(text.strip()) < 20:
        return jsonify({"error": "Text must be at least 20 characters long"}), 400

    try:
        prediction, confidence = perform_prediction(text)
        return jsonify({
            "prediction": prediction,
            "confidence": confidence
        }), 200
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Internal server error during prediction"}), 500

if __name__ == '__main__':
    # Default server http://localhost:5000
    app.run(host='0.0.0.0', port=5000, debug=False)

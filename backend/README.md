# Fake News Detection API

This project provides a production-ready Flask backend for detecting fake news. It uses a Passive Aggressive Classifier and a TF-IDF Vectorizer to classify news articles as "Real News" or "Fake News".

## Project Structure

```text
backend/
├── app.py              # Flask application
├── model.pkl           # Trained ML model
├── vectorizer.pkl      # TF-IDF Vectorizer
├── requirements.txt    # Python dependencies
├── .gitignore          # Git ignore file
└── README.md           # Documentation
```

## Backend Setup Instructions

### Prerequisites

- Python 3.10 or higher
- pip (Python package installer)

### Virtual Environment Creation

It is recommended to use a virtual environment to manage dependencies:

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### Dependency Installation

Install the required packages using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### Running the Server

Start the Flask server by running:

```bash
python app.py
```

The server will start at `http://localhost:5000`.

## API Endpoints

### 1. Health Check

Checks if the API is running correctly.

- **URL:** `/`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "running",
    "service": "Fake News Detection API"
  }
  ```

### 2. Prediction

Classifies a news article based on the provided text.

- **URL:** `/predict`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "text": "Your long news article text here (minimum 20 characters)."
  }
  ```
- **Validation:**
  - Requests must be valid JSON.
  - The `text` field is required and cannot be empty.
  - The text must be at least 20 characters long.
- **Success Response (200 OK):**
  ```json
  {
    "prediction": "Real News",
    "confidence": 94.12
  }
  ```
  or
  ```json
  {
    "prediction": "Fake News",
    "confidence": 96.45
  }
  ```
- **Error Responses:**
  - **400 Bad Request:** Missing field or validation failure.
    ```json
    { "error": "Text must be at least 20 characters long" }
    ```
  - **500 Internal Server Error:** Model loading issue or processing error.
    ```json
    { "error": "Internal server error during prediction" }
    ```

## Example Testing with CURL

### Health Check
```bash
curl -X GET http://localhost:5000/
```

### Valid Prediction
```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"text": "This is a long news article about something very important happening in the world today."}'
```

### Invalid Prediction (Too Short)
```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"text": "Too short."}'
```

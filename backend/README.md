# Fake News Detection API

Production-ready Flask backend API for detecting fake news using machine learning.

## Project Structure

```text
backend/
├── app.py              # Flask backend API
├── model.pkl           # Trained ML model (Passive Aggressive Classifier)
├── vectorizer.pkl      # TF-IDF Vectorizer
├── requirements.txt    # Python dependencies
├── .gitignore          # Git ignore rules
└── README.md           # Documentation
```

## Backend Setup Instructions

### Prerequisites
- Python 3.10+
- pip

### Virtual Environment Creation
It is recommended to use a virtual environment:
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Dependency Installation
```bash
pip install -r requirements.txt
```

### Running the Server
```bash
python app.py
```
The server will run by default at `http://localhost:5000`.

## API Endpoints

### Health Check
- **Endpoint:** `GET /`
- **Description:** Checks if the service is running.
- **Response:**
```json
{
  "status": "running",
  "service": "Fake News Detection API"
}
```

### Prediction
- **Endpoint:** `POST /predict`
- **Description:** Predicts if the provided news text is Real or Fake.
- **Request Body:**
```json
{
  "text": "Paste a news article here (minimum 20 characters)"
}
```
- **Validation Rules:**
  - Reject empty requests.
  - Reject missing `text` field.
  - Reject text shorter than 20 characters.
- **Success Response:**
```json
{
  "prediction": "Fake News",
  "confidence": 96.45
}
```
- **Error Response:**
```json
{
  "error": "Message here"
}
```

## Local Testing with CURL

### Test Health Check
```bash
curl -X GET http://localhost:5000/
```

### Test Valid Prediction
```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"text": "This is a legitimate news article about scientific discoveries in the field of quantum computing."}'
```

### Test Short Text Error
```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"text": "Too short."}'
```

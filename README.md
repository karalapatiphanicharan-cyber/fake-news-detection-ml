# Fake News Detection AI - Premium Portfolio Project

An AI-powered news verification system featuring advanced machine learning, automated URL content extraction, and high-fidelity analytics.

## Project Architecture

The system is built with a decoupled architecture for scalability and performance:

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS. Hosted on Vercel.
- **Backend**: Flask + Python 3.10. Hosted on Render.
- **AI Core**: Passive Aggressive Classifier with TF-IDF Vectorization for high-speed text classification.
- **Scraping**: `newspaper3k` for intelligent content extraction from any news URL.

```text
/
├── frontend/             # Modern AI UI components & application logic
│   ├── src/components/   # Modular UI elements (Glassmorphism, Recharts)
│   ├── src/hooks/        # Custom state & prediction logic
│   └── src/services/     # API & PDF Export services
│
└── backend/              # Production-ready Flask API
    ├── app.py            # API endpoints (Predict, Analyze URL, Health)
    ├── model.pkl         # Trained ML model
    └── vectorizer.pkl    # TF-IDF Vectorizer
```

## Key Features

- **Multi-Source Analysis**: Analyze raw text or directly extract content from news URLs.
- **Premium UI/UX**: AI-inspired dark theme with glassmorphism, floating particles, and smooth animations (`Framer Motion`).
- **Intelligence Dashboard**: Interactive charts (`Recharts`) showing prediction distribution and confidence trends.
- **Advanced Statistics**: Real-time tracking of total analyses, Real vs Fake counts, and average confidence.
- **Professional Exports**: Generate high-quality verification reports as PDF (`jsPDF`).
- **Smart History**: Persisted analysis history with search, sort, and item deletion.

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python app.py` (Runs on `http://localhost:5000`)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on `http://localhost:5173`)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check & service status |
| `POST` | `/predict` | Predict authenticity from raw text |
| `POST` | `/analyze-url` | Extract and analyze content from a URL |

## Deployment Guide

### Backend (Render/Heroku)
- Environment: Python
- Build Command: `pip install -r requirements.txt`
- Start Command: `python app.py`
- Ensure `PORT` environment variable is handled.

### Frontend (Vercel/Netlify)
- Environment: Node.js
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL` (Point to your deployed backend)

---
© 2026 Fake News Detection AI Project

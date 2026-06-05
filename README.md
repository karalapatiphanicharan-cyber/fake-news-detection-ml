# Fake News Detection AI

A full-stack AI-powered web application that detects whether a news article is **Real** or **Fake** using Machine Learning and Natural Language Processing (NLP). The application combines a trained Scikit-learn model, Flask backend API, React frontend, URL-based article extraction, analytics dashboard, and PDF report generation.

## Live Demo

### Frontend
https://fake-news-detection-ml-hazel.vercel.app

### Backend API
https://fake-news-detection-ml-vhbd.onrender.com

---

## Features

### AI-Powered Fake News Detection
- Detects whether news content is Real or Fake.
- Uses Natural Language Processing (NLP).
- Trained on real-world news datasets.
- Provides prediction confidence scores.

### Text Analysis
- Paste any news article.
- Get instant prediction results.
- View confidence percentage.

### URL Analysis
- Analyze news articles directly from URLs.
- Automatic article extraction.
- Supports standard news websites.

### Analytics Dashboard
- Total analyses count.
- Real vs Fake statistics.
- Average confidence score.
- Historical prediction tracking.

### Analysis History
- Stores previous analyses.
- Search history.
- Sort results.
- Delete individual records.
- Clear all history.

### PDF Report Export
- Export prediction reports.
- Includes:
  - Article content
  - Prediction result
  - Confidence score
  - Timestamp

### Modern User Interface
- Dark theme design.
- Responsive layout.
- Glassmorphism UI.
- Smooth animations.
- Mobile-friendly experience.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

### Backend
- Python
- Flask
- Flask-CORS
- Newspaper3k

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Passive Aggressive Classifier
- NumPy
- Pandas

### Deployment
- Vercel
- Render

---

## Project Architecture

```text
fake-news-detection-ml/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── vectorizer.pkl
│   ├── requirements.txt
│   └── README.md
│
└── README.md
```

## Machine Learning Workflow

```text
News Article
      │
      ▼
Text Preprocessing
      │
      ▼
TF-IDF Vectorization
      │
      ▼
Passive Aggressive Classifier
      │
      ▼
Prediction
      │
      ├── Real News
      └── Fake News
```

---

## API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
  "service": "Fake News Detection API",
  "status": "running"
}
```

### Predict News

```http
POST /predict
```

Request:

```json
{
  "text": "News article content"
}
```

Response:

```json
{
  "prediction": "Real News",
  "confidence": 95.4
}
```

### Analyze URL

```http
POST /analyze-url
```

Request:

```json
{
  "url": "https://example.com/news-article"
}
```

---

## Local Installation

### Clone Repository

```bash
git clone https://github.com/karalapatiphanicharan-cyber/fake-news-detection-ml.git
cd fake-news-detection-ml
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Model Information

| Feature | Value |
|----------|--------|
| Algorithm | Passive Aggressive Classifier |
| Vectorizer | TF-IDF |
| NLP Features | 5000 |
| Framework | Scikit-learn |
| Language | English |

---

## Key Learning Outcomes

- Machine Learning Model Development
- Natural Language Processing (NLP)
- Text Classification
- Flask REST API Development
- React + TypeScript Frontend Development
- Data Visualization
- PDF Generation
- Full-Stack Deployment
- Git & GitHub Workflow
- Production Environment Configuration

---

## Future Improvements

- BERT-based classification
- Multi-language support
- User authentication
- Database integration
- Source credibility scoring
- Real-time news monitoring
- Browser extension support

---

## Screenshots

Add screenshots of:

1. Dashboard
2. Text Analysis
3. URL Analysis
4. Analytics Charts
5. PDF Export Feature

---

## Author

**Phani Charan**

B.Tech – Computer Science Engineering (AI & ML)

GitHub:
https://github.com/karalapatiphanicharan-cyber

---

## License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub.

# Fake News Detection AI - Frontend

Modern, AI-inspired React frontend for the Fake News Detection project.

## Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features

- **Real-time Analysis:** Connects to the Flask backend to classify news.
- **Dark Theme:** Professional AI-inspired design with glassmorphism.
- **History Tracking:** Saves previous analyses to local storage.
- **Statistics:** Tracks total analyses and average confidence.
- **Responsive:** Mobile-friendly layout.

## Setup Instructions

### 1. Prerequisites

- Node.js (v18+)
- npm or yarn
- Backend API running at `http://localhost:5000`

### 2. Installation

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Running the Frontend

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment

### Frontend (Vercel)
The project is configured for easy deployment on Vercel. Ensure you set the `VITE_API_URL` environment variable in the Vercel dashboard.

### Backend (Render)
The companion Flask backend can be deployed on Render. Ensure CORS is correctly configured to allow your Vercel frontend domain.

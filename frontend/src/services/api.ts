export interface PredictionResponse {
  prediction: string;
  confidence: number;
  error?: string;
  extracted_text?: string;
  title?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function predictNews(text: string): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to analyze the article');
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected network error occurred',
      { cause: error }
    );
  }
}

export async function analyzeUrl(url: string): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_URL}/analyze-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to extract or analyze URL');
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected network error occurred',
      { cause: error }
    );
  }
}

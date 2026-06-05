import { useState, useEffect, useCallback } from 'react';
import { predictNews } from '../services/api';
import type { PredictionResponse } from '../services/api';
import type { HistoryItem } from '../components/HistoryPanel';

export function usePredict() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('analysis_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('analysis_history', JSON.stringify(history));
  }, [history]);

  const analyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictNews(text);
      setResult(data);

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        prediction: data.prediction,
        confidence: data.confidence,
        textSnippet: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      };

      setHistory(prev => [newItem, ...prev].slice(0, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('analysis_history');
  };

  const stats = {
    totalAnalyses: history.length,
    averageConfidence: history.length > 0
      ? history.reduce((acc, curr) => acc + curr.confidence, 0) / history.length
      : 0
  };

  return {
    isLoading,
    result,
    error,
    history,
    stats,
    analyze,
    clearResult,
    clearHistory
  };
}

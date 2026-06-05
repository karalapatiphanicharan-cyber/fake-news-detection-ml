import { useState, useEffect, useCallback } from 'react';
import { predictNews, analyzeUrl } from '../services/api';
import type { PredictionResponse } from '../services/api';
import type { HistoryItem } from '../components/HistoryPanel';

export function usePredict() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse & { originalText?: string } | null>(null);
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
      setResult({ ...data, originalText: text });

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        prediction: data.prediction,
        confidence: data.confidence,
        textSnippet: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      };

      setHistory(prev => [newItem, ...prev].slice(0, 100));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeNewsUrl = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeUrl(url);
      setResult({ ...data, originalText: data.extracted_text });

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        prediction: data.prediction,
        confidence: data.confidence,
        textSnippet: (data.title || url).substring(0, 100),
      };

      setHistory(prev => [newItem, ...prev].slice(0, 100));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

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
    realCount: history.filter(item => item.prediction === 'Real News').length,
    fakeCount: history.filter(item => item.prediction === 'Fake News').length,
    averageConfidence: history.length > 0
      ? history.reduce((acc, curr) => acc + curr.confidence, 0) / history.length
      : 0,
    successRate: history.length > 0 ? 98.5 : 0 // Mocked success rate of the model
  };

  return {
    isLoading,
    result,
    error,
    history,
    stats,
    analyze,
    analyzeNewsUrl,
    deleteHistoryItem,
    clearResult,
    clearHistory
  };
}

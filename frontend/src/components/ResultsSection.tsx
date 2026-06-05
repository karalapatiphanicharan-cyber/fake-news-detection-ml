import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ResultsSectionProps {
  prediction: string | null;
  confidence: number | null;
  error: string | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ prediction, confidence, error }) => {
  if (!prediction && !error) return null;

  const isReal = prediction === 'Real News';
  const colorClass = isReal ? 'text-emerald-400' : 'text-red-400';
  const bgClass = isReal ? 'bg-emerald-400' : 'bg-red-400';
  const glowClass = isReal ? 'glow-green' : 'glow-red';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={error ? 'error' : prediction}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-12"
      >
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center space-x-4">
            <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        ) : (
          <div className={`glass-card p-8 border-t-4 ${isReal ? 'border-t-emerald-500' : 'border-t-red-500'} ${glowClass}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Prediction Result</h3>
                <div className="flex items-center space-x-3">
                  {isReal ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  )}
                  <span className={`text-3xl font-bold ${colorClass}`}>{prediction}</span>
                </div>
              </div>

              <div className="text-right">
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">AI Confidence</h3>
                <span className="text-4xl font-mono font-bold tracking-tighter">
                  {confidence?.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest font-bold">
                <span>Precision Meter</span>
                <span>{confidence?.toFixed(2)}%</span>
              </div>
              <div className="h-4 bg-dark/50 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${bgClass} shadow-lg`}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultsSection;

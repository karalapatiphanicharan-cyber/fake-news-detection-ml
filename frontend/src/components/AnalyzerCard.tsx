import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Eraser, Loader2 } from 'lucide-react';

interface AnalyzerCardProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  onClear: () => void;
}

const AnalyzerCard: React.FC<AnalyzerCardProps> = ({ onAnalyze, isLoading, onClear }) => {
  const [text, setText] = useState('');

  const charCount = text.length;
  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  const handleClear = () => {
    setText('');
    onClear();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6 mb-12"
    >
      <div className="relative mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a news article here to analyze..."
          className="w-full h-64 bg-dark/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
        />
        <div className="absolute bottom-4 right-4 flex space-x-4 text-xs text-gray-500">
          <span>{charCount} characters</span>
          <span>{wordCount} words</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onAnalyze(text)}
          disabled={isLoading || !text.trim()}
          className="flex-1 glass-button bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing article...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze News</span>
            </>
          )}
        </button>

        <button
          onClick={handleClear}
          disabled={isLoading || !text}
          className="sm:w-32 glass-button bg-white/5 hover:bg-white/10 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 border border-white/10 transition-all"
        >
          <Eraser className="w-5 h-5" />
          <span>Clear</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AnalyzerCard;

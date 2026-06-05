import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Search, Loader2, Globe } from 'lucide-react';

interface URLAnalyzerProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const URLAnalyzer: React.FC<URLAnalyzerProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-5 h-5 text-accent-cyan" />
        <h3 className="text-lg font-bold">Analyze News URL</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://news-website.com/article-slug"
            className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="glass-button bg-accent-cyan hover:bg-cyan-500 disabled:opacity-50 px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Extract & Analyze</span>
            </>
          )}
        </button>
      </form>
      <p className="text-[10px] text-gray-500 mt-3 text-center sm:text-left">
        * Works best with standard news websites. May fail on paywalled or JS-heavy sites.
      </p>
    </motion.div>
  );
};

export default URLAnalyzer;

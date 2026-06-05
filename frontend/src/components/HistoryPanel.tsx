import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Clock } from 'lucide-react';

export interface HistoryItem {
  id: string;
  timestamp: string;
  prediction: string;
  confidence: number;
  textSnippet: string;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold">Analysis History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>No analysis history yet</p>
          </div>
        ) : (
          history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark/40 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  item.prediction === 'Real News' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {item.prediction}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 mb-2 italic">
                "{item.textSnippet}"
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Confidence Score</span>
                <span className="font-bold font-mono">{item.confidence.toFixed(2)}%</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;

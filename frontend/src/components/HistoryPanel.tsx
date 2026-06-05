import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Clock, Search, SortAsc, SortDesc, Trash } from 'lucide-react';

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
  onDeleteItem: (id: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear, onDeleteItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredAndSortedHistory = useMemo(() => {
    const result = history.filter(item =>
      item.prediction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.textSnippet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [history, searchTerm, sortOrder]);

  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold">Analysis History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
            title="Clear All History"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            {filteredAndSortedHistory.length} Results
          </span>
          <button
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center space-x-1 text-[10px] text-gray-400 hover:text-white transition-colors"
          >
            {sortOrder === 'newest' ? <SortDesc className="w-3 h-3" /> : <SortAsc className="w-3 h-3" />}
            <span className="capitalize">{sortOrder}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {filteredAndSortedHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No items found</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredAndSortedHistory.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="group relative bg-dark/40 border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all hover:bg-dark/60"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.prediction === 'Real News' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {item.prediction}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] text-gray-600 font-mono">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-500/50 hover:text-red-500 transition-all"
                    >
                      <Trash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2 italic leading-relaxed">
                  "{item.textSnippet}"
                </p>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500">Confidence Score</span>
                  <span className="font-bold font-mono text-white">{item.confidence.toFixed(1)}%</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;

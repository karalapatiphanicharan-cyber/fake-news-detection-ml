import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

import type { HistoryItem } from './HistoryPanel';

interface AnalyticsDashboardProps {
  history: HistoryItem[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ history }) => {
  const fakeCount = history.filter(item => item.prediction === 'Fake News').length;
  const realCount = history.filter(item => item.prediction === 'Real News').length;

  const pieData = [
    { name: 'Fake News', value: fakeCount, color: '#ef4444' },
    { name: 'Real News', value: realCount, color: '#10b981' },
  ].filter(d => d.value > 0);

  const trendData = history.slice().reverse().map((item, index) => ({
    name: `N-${history.length - index}`,
    confidence: item.confidence,
  }));

  if (history.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <PieChartIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold">News Distribution</h3>
        </div>

        <div className="h-64 w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
          )}
        </div>
        <div className="flex justify-center space-x-8 mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-400">Fake News ({fakeCount})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-gray-400">Real News ({realCount})</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold">Confidence Trend</h3>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#4b5563" fontSize={10} />
              <YAxis stroke="#4b5563" fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="confidence" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConf)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;

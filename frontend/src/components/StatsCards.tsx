import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Database, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  totalAnalyses: number;
  averageConfidence: number;
  realCount: number;
  fakeCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalAnalyses, averageConfidence, realCount, fakeCount }) => {
  const stats = [
    {
      label: 'Total Analyses',
      value: totalAnalyses,
      icon: Database,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      label: 'Real / Fake',
      value: `${realCount} / ${fakeCount}`,
      icon: BarChart3,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      label: 'Avg. Confidence',
      value: `${averageConfidence.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="glass-card p-6 flex items-center space-x-4"
        >
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;

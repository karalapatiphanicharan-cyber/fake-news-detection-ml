import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldCheck, Shield as ShieldInfo, AlertCircle } from 'lucide-react';

interface PredictionInsightsProps {
  confidence: number;
}

const PredictionInsights: React.FC<PredictionInsightsProps> = ({ confidence }) => {
  const getInsights = () => {
    if (confidence >= 95) {
      return {
        level: 'Very High Confidence',
        color: 'text-emerald-400',
        icon: ShieldCheck,
        description: 'The AI model is extremely certain about this classification based on linguistic patterns and historical data.',
        risk: 'Low Risk of Error'
      };
    } else if (confidence >= 80) {
      return {
        level: 'High Confidence',
        color: 'text-blue-400',
        icon: ShieldInfo,
        description: 'There are clear indicators supporting this classification, although minor nuances might exist.',
        risk: 'Minimal Risk'
      };
    } else if (confidence >= 60) {
      return {
        level: 'Moderate Confidence',
        color: 'text-yellow-400',
        icon: Info,
        description: 'The article contains ambiguous patterns that make a definitive classification more complex.',
        risk: 'Moderate Risk'
      };
    } else {
      return {
        level: 'Low Confidence',
        color: 'text-red-400',
        icon: AlertCircle,
        description: 'The analysis shows conflicting signals. We recommend verifying this with multiple sources.',
        risk: 'High Risk of Error'
      };
    }
  };

  const insights = getInsights();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <insights.icon className={`w-6 h-6 ${insights.color}`} />
        <h4 className={`font-bold uppercase tracking-widest text-sm ${insights.color}`}>
          AI Prediction Insights
        </h4>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Confidence Level</p>
          <p className={`text-lg font-bold ${insights.color}`}>{insights.level}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Analysis Detail</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {insights.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase font-bold">Reliability Score</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-white/5 ${insights.color}`}>
            {insights.risk}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionInsights;

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-6"
      >
        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
          <ShieldCheck className="w-12 h-12 text-blue-500" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
      >
        Fake News <span className="gradient-text">Detection AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
      >
        Analyze news articles using Machine Learning and Natural Language Processing.
        Verify authenticity with high-precision confidence scores.
      </motion.p>
    </div>
  );
};

export default Hero;

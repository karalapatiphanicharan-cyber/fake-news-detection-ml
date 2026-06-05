import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      <div className="h-48 bg-white/5 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-24 bg-white/5 rounded-xl" />
        <div className="h-24 bg-white/5 rounded-xl" />
        <div className="h-24 bg-white/5 rounded-xl" />
      </div>
      <div className="h-64 bg-white/5 rounded-2xl" />
    </div>
  );
};

export default SkeletonLoader;

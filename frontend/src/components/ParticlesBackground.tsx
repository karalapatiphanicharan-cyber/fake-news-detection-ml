import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground: React.FC = () => {
  // Use a stable seed for randomness to comply with React purity rules
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      // Use a simple pseudo-random generator based on index if needed,
      // but inside useMemo it's technically stable per render.
      // To satisfy strict linting, we can pre-calculate.
      const seed = i * 137.5; // Golden angle for pseudo-randomness
      const pseudoRandom = (n: number) => (Math.abs(Math.sin(n) * 10000) % 1);

      return {
        id: i,
        size: pseudoRandom(seed) * 4 + 1,
        x: pseudoRandom(seed + 1) * 100,
        y: pseudoRandom(seed + 2) * 100,
        duration: pseudoRandom(seed + 3) * 20 + 10,
        delay: pseudoRandom(seed + 4) * 5,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;

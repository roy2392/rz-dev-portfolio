import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SparkleInstance = memo(({ size, top, left, duration }) => (
  <motion.svg
    className="absolute pointer-events-none"
    style={{ top, left }}
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    initial={{ scale: 0, rotate: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0], rotate: [0, 90], opacity: [0, 1, 0] }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ duration, ease: 'easeInOut' }}
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 97.496 62.504C110.707 83.7155 152 88 152 88C152 88 110.707 92.2846 97.496 113.496C84.2846 134.707 80 176 80 176C80 176 75.7154 134.707 62.504 113.496C49.2926 92.2846 8 88 8 88C8 88 49.2926 83.7155 62.504 62.504C75.7154 41.2925 80 0 80 0Z"
      fill="currentColor"
    />
  </motion.svg>
));
SparkleInstance.displayName = 'SparkleInstance';

const random = (min, max) => Math.random() * (max - min) + min;

export const SparklesEffect = ({ 
  color = 'text-purple-300', 
  count = 6,
  className = '' 
}) => {
  const [sparkles, setSparkles] = useState([]);

  const generateSparkle = useCallback(() => ({
    id: `${Date.now()}-${Math.random()}`,
    size: random(10, 24),
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
    duration: random(1.5, 3),
  }), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setSparkles(prev => {
        const now = Date.now();
        const filtered = prev.filter(s => now - parseInt(s.id) < 3000);
        if (filtered.length < count) {
          return [...filtered, generateSparkle()];
        }
        return filtered;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [count, generateSparkle]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${color} ${className}`}>
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <SparkleInstance key={sparkle.id} {...sparkle} />
        ))}
      </AnimatePresence>
    </div>
  );
};

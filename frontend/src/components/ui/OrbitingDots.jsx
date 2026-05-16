import { motion } from 'framer-motion';

export const OrbitingDots = ({ size = 32, dotSize = 4, className = '' }) => {
  const dots = [
    { delay: 0, color: 'bg-purple-400' },
    { delay: 0.5, color: 'bg-pink-400' },
    { delay: 1.0, color: 'bg-blue-400' },
  ];

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-purple-500/40 animate-glow-pulse" />
      </div>
      {/* Orbiting dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: dot.delay,
          }}
        >
          <div
            className={`rounded-full ${dot.color} shadow-lg`}
            style={{
              width: dotSize,
              height: dotSize,
              transform: `translateX(${size / 2 - dotSize}px)`,
              boxShadow: `0 0 8px currentColor`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

import { motion } from 'framer-motion';

export const AnimatedGradientText = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-[length:300%_100%] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #a78bfa, #ec4899, #818cf8, #c084fc, #a78bfa)',
      }}
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center'],
      }}
      transition={{
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  );
};

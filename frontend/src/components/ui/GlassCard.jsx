import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', glowColor = 'purple', ...props }) => {
  const glowMap = {
    purple: 'hover:shadow-purple-500/20 border-purple-500/10 hover:border-purple-500/30',
    pink: 'hover:shadow-pink-500/20 border-pink-500/10 hover:border-pink-500/30',
    blue: 'hover:shadow-blue-500/20 border-blue-500/10 hover:border-blue-500/30',
    emerald: 'hover:shadow-emerald-500/20 border-emerald-500/10 hover:border-emerald-500/30',
  };

  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/[0.03] backdrop-blur-xl
        border ${glowMap[glowColor] || glowMap.purple}
        shadow-lg hover:shadow-xl
        transition-all duration-500 ease-out
        ${className}
      `}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrbitingDots } from '../../ui/OrbitingDots';

export const TypingIndicator = ({ inline = false }) => {
  if (inline) {
    return (
      <span className="inline-flex gap-1 ml-1" data-testid="typing-indicator-inline">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 justify-start mb-4"
      data-testid="ai-typing-indicator"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/[0.08]">
        <Bot className="w-4 h-4 text-purple-400" />
      </div>
      <div className="flex flex-col items-start max-w-[80%]">
        <div className="rounded-2xl p-4 bg-white/[0.04] border border-white/[0.06] w-full flex items-center justify-center">
          <OrbitingDots size={28} dotSize={4} />
        </div>
      </div>
    </motion.div>
  );
}; 
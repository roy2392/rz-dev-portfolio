import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export const TypingIndicator = ({ inline = false }) => {
  if (inline) {
    return (
      <span className="inline-flex gap-1 ml-1" data-testid="typing-indicator-inline">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1 h-1 bg-purple-400 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="flex items-start gap-2.5 justify-start"
      data-testid="ai-typing-indicator"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <Bot className="w-3.5 h-3.5 text-white/50" />
      </div>
      <div className="rounded-xl px-4 py-3 bg-white/5 border border-white/5">
        <div className="flex gap-1.5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 
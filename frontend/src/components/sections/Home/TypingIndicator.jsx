import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export const TypingIndicator = ({ inline = false }) => {
  if (inline) {
    return (
      <span className="inline-flex gap-1 ml-1" data-testid="typing-indicator-inline">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1 h-1 bg-emerald-400 rounded-full"
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
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-zinc-800 border border-white/[0.06] flex items-center justify-center">
        <Bot className="w-3.5 h-3.5 text-zinc-400" />
      </div>
      <div className="rounded-2xl px-4 py-3 bg-white/[0.03] border border-white/[0.06]">
        <div className="flex gap-1.5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 
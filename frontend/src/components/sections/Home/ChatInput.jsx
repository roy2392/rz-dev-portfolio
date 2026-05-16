import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Square } from 'lucide-react';
import { getChatConfig } from '../../../config/configLoader';

export const ChatInput = ({ input, setInput, isLoading, onSubmit, onStop }) => {
  const [isFocused, setIsFocused] = useState(false);
  const chatConfig = getChatConfig();
  const placeholder = chatConfig?.inputPlaceholder || 'Ask me anything...';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <div className={`flex-1 flex items-center rounded-xl border transition-colors duration-300 ${
        isFocused ? 'border-emerald-500/30 bg-white/[0.03]' : 'border-white/[0.06] bg-white/[0.02]'
      }`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-sm text-zinc-100 px-4 py-2.5 focus:outline-none placeholder-zinc-600"
          disabled={isLoading}
        />
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.button
            key="stop"
            type="button"
            onClick={onStop}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex-shrink-0 bg-red-500/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors duration-200"
          >
            <Square className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            key="send"
            type="submit"
            disabled={!input.trim()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}; 
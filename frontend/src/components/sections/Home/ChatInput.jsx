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
      <div className={`flex-1 flex items-center rounded-lg border-2 transition-colors ${
        isFocused ? 'border-accent bg-white' : 'border-ink/20 bg-parchment-light'
      }`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-sm text-ink px-4 py-2.5 focus:outline-none placeholder-ink-faint"
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
            className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-lg border-2 border-red-700 transition-colors"
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
            className="retro-btn retro-btn-primary !p-2.5 !rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}; 
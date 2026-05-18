import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Square } from 'lucide-react';
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
      <div className={`flex-1 flex items-center rounded-full border transition-colors ${
        isFocused ? 'border-[#007AFF]/40 bg-white/[0.06]' : 'border-white/[0.1] bg-white/[0.04]'
      }`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-sm text-white/90 px-4 py-2.5 focus:outline-none placeholder-white/25"
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
            className="flex-shrink-0 w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
          </motion.button>
        ) : (
          <motion.button
            key="send"
            type="submit"
            disabled={!input.trim()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex-shrink-0 w-8 h-8 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-20 disabled:cursor-not-allowed active:scale-[0.95]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}; 
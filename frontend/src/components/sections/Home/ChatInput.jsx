import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.form
      onSubmit={handleSubmit}
      className="relative flex items-center gap-3 p-2 rounded-xl"
    >
      {/* Animated border glow */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        isFocused 
          ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 shadow-lg shadow-purple-500/10' 
          : 'bg-white/[0.03]'
      }`} />
      <div className={`absolute inset-0 rounded-xl border transition-colors duration-500 ${
        isFocused ? 'border-purple-500/40' : 'border-white/[0.06]'
      }`} />
      
      {/* Glowing underline */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #ec4899, #8b5cf6, transparent)' }}
        animate={{ opacity: isFocused ? 0.8 : 0, scaleX: isFocused ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
      />

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="relative flex-1 min-w-0 bg-transparent text-white rounded-lg px-4 py-2.5 focus:outline-none placeholder-gray-500 overflow-hidden text-ellipsis whitespace-nowrap z-10"
        disabled={isLoading}
      />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.button
            key="stop"
            type="button"
            onClick={onStop}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10 flex-shrink-0 bg-gradient-to-r from-red-500/80 to-orange-500/80 text-white p-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/20"
          >
            <Square className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            key="send"
            type="submit"
            disabled={!input.trim()}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10 flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.form>
  );
}; 
import { useState, useRef, useEffect } from 'react';
import { useStreamingChat } from '../../../hooks/useStreamingChat';
import { Bot, Sparkles, Zap, Code, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { getPersonalInfo } from '../../../config/configLoader';

const SUGGESTION_CHIPS = [
  { icon: Code, text: "What tech stack do you use?" },
  { icon: Brain, text: "Tell me about your AI projects" },
  { icon: Zap, text: "What's your experience with LLMs?" },
];

export const ChatBox = () => {
  const [input, setInput] = useState('');
  const [userEngaged, setUserEngaged] = useState(false);
  const { messages, isLoading, error, sendMessage, stopAnswering } = useStreamingChat();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastMessageCountRef = useRef(messages.length);
  
  const personalInfo = getPersonalInfo();
  const firstName = personalInfo?.name.split(' ')[0] || 'AI';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!userEngaged) {
      lastMessageCountRef.current = messages.length;
      return;
    }
    if (messages.length > lastMessageCountRef.current) {
      scrollToBottom();
    }
    lastMessageCountRef.current = messages.length;
  }, [messages, userEngaged]);

  const handleSubmit = async (message) => {
    setUserEngaged(true);
    
    const chatRequest = {
      message,
      messages: messages.filter(msg => !msg.isTyping),
      session_id: localStorage.getItem('chatSessionId') || 'default-session',
      timestamp: Date.now() / 1000
    };

    await sendMessage(chatRequest);
  };

  const handleChipClick = (text) => {
    handleSubmit(text);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-16">
      {/* Holographic border wrapper */}
      <div className="relative rounded-2xl p-[1px] overflow-hidden">
        {/* Animated conic gradient border */}
        <div
          className="absolute inset-0 rounded-2xl animate-border-spin"
          style={{
            background: 'conic-gradient(from var(--border-angle, 0deg), #8b5cf6, #ec4899, #6366f1, #a855f7, #8b5cf6)',
            opacity: 0.6,
          }}
        />
        {/* Inner glow */}
        <div className="absolute inset-[1px] rounded-2xl bg-gray-950/95 backdrop-blur-xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl p-4 min-h-[420px] flex flex-col"
        >
          {/* Chat Header */}
          <motion.div 
            className="relative flex items-center justify-between p-3 mb-4 overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5 animate-shimmer bg-[length:200%_100%]" />

            {/* Main content */}
            <div className="relative flex items-center gap-2 flex-shrink-0">
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-40" />
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 rounded-xl shadow-lg shadow-purple-500/20 border border-white/10">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </motion.div>

              <div className="flex items-center gap-1 sm:gap-2">
                <motion.h2 
                  className="text-sm sm:text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {firstName}'s AI
                </motion.h2>
                <motion.div
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.2, 0.8, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" />
                </motion.div>
              </div>
            </div>

            {/* Status + Sound bars */}
            <div className="relative flex items-center gap-3 flex-shrink-0">
              {/* Sound wave bars when loading */}
              {isLoading && (
                <div className="flex items-end gap-[2px] h-4">
                  {[0, 0.15, 0.3, 0.15, 0].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-gradient-to-t from-purple-500 to-pink-400 rounded-full"
                      animate={{ height: ['4px', '16px', '4px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">Online</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Messages container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[300px] scroll-smooth scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent pr-2"
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && !messages.some(msg => msg.isTyping) && (
                <TypingIndicator key="loading-indicator" />
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips (show when no messages from user) */}
          {!userEngaged && (
            <motion.div
              className="flex flex-wrap gap-2 mb-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {SUGGESTION_CHIPS.map((chip, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleChipClick(chip.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/[0.06] transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <chip.icon className="w-3 h-3" />
                  {chip.text}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input form */}
          <div className="relative z-10">
            <ChatInput
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onStop={stopAnswering}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 
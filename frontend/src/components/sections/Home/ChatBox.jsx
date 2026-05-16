import { useState, useRef, useEffect } from 'react';
import { useStreamingChat } from '../../../hooks/useStreamingChat';
import { Bot, Code, Brain, Zap } from 'lucide-react';
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
    if (!userEngaged) { lastMessageCountRef.current = messages.length; return; }
    if (messages.length > lastMessageCountRef.current) scrollToBottom();
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

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl bg-zinc-900/60 border border-white/[0.06] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">{firstName}&apos;s assistant</h3>
              <p className="text-[11px] text-zinc-500">Powered by GPT-4o mini</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-zinc-500">Online</span>
          </div>
        </div>

        <div className="p-5 flex flex-col min-h-[350px]">
          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[280px] scroll-smooth pr-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.06) transparent' }}
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

          {/* Suggestion chips */}
          {!userEngaged && (
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTION_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(chip.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 hover:text-blue-300 hover:border-blue-500/20 hover:bg-blue-500/[0.04] transition-all duration-300"
                >
                  <chip.icon className="w-3 h-3" />
                  {chip.text}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 mb-3 text-sm bg-red-500/[0.06] p-3 rounded-lg border border-red-500/10"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <ChatInput input={input} setInput={setInput} isLoading={isLoading} onSubmit={handleSubmit} onStop={stopAnswering} />
        </div>
      </div>
    </div>
  );
}; 
import { useState, useRef, useEffect } from 'react';
import { useStreamingChat } from '../../../hooks/useStreamingChat';
import { Bot, Code, Brain, Zap } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
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
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90">{firstName}&apos;s AI</h3>
            <p className="text-[10px] text-white/40">GPT-4o mini</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/40">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-3 p-4 scroll-smooth"
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
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {SUGGESTION_CHIPS.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(chip.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/50 hover:text-purple-300 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all"
            >
              <chip.icon className="w-3 h-3" />
              {chip.text}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-400 mx-4 mb-2 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/10">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 flex-shrink-0">
        <ChatInput input={input} setInput={setInput} isLoading={isLoading} onSubmit={handleSubmit} onStop={stopAnswering} />
      </div>
    </div>
  );
}; 
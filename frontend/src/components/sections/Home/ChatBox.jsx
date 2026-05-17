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
    <div className="w-full max-w-3xl">
      <div className="retro-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border-2 border-accent flex items-center justify-center bg-accent/10">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-sans font-semibold text-ink">{firstName}&apos;s assistant</h3>
              <p className="text-[11px] text-ink-faint">Powered by GPT-4o mini</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-ink/15 bg-parchment">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] text-ink-faint">Online</span>
          </div>
        </div>

        <div className="p-5 flex flex-col min-h-[350px] bg-parchment">
          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[280px] scroll-smooth pr-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }}
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink/15 text-xs text-ink-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all"
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
              <div className="text-red-600 mb-3 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </AnimatePresence>

          <ChatInput input={input} setInput={setInput} isLoading={isLoading} onSubmit={handleSubmit} onStop={stopAnswering} />
        </div>
      </div>
    </div>
  );
}; 
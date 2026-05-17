import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { RateLimitCountdown } from './RateLimitCountdown';
import { TypingIndicator } from './TypingIndicator';

export const ChatMessage = ({ message }) => {
  if (message.role === 'assistant' && message.isTyping && !message.content) {
    return <TypingIndicator />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="w-full"
    >
      <div className={`flex items-start gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.role === 'assistant' && (
          <div className="flex-shrink-0 w-7 h-7 rounded-lg border-2 border-ink/20 bg-parchment-light flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-ink-muted" />
          </div>
        )}
        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
          <div className={`rounded-xl px-4 py-3 ${
            message.role === 'user'
              ? 'bg-accent text-white'
              : message.isError
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-parchment-light text-ink border border-ink/10'
          } w-full`}>
            {message.role === 'user' ? (
              <p className="leading-relaxed text-left text-sm whitespace-pre-wrap break-words">{message.content}</p>
            ) : (
              <div className="markdown-content w-full text-sm">
                <ReactMarkdown
                  components={{ p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', ul: 'ul', ol: 'ol', li: 'li', code: 'code', pre: 'pre', blockquote: 'blockquote' }}
                >
                  {message.content}
                </ReactMarkdown>
                {message.isTyping && <TypingIndicator inline />}
              </div>
            )}
          </div>
          {message.isError && message.retryAfter > 0 && (
            <RateLimitCountdown seconds={message.retryAfter} />
          )}
        </div>
        {message.role === 'user' && (
          <div className="flex-shrink-0 w-7 h-7 rounded-lg border-2 border-accent/30 bg-accent/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-accent" />
          </div>
        )}
      </div>
    </motion.div>
  );
}; 
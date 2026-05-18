import { User } from 'lucide-react';
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="w-full"
    >
      <div className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.role === 'assistant' && (
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-[0_1px_4px_rgba(0,122,255,0.2)]">
            <span className="text-[9px] font-bold text-white">RZ</span>
          </div>
        )}
        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
          <div className={`px-4 py-2.5 ${
            message.role === 'user'
              ? 'bg-[#007AFF] text-white rounded-[18px] rounded-br-[4px]'
              : message.isError
              ? 'bg-red-500/10 text-red-300 border border-red-500/10 rounded-[18px]'
              : 'bg-white/[0.08] text-white/80 rounded-[18px] rounded-bl-[4px]'
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
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.1] border border-white/[0.08] flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white/50" />
          </div>
        )}
      </div>
    </motion.div>
  );
}; 
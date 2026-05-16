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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <div className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.role === 'assistant' && <MessageAvatar icon={Bot} color="purple" />}
        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
          <MessageContent message={message} />
          {message.isError && message.retryAfter > 0 && (
            <RateLimitCountdown seconds={message.retryAfter} />
          )}
        </div>
        {message.role === 'user' && <MessageAvatar icon={User} color="pink" />}
      </div>
    </motion.div>
  );
};

const MessageAvatar = ({ icon: Icon, color }) => (
  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-white/[0.08] ${
    color === 'pink' 
      ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20' 
      : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
  }`}>
    <Icon className={`w-4 h-4 ${color === 'pink' ? 'text-pink-400' : 'text-purple-400'}`} />
  </div>
);

const MessageContent = ({ message }) => (
  <div
    className={`rounded-2xl p-4 backdrop-blur-sm ${
      message.role === 'user'
        ? 'bg-gradient-to-br from-purple-500/90 to-pink-500/80 text-white shadow-lg shadow-purple-500/10 border border-purple-400/20'
        : message.isError
        ? 'bg-red-500/10 text-red-200 border border-red-500/20'
        : 'bg-white/[0.04] text-gray-200 border border-white/[0.06] shadow-lg shadow-black/20'
    } w-full`}
  >
    {message.role === 'user' ? (
      <UserMessage content={message.content} />
    ) : (
      <AssistantMessage message={message} />
    )}
  </div>
);

const UserMessage = ({ content }) => (
  <p className="leading-relaxed text-left whitespace-pre-wrap break-words">
    {content}
  </p>
);

const AssistantMessage = ({ message }) => (
  <div className="markdown-content w-full">
    <ReactMarkdown
      components={{
        p: 'p',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        ul: 'ul',
        ol: 'ol',
        li: 'li',
        code: 'code',
        pre: 'pre',
        blockquote: 'blockquote',
      }}
    >
      {message.content}
    </ReactMarkdown>
    {message.isTyping && <TypingIndicator inline />}
  </div>
); 
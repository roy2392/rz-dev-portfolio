import { motion } from 'framer-motion';
import { Brain, BookOpen, MessageSquareText } from 'lucide-react';
import { getContentConfig } from '../../../config/configLoader';

const iconMap = { Brain, BookOpen, MessageSquareText };

export const IntroSection = () => {
  const contentConfig = getContentConfig();
  const content = contentConfig?.intro || { cards: [], paragraphs: [] };

  return (
    <div className="w-full max-w-4xl mt-4 mb-12">
      {/* Feature cards — asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.cards.map((card, index) => {
          const Icon = iconMap[card.icon] || Brain;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="group relative rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-5 hover:border-white/[0.1] transition-colors duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex-shrink-0">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bio paragraphs */}
      {content.paragraphs.length > 0 && (
        <div className="mt-8 space-y-3 max-w-2xl">
          {content.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className={index === 0 
                ? "text-base text-zinc-300 leading-relaxed"
                : "text-sm text-zinc-500 leading-relaxed"}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      )}
    </div>
  );
}; 
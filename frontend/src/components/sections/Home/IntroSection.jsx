import { motion } from 'framer-motion';
import { BookOpen, Brain, MessageSquareText } from 'lucide-react';
import { getContentConfig } from '../../../config/configLoader';
import { GlassCard } from '../../ui/GlassCard';

export const IntroSection = () => {
  const contentConfig = getContentConfig();
  const content = contentConfig?.intro || {
    cards: [],
    paragraphs: []
  };
  
  const iconMap = {
    Brain,
    BookOpen,
    MessageSquareText
  };
  
  const glowColors = ['purple', 'blue', 'emerald'];

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 md:mt-8 mb-4 md:mb-8">
      <div className="space-y-4 md:space-y-6">
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {content.cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Brain;
            
            return (
              <GlassCard
                key={index}
                glowColor={glowColors[index % glowColors.length]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="p-4 md:p-5 h-full flex flex-col items-center text-center">
                  <div className="mb-2 md:mb-4 p-3 rounded-xl bg-white/[0.05]">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1 md:mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {card.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Content section */}
        <div className="text-center max-w-3xl mx-auto space-y-2 md:space-y-4">
          {content.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              className={index === 0 
                ? "text-base md:text-lg text-gray-300 leading-relaxed"
                : "text-sm md:text-base text-gray-400"}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}; 
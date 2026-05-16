import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Letter-by-letter reveal with glow cursor
export const TextReveal = ({ children, className = '', delay = 0, stagger = 0.04 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const text = typeof children === 'string' ? children : '';
  const letters = text.split('');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
          aria-hidden="true"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Typewriter effect
export const TypewriterText = ({ text, className = '', speed = 40, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const letters = text.split('');

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.02, delay: delay + i * (speed / 1000) }}
        >
          {letter}
        </motion.span>
      ))}
      {isInView && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-purple-400 ml-0.5 align-middle animate-text-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: delay + letters.length * (speed / 1000) }}
        />
      )}
    </span>
  );
};

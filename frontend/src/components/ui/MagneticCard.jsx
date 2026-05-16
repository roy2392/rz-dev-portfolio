import { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export const MagneticCard = ({ children, className = '', glowColor = 'purple', disabled = false, ...props }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const colorMap = {
    purple: { border: 'rgba(168,85,247,0.3)', glow: 'rgba(168,85,247,0.15)' },
    pink: { border: 'rgba(236,72,153,0.3)', glow: 'rgba(236,72,153,0.15)' },
    blue: { border: 'rgba(59,130,246,0.3)', glow: 'rgba(59,130,246,0.15)' },
    emerald: { border: 'rgba(16,185,129,0.3)', glow: 'rgba(16,185,129,0.15)' },
  };

  const colors = colorMap[glowColor] || colorMap.purple;

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice.current || disabled) return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${colors.glow}, transparent 60%)`;
      glow.style.opacity = '1';
    });
  }, [colors, disabled]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glow) glow.style.opacity = '0';
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-lg transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      {...props}
    >
      {/* Edge glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ zIndex: 1 }}
      />
      {/* Subtle top shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" style={{ zIndex: 2 }} />
      <div className="relative" style={{ zIndex: 3 }}>{children}</div>
    </motion.div>
  );
};

import { useEffect, useRef } from 'react';

export const EtherealBeams = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isVisible = true;

    const handleVisibility = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const beams = [
      { angle: -30, x: 0.15, speed: 0.4, width: 200, color: [139, 92, 246], opacity: 0.06 },
      { angle: -45, x: 0.4, speed: 0.25, width: 300, color: [236, 72, 153], opacity: 0.05 },
      { angle: -20, x: 0.65, speed: 0.35, width: 180, color: [59, 130, 246], opacity: 0.05 },
      { angle: -55, x: 0.85, speed: 0.3, width: 250, color: [168, 85, 247], opacity: 0.07 },
      { angle: -35, x: 0.3, speed: 0.2, width: 150, color: [99, 102, 241], opacity: 0.04 },
      { angle: -50, x: 0.7, speed: 0.45, width: 220, color: [192, 132, 252], opacity: 0.05 },
    ];

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const draw = () => {
      if (!isVisible) { animationId = requestAnimationFrame(draw); return; }

      time += prefersReducedMotion ? 0.0005 : 0.002;
      ctx.clearRect(0, 0, w(), h());

      for (const beam of beams) {
        const offsetX = Math.sin(time * beam.speed) * 80;
        const offsetY = Math.cos(time * beam.speed * 0.7) * 40;
        const centerX = w() * beam.x + offsetX;
        const rad = (beam.angle * Math.PI) / 180;
        const length = Math.max(w(), h()) * 1.5;

        ctx.save();
        ctx.translate(centerX, -50 + offsetY);
        ctx.rotate(rad);

        const gradient = ctx.createLinearGradient(0, 0, 0, length);
        const [r, g, b] = beam.color;
        const pulse = 0.7 + Math.sin(time * beam.speed * 2) * 0.3;
        gradient.addColorStop(0, `rgba(${r},${g},${b},${beam.opacity * pulse})`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},${beam.opacity * pulse * 0.6})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.filter = 'blur(40px)';
        ctx.fillRect(-beam.width / 2, 0, beam.width, length);
        ctx.restore();
      }

      // Subtle central glow
      const glow = ctx.createRadialGradient(w() / 2, h() * 0.3, 0, w() / 2, h() * 0.3, w() * 0.5);
      glow.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      glow.addColorStop(0.5, 'rgba(168, 85, 247, 0.015)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w(), h());

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

import { useEffect, useRef } from 'react';

export const AuroraBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, color: [139, 92, 246], speed: 1.0 },
      { x: 0.7, y: 0.3, r: 0.3, color: [168, 85, 247], speed: 0.7 },
      { x: 0.5, y: 0.6, r: 0.25, color: [236, 72, 153], speed: 1.3 },
      { x: 0.2, y: 0.7, r: 0.2, color: [59, 130, 246], speed: 0.9 },
    ];

    const draw = () => {
      time += prefersReducedMotion ? 0.001 : 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const blob of blobs) {
        const x = canvas.width * (blob.x + Math.sin(time * blob.speed) * 0.08);
        const y = canvas.height * (blob.y + Math.cos(time * blob.speed * 0.8) * 0.06);
        const r = Math.min(canvas.width, canvas.height) * blob.r;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${blob.color.join(',')}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.join(',')}, 0.03)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
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

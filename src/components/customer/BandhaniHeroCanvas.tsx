import React, { useEffect, useRef } from 'react';

export const BandhaniHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

    // Authentic Bandhani Dot Node Particle
    interface BandhaniKnotParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      originalAlpha: number;
      rotation: number;
      vRot: number;
      color: string;
      hasThread: boolean;
    }

    const dotColors = [
      'rgba(245, 239, 230, ', // Warm Silk White #F5EFE6
      'rgba(194, 157, 89, ',  // Antique Gold #C29D59
      'rgba(226, 215, 199, ', // Sand Cream #E2D7C7
    ];

    const particleCount = Math.min(Math.floor(width / 50), 28);
    const particles: BandhaniKnotParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const alpha = Math.random() * 0.28 + 0.12;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2.5, // 2.5px to 6.5px micro dots
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.1), // gentle upward float like silk in breeze
        alpha,
        originalAlpha: alpha,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.01,
        color: dotColors[Math.floor(Math.random() * dotColors.length)],
        hasThread: Math.random() > 0.4
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.25;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Subtle gentle mouse attraction/repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.6;
          p.y -= (dy / dist) * 0.6;
        }

        // Wrap around boundaries
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 1. Draw outer resisted Bandhani ring
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = `${p.color}${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Draw inner diamond/dot core
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 1.2})`;
        ctx.fill();

        // 3. Delicate tail thread of the knot (authentic signature of hand-tied resist)
        if (p.hasThread) {
          ctx.beginPath();
          ctx.moveTo(p.size * 0.8, 0);
          ctx.quadraticCurveTo(p.size * 2, p.size * 0.8, p.size * 3, p.size * 1.8);
          ctx.strokeStyle = `${p.color}${p.alpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full opacity-80"
    />
  );
};

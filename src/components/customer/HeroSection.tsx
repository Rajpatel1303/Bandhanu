import React, { useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Gem, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setSelectedCategory, profile, siteContent, setCurrentPage } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const hero = siteContent?.hero || {
    badge: 'BANDHANU: EVERY KNOT, A STORY',
    heading: 'Welcome to Bandhanu',
    highlight: 'where heritage meets style.',
    description: 'Explore our exclusive handcrafted Bandhani garments, stoles, and fabrics, designed for every occasion. Start your journey into a living heritage of knots, patterns, and timeless artistry.',
    primaryBtnText: 'Explore Collection',
    secondaryBtnText: 'Enquire via WhatsApp Concierge',
    knotBadgeText: '~25,000 Knots',
    knotBadgeSub: 'Micro Rai Bandhej',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    heroProductTitle: 'Royal Shikargah Gharchola',
    heroProductSub: 'Gajji Silk with 22,000 Micro-Dots & Pure Lagdi Patto Zari'
  };

  // Unique Fluid Silk Ripple & Gold Dust Particle Animation
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

    // Particle nodes for gold dust & silk threads
    interface Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      originalAlpha: number;
    }

    const colors = [
      'rgba(212, 175, 55, ',   // Gold
      'rgba(244, 162, 40, ',   // Amber Marigold
      'rgba(255, 253, 249, ',  // Silk White
      'rgba(200, 90, 50, '     // Terracotta
    ];

    const particles: Node[] = [];
    const count = Math.min(Math.floor(width / 24), 50);

    for (let i = 0; i < count; i++) {
      const alpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha,
        originalAlpha: alpha
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Render gentle flowing silk contour curves
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const wave1 = Math.sin(x * 0.004 + time) * 35;
        const wave2 = Math.cos(x * 0.003 - time * 0.8) * 25;
        const y = height * 0.65 + wave1 + wave2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const wave1 = Math.sin(x * 0.005 - time * 1.2) * 45;
        const wave2 = Math.cos(x * 0.002 + time) * 30;
        const y = height * 0.45 + wave1 + wave2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(155, 17, 30, 0.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Render gold dust particles & connective silk filaments
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes with subtle tie-dye threads
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleExplore = () => {
    setSelectedCategory(null);
    const el = document.getElementById('catalogue-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FBF7EE] to-[#FFFDF9] dark:from-heritage-darkSurface dark:via-heritage-darkCard dark:to-heritage-darkSurface border-b border-heritage-gold/20">
      {/* Background Interactive Silk Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-75 dark:opacity-40"
      />

      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-heritage-crimson/10 via-amber-500/10 to-heritage-terracotta/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-18 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Call to Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-heritage-crimson/10 dark:bg-heritage-crimson/20 border border-heritage-crimson/20 text-heritage-crimson dark:text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold animate-spin" style={{ animationDuration: '6s' }} />
              <span>{hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-heritage-charcoal dark:text-white leading-[1.15] tracking-tight">
              {hero.heading}{' '}
              {hero.highlight && (
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-serif italic text-heritage-crimson dark:text-heritage-gold font-normal mt-2">
                  – {hero.highlight}
                </span>
              )}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-heritage-charcoal/80 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('catalogue')}
                className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 animate-gold-shine cursor-pointer"
              >
                <span>{hero.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Bandhanu! I would like to explore your handcrafted collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white dark:bg-heritage-darkCard border border-emerald-600/30 text-emerald-700 dark:text-emerald-400 font-medium text-sm shadow-sm hover:bg-emerald-50 dark:hover:bg-heritage-darkCard/80 hover:border-emerald-600/60 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>{hero.secondaryBtnText}</span>
              </a>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 pt-4 border-t border-heritage-gold/20 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center xs:items-start gap-2.5 p-2 rounded-xl bg-amber-500/5 xs:bg-transparent">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-heritage-charcoal dark:text-white">100% Hand-Tied</h4>
                  <p className="text-[10px] sm:text-[11px] text-heritage-charcoal/60 dark:text-gray-400">Pure fingertips craft</p>
                </div>
              </div>

              <div className="flex items-center xs:items-start gap-2.5 p-2 rounded-xl bg-rose-500/5 xs:bg-transparent">
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-heritage-crimson shrink-0">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-heritage-charcoal dark:text-white">Pure Silks</h4>
                  <p className="text-[10px] sm:text-[11px] text-heritage-charcoal/60 dark:text-gray-400">Silk Mark Certified</p>
                </div>
              </div>

              <div className="flex items-center xs:items-start gap-2.5 p-2 rounded-xl bg-emerald-500/5 xs:bg-transparent">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-heritage-charcoal dark:text-white">Direct Artisans</h4>
                  <p className="text-[10px] sm:text-[11px] text-heritage-charcoal/60 dark:text-gray-400">Ethical fair wages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase with Floating Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-heritage-gold/30 via-heritage-crimson/20 to-heritage-terracotta/30 blur-lg opacity-80 animate-pulse-subtle"></div>

              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-heritage-gold/40 shadow-2xl bg-heritage-darkSurface">
                <img
                  src={hero.heroImage}
                  alt={hero.heroProductTitle || 'Bandhani Masterpiece'}
                  className="w-full h-[360px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                {/* Caption on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-block px-2 py-0.5 rounded bg-heritage-gold text-heritage-charcoal text-[10px] font-bold tracking-wider uppercase mb-1">
                    Signature Heirloom
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {hero.heroProductTitle}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {hero.heroProductSub}
                  </p>
                </div>
              </div>

              {/* Floating Interactive Badge 1: Knot Count */}
              <div className="absolute -top-4 -left-4 bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md border border-heritage-gold/40 rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-lg bg-heritage-crimson/15 text-heritage-crimson flex items-center justify-center font-serif font-bold text-base">
                  🪡
                </div>
                <div>
                  <div className="text-xs font-bold text-heritage-charcoal dark:text-white">{hero.knotBadgeText}</div>
                  <div className="text-[10px] text-heritage-charcoal/60 dark:text-gray-400">{hero.knotBadgeSub}</div>
                </div>
              </div>

              {/* Floating Interactive Badge 2: Direct WhatsApp Dispatch */}
              <div className="absolute -bottom-5 -right-3 bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md border border-emerald-500/30 rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-heritage-charcoal dark:text-white">Instant Enquiry</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Direct WhatsApp Chat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

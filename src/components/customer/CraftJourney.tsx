import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Droplets, Sparkles, Crown, CheckCircle2 } from 'lucide-react';

interface StageInfo {
  step: string;
  title: string;
  subtitle: string;
  gujaratiTerm: string;
  duration: string;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
  description: string;
  details: string[];
}

const STAGES: StageInfo[] = [
  {
    step: '01',
    title: 'Bandhana',
    subtitle: 'The Sacred Micro-Knotting',
    gujaratiTerm: 'બાંધણા (Fine Knotting)',
    duration: '15 to 45 Days per Saree',
    icon: Scissors,
    color: '#9B111E',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
    description: 'Using natural fingernail dexterity or a brass ring pin (Bhala), the artisan pinches a minute grain-sized fold of pure silk and winds coated cotton thread around it 5 to 8 times without cutting.',
    details: [
      'Micro Rai dots are as tiny as mustard seeds (Rai dana)',
      '15,000 to 30,000 individual knots tied entirely by hand',
      'Preserves original raw silk color under impenetrable pressure'
    ]
  },
  {
    step: '02',
    title: 'Rangai',
    subtitle: 'Sequential Vat Dyeing',
    gujaratiTerm: 'રંગાઈ (Immersion Alchemy)',
    duration: '4 to 7 Dye Baths',
    icon: Droplets,
    color: '#C85A32',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    description: 'Dyed in calculated sequences starting from lightest yellow (Haldi) to deep saffron, sacred vermilion (Sindoor), or midnight indigo. Certain knots are tied between dye baths to create multi-tone ring gradients.',
    details: [
      'Natural madder root, pomegranate rind, and indigo extracts',
      'Water temperature strictly balanced to avoid silk damage',
      'Tied sections remain untouched by the boiling dye'
    ]
  },
  {
    step: '03',
    title: 'Khilana',
    subtitle: 'The Rhythmic Untying & Bloom',
    gujaratiTerm: 'ખીલાણા (The Unraveling)',
    duration: '2 to 3 Days',
    icon: Sparkles,
    color: '#F4A228',
    badgeColor: 'bg-yellow-500/10 text-yellow-800 border-yellow-500/20',
    description: 'Once completely dried in the clean dry breeze of Kutch, the fabric is held diagonally by two weavers and rhythmically snapped. The tight cotton threads break with a crisp acoustic pop, blooming into glowing white-and-yellow constellations.',
    details: [
      'Distinctive crinkle (Chunnat) texture proves authenticity',
      'Each dot is subtly unique, bearing the artisan fingerprint',
      'The raw tactile crinkle smooths out naturally during draping'
    ]
  },
  {
    step: '04',
    title: 'Zari Weaving',
    subtitle: 'Lagdi Patto & Gota Embellishment',
    gujaratiTerm: 'જરદોઝી અને પટો (Royal Borders)',
    duration: '5 to 10 Days',
    icon: Crown,
    color: '#D4AF37',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    description: 'The finished Bandhani canvas is married with pure metallic gold zari grids (Gharchola checks) or hand-embroidered Gota patti and authentic Kutch mirror work along the pallu and borders.',
    details: [
      'Real metallic gold and antique silver zari warp',
      'Heirloom bridal finishing ready for generation-to-generation passage',
      'Silk Mark & Handloom Council certified'
    ]
  }
];

export const CraftJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic interactive visual simulation for the active stage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const h = (canvas.height = canvas.parentElement?.clientHeight || 380);

    let tick = 0;

    const render = () => {
      tick += 0.03;
      ctx.clearRect(0, 0, w, h);

      const currentStage = STAGES[activeStage];

      if (activeStage === 0) {
        // Stage 1: Bandhana — Dynamic knots being connected and tied
        ctx.fillStyle = '#FFFDF9';
        ctx.fillRect(0, 0, w, h);

        const rows = 6;
        const cols = 8;
        const spacingX = w / (cols + 1);
        const spacingY = h / (rows + 1);

        for (let r = 1; r <= rows; r++) {
          for (let c = 1; c <= cols; c++) {
            const x = c * spacingX;
            const y = r * spacingY;
            const wave = Math.sin(tick + c * 0.4 + r * 0.3);

            // Knot thread rings
            ctx.beginPath();
            ctx.arc(x, y, 6 + wave * 2, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(155, 17, 30, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Center core
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#9B111E';
            ctx.fill();

            // Intersecting tying threads
            if (c < cols) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + spacingX, y);
              ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
              ctx.setLineDash([2, 4]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      } else if (activeStage === 1) {
        // Stage 2: Rangai — Liquid dye diffusion wave
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#9B111E');
        grad.addColorStop(0.5, '#C85A32');
        grad.addColorStop(1, '#F4A228');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Liquid concentric dye ripples
        for (let i = 0; i < 5; i++) {
          const r = ((tick * 35 + i * 50) % 250);
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - r / 250)})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Floating protected dots
        for (let j = 0; j < 24; j++) {
          const angle = j * (Math.PI / 12) + tick * 0.2;
          const dist = 70 + Math.sin(tick + j) * 40;
          const px = w / 2 + Math.cos(angle) * dist;
          const py = h / 2 + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFDF9';
          ctx.fill();
        }
      } else if (activeStage === 2) {
        // Stage 3: Khilana — Blooming radiant star dots
        ctx.fillStyle = '#18181B';
        ctx.fillRect(0, 0, w, h);

        const count = 30;
        for (let i = 0; i < count; i++) {
          const seedX = ((i * 73) % (w - 60)) + 30;
          const seedY = ((i * 47) % (h - 60)) + 30;
          const pulse = Math.sin(tick * 2 + i) * 3 + 6;

          // Outer halo
          const halo = ctx.createRadialGradient(seedX, seedY, 1, seedX, seedY, pulse * 2.5);
          halo.addColorStop(0, 'rgba(244, 162, 40, 0.8)');
          halo.addColorStop(0.5, 'rgba(200, 90, 50, 0.4)');
          halo.addColorStop(1, 'transparent');

          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(seedX, seedY, pulse * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = '#FFFDF9';
          ctx.beginPath();
          ctx.arc(seedX, seedY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Stage 4: Zari Weaving — Shimmering gold grid
        ctx.fillStyle = '#800020';
        ctx.fillRect(0, 0, w, h);

        const gridSize = 45;
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
        ctx.lineWidth = 2;

        for (let x = 0; x <= w; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y <= h; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Gold sheen cross highlights
        const shimmerX = (Math.sin(tick) * 0.5 + 0.5) * w;
        const gradShimmer = ctx.createLinearGradient(shimmerX - 40, 0, shimmerX + 40, h);
        gradShimmer.addColorStop(0, 'transparent');
        gradShimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
        gradShimmer.addColorStop(1, 'transparent');

        ctx.fillStyle = gradShimmer;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeStage]);

  return (
    <section id="craft-journey" className="py-20 bg-heritage-sand/40 dark:bg-heritage-darkCard/50 border-b border-heritage-gold/20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-heritage-crimson dark:text-heritage-gold uppercase mb-2">
            The Living Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
            The 4 Stages of Authentic Bandhej Craft
          </h2>
          <p className="mt-3 text-sm sm:text-base text-heritage-charcoal/70 dark:text-gray-300">
            Unlike machine prints, true Bandhani is a sacred months-long dialogue between silk, fingertips, and natural dyes.
            Click each stage below to explore the craft secrets.
          </p>
        </div>

        {/* 4 Interactive Stage Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStage(idx)}
                className={`relative text-left p-4 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-white dark:bg-heritage-darkSurface border-heritage-gold shadow-xl scale-[1.02] ring-2 ring-heritage-gold/30'
                    : 'bg-white/60 dark:bg-heritage-darkSurface/60 border-heritage-gold/20 hover:border-heritage-gold/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? s.color : 'rgba(0,0,0,0.06)',
                      color: isActive ? '#fff' : '#888'
                    }}
                  >
                    Stage {s.step}
                  </span>
                  <Icon
                    className="w-5 h-5 transition-transform duration-300"
                    style={{ color: isActive ? s.color : '#999' }}
                  />
                </div>
                <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {s.subtitle}
                </p>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full"
                    style={{ backgroundColor: s.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase */}
        <div className="bg-white dark:bg-heritage-darkSurface rounded-3xl border border-heritage-gold/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Dynamic Craft Visual Simulation Canvas */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[420px] bg-heritage-darkSurface flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                Live Craft Simulation • {STAGES[activeStage].title}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 z-10 text-right">
              <span className="text-xs font-serif italic text-heritage-gold">
                {STAGES[activeStage].gujaratiTerm}
              </span>
            </div>
          </div>

          {/* Right: Stage Narrative & Highlights */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STAGES[activeStage].badgeColor}`}>
                  {STAGES[activeStage].duration}
                </span>
                <span className="text-xs font-serif italic text-heritage-crimson dark:text-heritage-gold">
                  Authentic Kutch & Jamnagar Method
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white mb-2">
                {STAGES[activeStage].title} — {STAGES[activeStage].subtitle}
              </h3>

              <p className="text-sm sm:text-base text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed">
                {STAGES[activeStage].description}
              </p>

              <div className="mt-5 space-y-2.5">
                {STAGES[activeStage].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Navigation Footer */}
            <div className="pt-4 border-t border-heritage-gold/20 flex items-center justify-between">
              <div className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
                Step {activeStage + 1} of 4 in Bandhani Creation
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveStage(prev => (prev > 0 ? prev - 1 : 3))}
                  className="px-3 py-1.5 rounded-lg border border-heritage-gold/30 hover:bg-heritage-sand/50 text-xs font-medium text-heritage-charcoal dark:text-gray-200"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={() => setActiveStage(prev => (prev < 3 ? prev + 1 : 0))}
                  className="px-3 py-1.5 rounded-lg bg-heritage-crimson text-white hover:bg-heritage-ruby text-xs font-medium shadow-xs"
                >
                  Next Step &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

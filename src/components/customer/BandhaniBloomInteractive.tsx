import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Play, Pause, ChevronRight, Camera } from 'lucide-react';

const DEFAULT_STAGES = [
  {
    step: '01',
    phase: 'Bandhana',
    title: 'The Hand-Tied Resist',
    subtitle: 'Raw Mulberry Silk Pinched & Bound',
    description: 'Using a pointed silver ring, the artisan deft-gathers a minute pinch of raw silk fabric. High-twist cotton thread is wound tightly around the cone, creating an impervious mechanical seal against liquid dyes.',
    badge: 'Artisan Workshop • Bhadli, Kutch',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Artisan hands tying Bandhani knots with cotton thread',
    caption: 'Artisan hands pinching 1mm silk knots with thread resist'
  },
  {
    step: '02',
    phase: 'Rangai',
    title: 'The Natural Dye Bath',
    subtitle: 'Capillary Liquid Dye Immersion',
    description: 'The fabric is submerged into warm fermented madder root and pomegranate rind vats. The rich crimson dye bleeds naturally through the porous silk fibers, stopped dead at the bound thread boundary.',
    badge: 'Natural Fermented Dye Vat',
    image: '/images/artisan-pot.jpg',
    alt: 'Natural dye vat process in Kutch',
    caption: 'Sequential immersion in vegetable & madder root dye vats'
  },
  {
    step: '03',
    phase: 'Khilana',
    title: 'The Crinkled Bloom',
    subtitle: 'Untying Reveals the Iconic Rosette',
    description: 'After drying under the Kutch sun, the fabric is gently pulled corner to corner. The threads pop open to reveal the legendary puckered Bandhani dot with its diamond core and signature textured crush.',
    badge: 'Finished Heirloom Silk',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Opened Bandhani silk cloth with signature crinkle bloom',
    caption: 'The revealed crinkled Bandhani bloom with signature texture'
  }
];

export const BandhaniBloomInteractive: React.FC = () => {
  const { siteContent, theme } = useStore();
  const craftData = siteContent?.craftJourney;
  const stages = craftData?.stages?.length ? craftData.stages : DEFAULT_STAGES;
  const sectionTitle = craftData?.heading || 'The Journey of a Hand-Tied Dot';
  const sectionBadge = craftData?.badge || 'Living Craft In Action';
  const note1 = craftData?.techniqueNote1 || 'Passed through Khatri families in Kutch since 400+ years.';
  const note2 = craftData?.techniqueNote2 || 'Zero wax, zero petroleum—only fingertips & high-twist cotton thread.';

  // Section style overrides from admin theme customizer
  const craftStyles = theme?.sections?.craft;
  const cardBg = craftStyles?.cardBg || undefined;
  const titleColor = craftStyles?.titleColor || undefined;
  const textColor = craftStyles?.textColor || undefined;

  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto cycle stages if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, stages.length]);

  const current = stages[stage] || stages[0];

  return (
    <div
      style={{ backgroundColor: cardBg }}
      className="w-full bg-[#F5EFE6] border border-[#E2D7C7] p-5 sm:p-8 relative overflow-hidden shadow-xs transition-colors duration-300"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2D7C7]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-[#4A121A] mb-1">
            <Camera className="w-3.5 h-3.5 text-[#C29D59]" />
            <span>{sectionBadge}</span>
          </div>
          <h3
            style={{ color: titleColor }}
            className="font-serif font-bold text-xl sm:text-2xl text-[#241E1C]"
          >
            {sectionTitle}
          </h3>
        </div>

        {/* Real Stage Selector Tabs */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#FAF6F0] p-1 border border-[#E2D7C7] rounded-sm">
          {stages.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setStage(idx);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-serif transition-all duration-300 rounded-xs cursor-pointer ${
                stage === idx
                  ? 'bg-[#4A121A] text-white font-semibold shadow-xs'
                  : 'text-[#6E6259] hover:text-[#241E1C]'
              }`}
            >
              {s.step} {s.phase}
            </button>
          ))}

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-[#6E6259] hover:text-[#4A121A] transition-colors ml-1 cursor-pointer"
            title={isPlaying ? 'Pause auto cycle' : 'Auto cycle animation'}
            aria-label="Toggle auto cycle"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      </div>

      {/* Main Photographic Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Authentic High-Resolution Craft Photography */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#E2D7C7] shadow-md group">
            {/* Real Photograph with Smooth Crossfade & Subtle Cinematic Zoom */}
            <img
              key={current.image}
              src={current.image}
              alt={current.alt || current.title}
              className="w-full h-full object-cover object-center animate-fade-in transition-transform duration-700 group-hover:scale-105"
            />

            {/* Photo Vignette & Provenance Tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {current.badge && (
              <div className="absolute top-3 left-3 bg-[#FBF8F3]/90 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E2D7C7] text-[10px] font-medium text-[#4A121A] tracking-wider uppercase">
                {current.badge}
              </div>
            )}

            {current.caption && (
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-serif italic drop-shadow-sm">
                "{current.caption}"
              </div>
            )}
          </div>
        </div>

        {/* Right: Educational Narrative Details */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A121A]/10 text-[#4A121A] text-[11px] font-bold uppercase tracking-wider">
            <span>Stage {current.step}</span>
            <span>•</span>
            <span className="font-serif normal-case italic">{current.phase}</span>
          </div>

          <h4
            style={{ color: titleColor }}
            className="font-serif font-bold text-2xl sm:text-3xl text-[#241E1C] leading-snug"
          >
            {current.title}
          </h4>

          <p className="text-sm font-semibold text-[#4A121A]">
            {current.subtitle}
          </p>

          <p
            style={{ color: textColor }}
            className="text-xs sm:text-sm text-[#6E6259] leading-relaxed"
          >
            {current.description}
          </p>

          {/* Authentic Heritage Notes */}
          <div className="pt-2 border-t border-[#E2D7C7] space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#241E1C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29D59]" />
              <span><strong>Artisan Technique:</strong> {note1}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#241E1C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29D59]" />
              <span><strong>Pure Natural Resists:</strong> {note2}</span>
            </div>
          </div>

          {/* Next Stage Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                setStage((stage + 1) % stages.length);
                setIsPlaying(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A121A] hover:text-[#380D13] underline cursor-pointer"
            >
              <span>See Next Stage: {stages[(stage + 1) % stages.length].title}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

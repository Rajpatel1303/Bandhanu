import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Globe,
  HeartHandshake,
  Palette,
  ShieldCheck,
  ChevronRight,
  Layers,
  Droplets,
  Scissors,
  CheckCircle2,
  ArrowRight,
  Award
} from 'lucide-react';

const CRAFT_STAGES = [
  {
    step: '01',
    name: 'Chhapa (Motif Blueprint)',
    subtitle: 'Precision Pattern Stenciling',
    description: 'Master draughtsmen carve traditional wooden blocks or pin-prick parchment stencils with geometric and nature-inspired motifs—Peacocks (*Mor*), Shikargah hunting scenes, Shikari vines, and sacred Chowk lattices.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85',
    detail: 'Non-permanent natural geru clay wash is rubbed across stencils onto pure Katan silk or mulberry georgette.'
  },
  {
    step: '02',
    name: 'Bandha (The Microscopic Knot)',
    subtitle: 'Hand-Tying with Pointed Silver Ring',
    description: 'Women artisans in Jamnagar & Kutch deftly pick minute pinches of silk using a specially crafted pointed ring (*aar*), wrapping high-twist cotton thread tightly around each point. A single Gharchola saree can bear over 50,000 hand-tied knots.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85',
    detail: 'The tight thread acts as a mechanical resist against penetrating dyes, preserving pristine base colors inside.'
  },
  {
    step: '03',
    name: 'Rangai (Alchemical Dyeing)',
    subtitle: 'Lighter to Darker Immersion Cycles',
    description: 'Dyeing progresses strictly from lightest yellow to vermillion red, deep crimson, and deep indigo or midnight black. Between each color bath, new knots are tied while previous resists remain sealed to produce intricate multi-colored Ekdali, Dungarshahi, and Shikari gradients.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
    detail: 'Natural indigo vats, pomegranate rinds, and certified non-toxic azo-free dyes ensure vibrant luster and skin-friendly breathability.'
  },
  {
    step: '04',
    name: 'Chhutai (The Grand Unveiling)',
    subtitle: 'Untying Thread & Signature Crinkle Bloom',
    description: 'Once fully dried under the Gujarat sun, the fabric is pulled gently from opposite corners to pop the threads open. What emerges is an awe-inspiring constellation of textured dots and jewel-bright motifs with the signature puckered Bandhani crush.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85',
    detail: 'This tactile crinkled texture is the definitive hallmark of authentic, unpressed handmade Khatri craft.'
  }
];

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="min-h-screen bg-heritage-cream dark:bg-heritage-darkSurface pb-24">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-heritage-sand/40 via-heritage-cream to-transparent dark:from-heritage-darkCard/60 dark:via-heritage-darkSurface border-b border-heritage-gold/20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-widest mb-4 border border-heritage-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT US & HERITAGE STORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-heritage-charcoal dark:text-white tracking-tight leading-tight">
            Where Heritage Meets Modern Style
          </h1>

          <p className="mt-4 text-base sm:text-lg text-heritage-charcoal/80 dark:text-gray-200 max-w-2xl mx-auto font-serif italic">
            "Welcome to Bandhanu – where heritage meets style. Explore our exclusive handcrafted Bandhani garments, stoles, and fabrics, designed for every occasion."
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('catalogue')}
              className="px-6 py-3 rounded-full bg-heritage-crimson hover:bg-heritage-crimson/90 text-white font-semibold text-sm shadow-lg shadow-heritage-crimson/25 transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 rounded-full bg-white dark:bg-heritage-darkCard border border-heritage-gold/40 text-heritage-charcoal dark:text-white font-semibold text-sm hover:border-heritage-gold transition-colors"
            >
              <span>Connect With Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-heritage-gold/30 shadow-2xl bg-heritage-darkSurface">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85"
                alt="Master Artisan tying Bandhani"
                className="w-full h-[380px] sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 inset-x-6 bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md p-5 rounded-2xl border border-heritage-gold/40 shadow-xl space-y-2">
                <p className="font-serif italic text-xs sm:text-sm text-heritage-charcoal dark:text-gray-200 leading-relaxed">
                  "Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade."
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-heritage-crimson dark:text-heritage-gold border-t border-heritage-gold/20">
                  <span>Bandhanu</span>
                  <span>Every Knot, A Story.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-heritage-crimson dark:text-heritage-gold">
              The Bandhanu Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white leading-tight">
              A Celebration of Tradition, Artistry & Timeless Elegance
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed font-normal">
              <p>
                <strong>Bandhanu</strong> is a celebration of tradition, artistry, and timeless elegance. Rooted in the ancient craft of Bandhani (Bandhej), our brand brings forward the beauty of knots, patterns, and indigo hues that tell stories of heritage and culture.
              </p>
              <p>
                Each piece is hand-tied and hand-dyed, carrying with it the patience, skill, and soul of artisans who have preserved this art for generations. At Bandhanu, we don’t just create products—we create experiences woven with history and designed for modern living.
              </p>
            </div>

            {/* Vision Pillars */}
            <div className="pt-4 border-t border-heritage-gold/20">
              <h3 className="font-serif font-bold text-lg text-heritage-crimson dark:text-heritage-gold mb-4">
                Our vision is simple:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-heritage-crimson/15 text-heritage-crimson flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Global Identity
                  </h4>
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
                    To make Bandhani a global identity.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Honor Artisans
                  </h4>
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
                    To honor the craft and the artisans behind it.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Contemporary Designs
                  </h4>
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
                    To blend traditional techniques with contemporary designs that suit today’s world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Stage Craft Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-heritage-gold/20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-heritage-crimson dark:text-heritage-gold">
            Behind Every Thread
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
            The Alchemy of Khatri Bandhej
          </h2>
          <p className="text-sm text-heritage-charcoal/70 dark:text-gray-300 mt-2">
            Bandhani is not printed. It is sculpted through patience, knots, water, and fire over weeks of artisan devotion.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {CRAFT_STAGES.map((stage, idx) => {
            const isCurrent = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-heritage-crimson text-white border-heritage-crimson shadow-lg shadow-heritage-crimson/20'
                    : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white border-heritage-gold/25 hover:border-heritage-gold'
                }`}
              >
                <div className={`text-xs font-mono font-bold ${isCurrent ? 'text-heritage-gold' : 'text-heritage-charcoal/40 dark:text-gray-400'}`}>
                  STAGE {stage.step}
                </div>
                <div className="font-serif font-bold text-sm mt-1 truncate">
                  {stage.name.split(' ')[0]}
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isCurrent ? 'text-white/80' : 'text-heritage-charcoal/60 dark:text-gray-400'}`}>
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive */}
        <div className="rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[300px]">
              <img
                src={CRAFT_STAGES[activeStage].image}
                alt={CRAFT_STAGES[activeStage].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-heritage-gold text-xs font-bold font-mono">
                Step {CRAFT_STAGES[activeStage].step} of 04
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-heritage-crimson dark:text-heritage-gold">
                  {CRAFT_STAGES[activeStage].subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
                  {CRAFT_STAGES[activeStage].name}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed font-normal">
                  {CRAFT_STAGES[activeStage].description}
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/25 text-xs text-heritage-charcoal/70 dark:text-gray-300">
                  <strong className="block text-heritage-charcoal dark:text-white font-semibold mb-1">
                    Artisan Secret:
                  </strong>
                  {CRAFT_STAGES[activeStage].detail}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-heritage-gold/20">
                <button
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-heritage-gold/30 text-xs font-semibold disabled:opacity-30 text-heritage-charcoal dark:text-white hover:border-heritage-gold cursor-pointer"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={activeStage === CRAFT_STAGES.length - 1}
                  onClick={() => setActiveStage(prev => Math.min(CRAFT_STAGES.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-heritage-crimson text-white text-xs font-semibold disabled:opacity-30 hover:bg-heritage-crimson/90 cursor-pointer"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authenticity Promise Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-heritage-crimson via-rose-950 to-heritage-charcoal text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-heritage-gold/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-gold text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Handcrafted Guarantee</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Every Knot, A Promise of Uncompromising Authenticity
            </h2>
            
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              We reject synthetic screen-print imitations. Every saree, dupatta, and bespoke kaftan that carries the Bandhanu seal is hand-tied by indigenous craftspeople in Jamnagar and Kutch using the finest mulberry silks and traditional techniques passed down through lineages.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('catalogue')}
                className="px-6 py-3 rounded-full bg-heritage-gold hover:bg-amber-400 text-heritage-charcoal font-bold text-sm transition-all"
              >
                Browse Masterpieces
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition-all"
              >
                Visit Studio Atelier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

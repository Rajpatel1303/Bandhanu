import React from 'react';
import { Sparkles, Globe, HeartHandshake, Palette, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-20 bg-[#FFFDF9] dark:bg-heritage-darkSurface border-b border-heritage-gold/20 relative overflow-hidden scroll-mt-24">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase & Quote */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-heritage-gold/30 shadow-2xl bg-heritage-darkSurface">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85"
                alt="Bandhanu Master Artisan Hand-tying Bandhej"
                className="w-full h-[320px] sm:h-[480px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>

              {/* Bottom Quote Card */}
              <div className="absolute bottom-6 inset-x-6 bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md p-5 rounded-2xl border border-heritage-gold/40 shadow-xl space-y-2">
                <p className="font-serif italic text-xs text-heritage-charcoal dark:text-gray-200 leading-relaxed">
                  "Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade."
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-heritage-crimson dark:text-heritage-gold border-t border-heritage-gold/20">
                  <span>Bandhanu</span>
                  <span>Every Knot, A Story</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Narrative & Vision Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-heritage-charcoal dark:text-white leading-tight">
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

            {/* Vision Header */}
            <div className="pt-2">
              <h3 className="text-lg font-serif font-bold text-heritage-crimson dark:text-heritage-gold flex items-center gap-2 mb-3">
                <span>Our vision is simple:</span>
              </h3>

              {/* 3 Vision Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard border border-heritage-gold/25 space-y-2 hover:border-heritage-gold transition-all">
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

                <div className="p-4 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard border border-heritage-gold/25 space-y-2 hover:border-heritage-gold transition-all">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Honor The Artisans
                  </h4>
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
                    To honor the craft and the artisans behind it.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard border border-heritage-gold/25 space-y-2 hover:border-heritage-gold transition-all">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Modern Adaptation
                  </h4>
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
                    To blend traditional techniques with contemporary designs that suit today’s world.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Brand Promise Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-heritage-crimson/10 via-heritage-gold/15 to-heritage-crimson/5 border border-heritage-gold/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-heritage-charcoal dark:text-gray-200 italic font-serif">
                  "Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade."
                </p>
                <div className="text-sm font-bold text-heritage-crimson dark:text-heritage-gold mt-1 font-serif">
                  Bandhanu: Every Knot, A Story.
                </div>
              </div>
              <ShieldCheck className="w-7 h-7 text-heritage-gold shrink-0 ml-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

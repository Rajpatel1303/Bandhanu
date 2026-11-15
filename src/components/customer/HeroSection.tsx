import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { BandhaniHeroCanvas } from './BandhaniHeroCanvas';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, theme } = useStore();
  const heroStyles = theme?.sections?.hero;
  const titleColor = heroStyles?.titleColor || undefined;
  const btnBg = heroStyles?.btnBg || undefined;
  const btnText = heroStyles?.btnText || undefined;

  const handleExplore = () => {
    setSelectedCategory(null);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      style={{ backgroundColor: heroStyles?.bg }}
      className="relative w-full overflow-hidden bg-[#241E1C]"
    >
      {/* High-Resolution Hero Visual Banner */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] w-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
            alt="Handcrafted Bandhani Textiles"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Subtle gradient vignette to ensure high text legibility on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/65 sm:to-black/75" />
        </div>

        {/* Ambient Floating Bandhani Micro-Dots Canvas */}
        <BandhaniHeroCanvas />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
          <div className="flex flex-col items-end text-right ml-auto max-w-xl">
            {/* Kicker / Tagline */}
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F5EFE6] uppercase block mb-3 drop-shadow-xs">
              Handcrafted Bandhani Textiles
            </span>

            {/* Headline */}
            <h1
              style={{ color: titleColor }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.12] tracking-tight drop-shadow-md"
            >
              Where Heritage <br />
              <span className="font-normal italic">Meets Style</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#F5EFE6]/90 font-light tracking-wide leading-relaxed drop-shadow-xs">
              Hand-tied. Hand-dyed. Timeless.
            </p>

            {/* CTA Button matching the deep maroon mockup */}
            <div className="mt-7 sm:mt-8">
              <button
                onClick={handleExplore}
                style={{ backgroundColor: btnBg, color: btnText }}
                className="inline-flex items-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

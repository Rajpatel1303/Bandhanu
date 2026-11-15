import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MapPin } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  const { setCurrentPage, theme } = useStore();
  const storyStyles = theme?.sections?.story;
  const sectionBg = storyStyles?.bg || undefined;
  const cardBg = storyStyles?.cardBg || undefined;
  const titleColor = storyStyles?.titleColor || undefined;
  const textColor = storyStyles?.textColor || undefined;
  const btnBg = storyStyles?.btnBg || undefined;

  const handleReadStory = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      style={{ backgroundColor: sectionBg }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 transition-colors duration-300"
    >
      <div
        style={{ backgroundColor: cardBg }}
        className="bg-[#F5EFE6] border border-[#E2D7C7] overflow-hidden transition-colors duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 items-center">
          
          {/* Left Column: Photo of Artisan Woman */}
          <div className="lg:col-span-4 h-64 sm:h-80 md:h-full relative overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan at work in Bhadli Kutch"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Center Column: Narrative & Button */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 space-y-4 text-left">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block">
              Our Story
            </span>

            <h2
              style={{ color: titleColor }}
              className="text-2xl sm:text-3xl font-serif text-[#241E1C] leading-snug"
            >
              Rooted in Bhadli, Kutch
            </h2>

            <p
              style={{ color: textColor }}
              className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal"
            >
              Bandhanu celebrates the traditional art of Bandhani through handcrafted textiles that bring heritage and contemporary design together. Every piece reflects the skill, patience and dedication of the artisans who keep this craft alive.
            </p>

            <div className="pt-2">
              <button
                onClick={handleReadStory}
                style={{ backgroundColor: btnBg }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Illustrated Map of Kutch & Bhadli */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative border-t md:border-t-0 md:border-l border-[#E2D7C7]/60">
            {/* Map Art SVG */}
            <div className="relative w-full max-w-[220px] aspect-[4/3] flex items-center justify-center">
              <svg viewBox="0 0 200 150" className="w-full h-full text-[#B89B72]/60 stroke-current fill-none">
                {/* Stylized Gulf of Kutch Coastline Contour */}
                <path
                  d="M10,95 Q40,90 70,85 T130,90 T180,105 T195,130"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                />
                <path
                  d="M15,40 Q50,30 90,45 T160,35 T190,50"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                
                {/* Traditional Haveli Arch Silhouette */}
                <path
                  d="M60,135 L60,115 Q80,95 100,115 L100,135 Z"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="rgba(184, 155, 114, 0.05)"
                />
                <path
                  d="M100,135 L100,115 Q120,95 140,115 L140,135 Z"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="rgba(184, 155, 114, 0.05)"
                />
                <path
                  d="M70,115 Q100,85 130,115"
                  strokeWidth="1.2"
                />
                <circle cx="100" cy="80" r="3" fill="#4A121A" />
              </svg>

              {/* Pinpoint for Bhadli, Kutch */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#F5EFE6]/90 px-2.5 py-1 rounded-full border border-[#D8C7B5] shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#4A121A] animate-ping" />
                <div className="text-left">
                  <span className="block font-serif font-bold text-xs text-[#241E1C] leading-none">
                    Bhadli
                  </span>
                  <span className="block text-[9px] text-[#6E6259] leading-none mt-0.5">
                    Kutch, Gujarat
                  </span>
                </div>
              </div>

              {/* Folk Art Star / Motif Ornament */}
              <div className="absolute top-2 right-2 text-[#B89B72] opacity-70">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                </svg>
              </div>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-[#6E6259] font-medium mt-2">
              The Artisan Heartland
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

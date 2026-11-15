import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Heart, Sparkles, MapPin, Leaf, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  const handleDiscoverCraft = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const craftEl = document.getElementById('our-craft-section');
      if (craftEl) craftEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen pb-16 sm:pb-24 animate-fade-in">
      {/* 1. Hero Banner matching Image 2 */}
      <section className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#241E1C]">
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85"
          alt="Hands tying Bandhani knots"
          className="w-full h-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide">
              Our Story
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#F5EFE6]/90 font-light tracking-wide">
              Rooted in Tradition, Designed for Today
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative Section (2 Columns) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Copy & Button */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] leading-tight">
              Bandhanu — <br />
              <span className="font-normal italic">A Journey of Craft and Culture</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal">
              Born in Bhadli, Kutch, Bandhanu is a celebration of Bandhani — a traditional art that has been passed down through generations. We bring this heritage into contemporary designs, keeping the craft and the people behind it at the heart of our brand.
            </p>

            <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal">
              Each pattern requires thousands of tiny knots pinched with precision before sequential vegetable and natural dye baths. In an era of hurried machine prints, we honor the deliberate patience and soul of slow handmade textiles.
            </p>

            <div className="pt-2">
              <button
                onClick={handleDiscoverCraft}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Discover Our Craft</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Photo of Smiling Artisan Woman in Kutch */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#E2D7C7] bg-[#F5EFE6]">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                alt="Smiling artisan woman in Kutch traditional attire"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. 4 Value Pillars Strip matching Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] border border-[#E2D7C7] p-6 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Pillar 1 */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8C7B5] flex items-center justify-center text-[#4A121A]">
                <Heart className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#241E1C]">
                Handmade with love
              </h3>
              <p className="text-[11px] text-[#6E6259]">
                Every dot pinched by fingertips
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8C7B5] flex items-center justify-center text-[#4A121A]">
                <Users className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#241E1C]">
                Supporting 50+ Artisans
              </h3>
              <p className="text-[11px] text-[#6E6259]">
                Empowering craft families in Kutch
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8C7B5] flex items-center justify-center text-[#4A121A]">
                <MapPin className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#241E1C]">
                Made in Kutch
              </h3>
              <p className="text-[11px] text-[#6E6259]">
                Authentic Bhadli village provenance
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8C7B5] flex items-center justify-center text-[#4A121A]">
                <Leaf className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#241E1C]">
                Sustainable Craft
              </h3>
              <p className="text-[11px] text-[#6E6259]">
                Natural plant dyes & eco fabrics
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

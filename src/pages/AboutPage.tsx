import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Heart, Sparkles, MapPin, Leaf, Users, Quote } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteContent, profile, setCurrentPage, setSelectedCategory, theme } = useStore();

  const about = siteContent?.about;
  const brandName = profile.businessName || 'Bandhanu';

  const badge = about?.badge || 'Our Story';
  const headline = about?.headline || `${brandName} — A Journey of Craft and Culture`;
  const story1 =
    about?.storyParagraph1 ||
    `Born in Bhadli, Kutch, ${brandName} is a celebration of Bandhani — a traditional art that has been passed down through generations. We bring this heritage into contemporary designs, keeping the craft and the people behind it at the heart of our brand.`;
  const story2 =
    about?.storyParagraph2 ||
    `Each pattern requires thousands of tiny knots pinched with precision before sequential vegetable and natural dye baths. In an era of hurried machine prints, we honor the deliberate patience and soul of slow handmade textiles.`;

  const quote = about?.quoteText || 'Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade.';
  const author = about?.quoteAuthor || `${brandName}: Every Knot, A Story.`;

  // Dynamic vision pillars from CMS
  const pillars = [
    {
      title: about?.visionPillar1Title || 'Global Identity',
      desc: about?.visionPillar1Desc || 'To make Bandhani an esteemed global heirloom identity.',
      icon: Heart
    },
    {
      title: about?.visionPillar2Title || 'Honor The Artisans',
      desc: about?.visionPillar2Desc || 'Empowering multi-generational Khatri craft families in Kutch.',
      icon: Users
    },
    {
      title: about?.visionPillar3Title || 'Contemporary Designs',
      desc: about?.visionPillar3Desc || 'Blending age-old resist dyeing with modern luxury silhouettes.',
      icon: Leaf
    },
    {
      title: 'Provenance & Purity',
      desc: `Authentic ${profile.city || 'Bhadli'} workshop direct to connoisseurs worldwide.`,
      icon: MapPin
    }
  ];

  const handleExploreCollection = () => {
    setSelectedCategory(null);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen pb-16 sm:pb-24 animate-fade-in">
      {/* 1. Hero Banner */}
      <section className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#241E1C]">
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85"
          alt="Hands tying Bandhani knots"
          className="w-full h-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase block mb-2">
              {badge}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide">
              {brandName}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#F5EFE6]/90 font-light tracking-wide">
              {profile.tagline || 'Where Heritage Meets Style'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative Section (2 Columns) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Copy & Button */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A121A]/10 text-[#4A121A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] leading-tight">
              {headline}
            </h2>

            <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal">
              {story1}
            </p>

            <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal">
              {story2}
            </p>

            {/* Quote Callout */}
            {quote && (
              <div className="p-4 rounded-xl bg-[#F5EFE6] border-l-4 border-[#4A121A] text-xs font-serif italic text-[#241E1C] space-y-1">
                <p>"{quote}"</p>
                {author && <p className="text-[10px] text-[#6E6259] font-sans font-semibold not-italic">— {author}</p>}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleExploreCollection}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Photo of Smiling Artisan Woman in Kutch */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#E2D7C7] bg-[#F5EFE6] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                alt="Artisan at work in Kutch"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. 4 Value Pillars Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] border border-[#E2D7C7] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-2 p-2">
                  <div className="w-11 h-11 rounded-full bg-white border border-[#D8C7B5] flex items-center justify-center text-[#4A121A] shadow-xs">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#241E1C]">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-[#6E6259] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

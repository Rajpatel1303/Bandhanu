import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BandhaniHeroCanvas } from './BandhaniHeroCanvas';
import { openWhatsAppDirect } from '../../utils/whatsapp';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, siteContent, banners, profile, theme } = useStore();
  const heroStyles = theme?.sections?.hero;
  const titleColor = heroStyles?.titleColor || undefined;
  const btnBg = heroStyles?.btnBg || undefined;
  const btnText = heroStyles?.btnText || undefined;

  const hero = siteContent?.hero;
  const activeBanner = banners.find((b) => b.isActive);

  // Primary source of truth: siteContent.hero from CMS, with activeBanner and initial fallbacks
  const heroImage =
    hero?.heroImage ||
    activeBanner?.imageUrl ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90';

  const badgeText =
    hero?.badge ||
    activeBanner?.badge ||
    'BANDHANU: EVERY KNOT, A STORY';

  const headingText =
    hero?.heading ||
    activeBanner?.title ||
    'Welcome to Bandhanu';

  const highlightText = hero?.highlight !== undefined ? hero.highlight : (activeBanner ? '' : 'where heritage meets style.');

  const descriptionText =
    hero?.description ||
    activeBanner?.subtitle ||
    'Explore our exclusive handcrafted Bandhani garments, stoles, and fabrics, designed for every occasion. Start your journey into a living heritage of knots, patterns, and timeless artistry.';

  const primaryBtnText =
    hero?.primaryBtnText ||
    activeBanner?.ctaText ||
    'Explore Collection';

  const secondaryBtnText = hero?.secondaryBtnText || 'Enquire via WhatsApp Concierge';

  const handleExplore = () => {
    if (activeBanner?.ctaCategory) {
      setSelectedCategory(activeBanner.ctaCategory);
    } else {
      setSelectedCategory(null);
    }
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello ${profile.businessName || 'Bandhanu'} Concierge! 👋\n\nI am interested in your luxury handcrafted Bandhani collection. Could you please share the latest bespoke catalogues?`;
    openWhatsAppDirect(profile.whatsappNumber, msg);
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
            src={heroImage}
            alt={headingText}
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
              {badgeText}
            </span>

            {/* Headline */}
            <h1
              style={{ color: titleColor }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.12] tracking-tight drop-shadow-md"
            >
              {headingText} {highlightText && <br />}
              {highlightText && (
                <span className="font-normal italic">{highlightText}</span>
              )}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#F5EFE6]/90 font-light tracking-wide leading-relaxed drop-shadow-xs">
              {descriptionText}
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-end gap-3 sm:gap-4">
              {secondaryBtnText && (
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 border border-white/20 hover:border-white/40 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{secondaryBtnText}</span>
                </button>
              )}

              <button
                onClick={handleExplore}
                style={{ backgroundColor: btnBg, color: btnText }}
                className="inline-flex items-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

            {/* Knot Badge info if present */}
            {hero?.knotBadgeText && (
              <div className="mt-6 flex items-center gap-2 text-[11px] text-[#F5EFE6]/80 font-medium tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                <span>{hero.knotBadgeText} • {hero.knotBadgeSub}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

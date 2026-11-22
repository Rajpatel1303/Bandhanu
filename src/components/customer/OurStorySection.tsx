import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  const { siteContent, profile, setCurrentPage, theme } = useStore();
  const storyStyles = theme?.sections?.story;
  const sectionBg = storyStyles?.bg || undefined;
  const cardBg = storyStyles?.cardBg || undefined;
  const titleColor = storyStyles?.titleColor || undefined;
  const textColor = storyStyles?.textColor || undefined;
  const btnBg = storyStyles?.btnBg || undefined;

  const about = siteContent?.about;
  const badge = about?.badge || 'ABOUT US';
  const headline = about?.headline || 'A Celebration of Tradition, Artistry & Timeless Elegance';
  const storyText =
    about?.storyParagraph1 ||
    `${profile.businessName || 'Bandhanu'} is a celebration of tradition, artistry, and timeless elegance. Rooted in the ancient craft of Bandhani (Bandhej), our brand brings forward the beauty of knots, patterns, and indigo hues that tell stories of heritage and culture.`;

  const image =
    about?.image ||
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80';
  const buttonText = about?.buttonText || 'Read Our Story';
  const buttonLink = about?.buttonLink || '';
  const locationCity = about?.locationCity || profile.city || 'Bhadli';
  const locationState = about?.locationState || profile.state || 'Kutch, Gujarat';
  const rawTagline = about?.locationTagline;
  const locationTagline =
    rawTagline && !rawTagline.includes('Humse') && rawTagline !== 'The Artisan Heartland'
      ? rawTagline
      : 'Visit Our Heritage Atelier • Get Directions';
  const locationMapUrl =
    about?.locationMapUrl || 'https://maps.app.goo.gl/86qCkie4AofH5xPQA';

  const handleReadStory = () => {
    if (buttonLink && buttonLink.startsWith('http')) {
      window.open(buttonLink, '_blank', 'noopener,noreferrer');
    } else if (buttonLink && buttonLink.startsWith('#/')) {
      window.location.hash = buttonLink;
    } else {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{ backgroundColor: sectionBg }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 transition-colors duration-300"
    >
      <div
        style={{ backgroundColor: cardBg }}
        className="bg-[#F5EFE6] border border-[#E2D7C7] overflow-hidden transition-colors duration-300 rounded-sm sm:rounded-lg shadow-xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Photo of Artisan Woman / Showcase */}
          <div className="lg:col-span-4 h-72 sm:h-96 md:h-auto min-h-[280px] relative overflow-hidden bg-[#EFE8DC]">
            <img
              src={image}
              alt={headline}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Center Column: Narrative & Button */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 space-y-4 text-left flex flex-col justify-center">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block">
              {badge}
            </span>

            <h2
              style={{ color: titleColor }}
              className="text-2xl sm:text-3xl font-serif text-[#241E1C] leading-snug"
            >
              {headline}
            </h2>

            <p
              style={{ color: textColor }}
              className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal whitespace-pre-line"
            >
              {storyText}
            </p>

            <div className="pt-2">
              <button
                onClick={handleReadStory}
                style={{ backgroundColor: btnBg }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Illustrated Map with Google Maps Link */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative border-t md:border-t-0 md:border-l border-[#E2D7C7]/60">
            <a
              href={locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center w-full p-2.5 rounded-2xl transition-all duration-300 hover:bg-[#EBE2D5]/70 cursor-pointer"
              title="Open atelier location in Google Maps"
            >
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#F5EFE6]/95 px-2.5 py-1 rounded-full border border-[#D8C7B5] shadow-xs group-hover:scale-105 group-hover:border-[#4A121A]/50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#4A121A] animate-ping" />
                  <div className="text-left">
                    <span className="block font-serif font-bold text-xs text-[#241E1C] leading-none">
                      {locationCity}
                    </span>
                    <span className="block text-[9px] text-[#6E6259] leading-none mt-0.5">
                      {locationState}
                    </span>
                  </div>
                </div>

                {/* Folk Art Star / Motif Ornament */}
                <div className="absolute top-2 right-2 text-[#B89B72] opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                  </svg>
                </div>
              </div>

              {/* Tagline / Invitation with Google Maps link */}
              <div className="atelier-map-badge mt-3 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-xs">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-semibold tracking-wide">
                  {locationTagline}
                </span>
                <ExternalLink className="w-3 h-3 opacity-90 shrink-0" />
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

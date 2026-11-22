import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { BandhaniBloomInteractive } from './BandhaniBloomInteractive';

export const OurCraftSection: React.FC = () => {
  const { siteContent, setCurrentPage, theme } = useStore();

  const craftStyles = theme?.sections?.craft;
  const sectionBg = craftStyles?.bg || undefined;
  const cardBg = craftStyles?.cardBg || undefined;
  const titleColor = craftStyles?.titleColor || undefined;
  const textColor = craftStyles?.textColor || undefined;

  const craftJourney = siteContent?.craftJourney;

  // Check section toggle
  if (siteContent?.toggles && siteContent.toggles.showCraftJourney === false) {
    return null;
  }

  const handleDiscoverCraft = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultStages = [
    {
      step: '01',
      title: 'Tying (Bandhana)',
      subtitle: 'Every minute knot tells a story',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '02',
      title: 'Dyeing (Rangai)',
      subtitle: 'Natural colours, lasting beauty',
      image: '/images/artisan-pot.jpg',
    },
    {
      step: '03',
      title: 'The Final Fabric (Khilana)',
      subtitle: 'A crinkled bloom in every fold',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const stagesToRender =
    craftJourney?.stages && craftJourney.stages.length > 0
      ? craftJourney.stages.map((st, i) => ({
          step: st.step || `0${i + 1}`,
          title: st.title || st.phase || defaultStages[i % defaultStages.length]?.title || 'Bandhani Craft',
          subtitle: st.subtitle || st.description || defaultStages[i % defaultStages.length]?.subtitle || '',
          image: st.image || defaultStages[i % defaultStages.length]?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        }))
      : defaultStages;

  const badge = craftJourney?.badge || 'Our Craft';
  const heading = craftJourney?.heading || 'The Art Behind Every Dot';
  const description =
    craftJourney?.description ||
    'From tying tiny knots to dyeing and opening, each Bandhani textile takes time, patience and skilled hands. We work with traditional methods, keeping the heritage alive.';

  return (
    <section
      id="our-craft-section"
      style={{ backgroundColor: sectionBg }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 transition-colors duration-300"
    >
      {/* Top Section: Story and Step Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & CTA */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block">
            {badge}
          </span>

          <h2
            style={{ color: titleColor }}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] leading-tight"
          >
            {heading}
          </h2>

          <p
            style={{ color: textColor }}
            className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal"
          >
            {description}
          </p>

          <div className="pt-2">
            <button
              onClick={handleDiscoverCraft}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>Discover Our Craft</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Process Visual Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stagesToRender.slice(0, 3).map((step, idx) => (
            <div key={idx} className="flex flex-col group">
              <div
                style={{ backgroundColor: cardBg }}
                className="aspect-[4/3] overflow-hidden bg-[#F5EFE6] border border-[#E2D7C7]/50 mb-3"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#4A121A]">{step.step}</span>
                <h3
                  style={{ color: titleColor }}
                  className="font-serif font-bold text-base text-[#241E1C] group-hover:text-[#4A121A] transition-colors truncate"
                >
                  {step.title}
                </h3>
              </div>
              <p
                style={{ color: textColor }}
                className="text-xs text-[#6E6259] mt-0.5 line-clamp-2"
              >
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Living Interactive Bandhani Bloom Simulation */}
      <div className="pt-2">
        <BandhaniBloomInteractive />
      </div>

      {/* Signature Resisted Techniques Grid */}
      <div className="pt-6 border-t border-[#E2D7C7]/50">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A121A] dark:text-heritage-gold block">
            Signature Resisted Techniques
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#241E1C] dark:text-white mt-1">
            Master Craftsmanship of Kutch & Jamnagar
          </h3>
          <p className="text-xs text-[#6E6259] dark:text-gray-400 mt-1 max-w-md mx-auto">
            Passed down through generations of Khatri master dyers, each pattern demands distinct hand-tension and tying discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              name: 'Micro Rai Bandhej',
              badge: '~25,000 Knots',
              desc: 'Tiniest mustard-seed dots plucked using nail-rings (Aar) on sheer Gajji silk.',
              bg: 'bg-heritage-sand/30 dark:bg-heritage-darkCard'
            },
            {
              name: 'Shikargah Jaal',
              badge: 'Royal Menagerie',
              desc: 'Complex animal & forest narratives resisted into bridal heirloom Gharcholas.',
              bg: 'bg-heritage-sand/30 dark:bg-heritage-darkCard'
            },
            {
              name: 'Bavan Baug (52 Gardens)',
              badge: '52 Master Motifs',
              desc: 'A geometric grid where every individual square houses a distinct floral bloom.',
              bg: 'bg-heritage-sand/30 dark:bg-heritage-darkCard'
            },
            {
              name: 'Chaukadi & Trikunti',
              badge: 'Sacred Diamond Clusters',
              desc: 'Clusters of 3 and 4 diamond knots signifying protection, abundance, and heritage.',
              bg: 'bg-heritage-sand/30 dark:bg-heritage-darkCard'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border border-heritage-gold/30 ${item.bg} flex flex-col justify-between hover:border-heritage-crimson transition-all group`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-heritage-gold/20 text-[#4A121A] dark:text-heritage-gold text-[9px] font-bold uppercase tracking-wider mb-2">
                  {item.badge}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#241E1C] dark:text-white group-hover:text-heritage-crimson transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-[#6E6259] dark:text-gray-300 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
